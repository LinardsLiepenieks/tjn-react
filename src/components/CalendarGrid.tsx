import React, { useState, useEffect } from 'react';
import styles from '../styles/CalendarGrid.module.css';
import { useCalendarEventContext } from '../contexts/CalendarEventContext';
import { CalendarEvent } from '../types/CalendarEvent';
import EventModal from './EventModal';
import { useCalendarNavigation } from '../hooks/CalendarNavigationHook';
import CalendarNavigation from './CalendarNavigation';

interface CalendarDay {
  date: Date;
  events: CalendarEvent[];
}

const CalendarGrid: React.FC = () => {
  const { events, getEvents } = useCalendarEventContext();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  const { calendarDays, currentMonth, setCurrentMonth } =
    useCalendarNavigation(events);

  const setPreviousMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  const setNextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <>
      <CalendarNavigation
        month={currentMonth}
        onLeft={setPreviousMonth}
        onRight={setNextMonth}
      ></CalendarNavigation>
      <div className={styles.calendarGrid}>
        {calendarDays.map((day) => (
          <div className={styles.calendarDay}>
            <div
              className="bg-blue-500 border-blue-500 border-2 w-[40px] h-[40px] rounded-full font-bold mb-2 text-center flex 
            items-center justify-center hover:bg-blue-900 hover:text-blue-200 transition duration-[375ms]"
            >
              {day.date.getDate()}
            </div>

            {day.events.map((calendarEvent) => (
              <div
                key={calendarEvent.id}
                className={styles.event}
                onClick={() => setSelectedEvent(calendarEvent)}
              >
                {calendarEvent.title}
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </>
  );
};

export default CalendarGrid;
