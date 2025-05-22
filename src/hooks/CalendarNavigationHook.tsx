import { useState, useEffect } from 'react';
import { CalendarEvent } from '../types/CalendarEvent';

interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

interface UseCalendarNavigationResult {
  calendarDays: CalendarDay[];
  currentMonth: Date;
  setCurrentMonth: (currentMonth: Date) => void;
}

export const useCalendarNavigation = (
  events: CalendarEvent[]
): UseCalendarNavigationResult => {
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });

  const [calendarDays, setCalendarDays] = useState<CalendarDay[]>([]);

  useEffect(() => {
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    const days: CalendarDay[] = [];

    for (
      let d = firstDayOfMonth;
      d <= lastDayOfMonth;
      d.setDate(d.getDate() + 1)
    ) {
      let day = {
        date: new Date(d),
        events: events.filter(
          (event) => event.date.toDateString() === d.toDateString()
        ),
      };
      days.push(day);
    }
    console.log(days);
    setCalendarDays(days);
  }, [events, currentMonth]);

  return {
    calendarDays,
    currentMonth,
    setCurrentMonth,
  };
};
