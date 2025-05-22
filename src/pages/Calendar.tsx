import React from 'react';
import CalendarGrid from '../components/CalendarGrid';
import EventForm from '../components/EventForm';
import { useCalendarEventContext } from '../contexts/CalendarEventContext';
import { EventInput } from '../components/EventForm';

const Calendar: React.FC = () => {
  const { addEvent } = useCalendarEventContext();

  const handleEventCreated = (eventData: EventInput) => {
    console.log(eventData);
    const { title, date, description } = eventData;
    addEvent(title, date, description);
  };

  return (
    <div>
      <h1>Calendar Page</h1>
      <div>
        <CalendarGrid />
      </div>
      <div>
        <h2>Create an event</h2>
        <EventForm onSubmit={handleEventCreated} type={'Add'} />
      </div>
    </div>
  );
};

export default Calendar;
