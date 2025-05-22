import React, { createContext, useContext, ReactNode, useState } from 'react';
import { CalendarEvent, SingleEventFactory } from '../types/CalendarEvent';

interface CalendarEventContextType {
  events: CalendarEvent[];
  addEvent: (title: string, date: Date, description: string) => void;
  getEvents: () => void;
  updateEvents: (
    id: number | string,
    title: string,
    date: Date,
    description: string
  ) => void;
  deleteEvent: (id: number | string | undefined) => void;
}

const CalendarEventContext = createContext<
  CalendarEventContextType | undefined
>(undefined);

//pārbaudam vai ir piekļuve datiem
export const useCalendarEventContext = () => {
  const context = useContext(CalendarEventContext);
  if (!context) {
    throw new Error(
      'useCalendarEventContext must be used within an CalendarEventStoreProvider'
    );
  }
  return context;
};

const eventFactory = new SingleEventFactory();

export const CalendarEventProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const addEvent = async (title: string, date: Date, description: string) => {
    const newEvent = eventFactory.createEvent(title, date, description);
    setEvents([...events, newEvent]);
    console.log('Event saved: ', events);

    const requestData = {
      calendarEvent: newEvent,
    };

    const response = await fetch(
      process.env.REACT_APP_SERVER + '/calendarEvents/create',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      }
    );
    console.log(response);
  };

  const getEvents = async () => {
    const response = await fetch(
      process.env.REACT_APP_SERVER + '/calendarEvents',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    const events = data.map((event: any) => ({
      ...event,
      date: new Date(event.date),
      createdAt: new Date(event.createdAt),
      updatedAt: new Date(event.updatedAt),
    }));

    console.log(data);
    setEvents(events);
  };

  const updateEvents = async (
    id: number | string,
    title: string,
    date: Date,
    description: string
  ) => {
    const updatedEvent = {
      id,
      title,
      date,
      description,
      updatedAt: new Date(),
    };

    const updatedEvents = events.map((event) => {
      return event._id == id ? { ...event, ...updatedEvent } : event;
    });

    console.log('UPDATED', updatedEvents);

    const response = await fetch(
      process.env.REACT_APP_SERVER +
        `/calendarEvents/update/${updatedEvent.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ calendarEvent: updatedEvent }),
      }
    );
    setEvents(updatedEvents);

    console.log(response);
  };

  const deleteEvent = async (id: number | string | undefined) => {
    setEvents(events.filter((event) => event._id != id));

    try {
      const response = await fetch(
        process.env.REACT_APP_SERVER + `/calendarEvents/delete/${id}/`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        console.error('Failed to delete event on server');
        getEvents();
      }
    } catch (error) {
      console.error('Error deleting event', error);
      getEvents();
    }
  };

  return (
    <CalendarEventContext.Provider
      value={{ events, addEvent, getEvents, updateEvents, deleteEvent }}
    >
      {children}
    </CalendarEventContext.Provider>
  );
};
