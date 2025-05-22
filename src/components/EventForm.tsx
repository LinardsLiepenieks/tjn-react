import React, { useEffect, useRef } from 'react';
import { CalendarEvent } from '../types/CalendarEvent';

interface EventFormProps {
  onSubmit: (eventData: EventInput) => void;
  type: String;
  event?: EventInput;
}

export interface EventInput {
  _id?: string | number;
  title: string;
  date: Date;
  description: string;
}
const EventForm: React.FC<EventFormProps> = ({ onSubmit, type, event }) => {
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (event && formRef.current) {
      const titleInput = formRef.current.elements.namedItem(
        'title'
      ) as HTMLInputElement;

      const dateInput = formRef.current.elements.namedItem(
        'date'
      ) as HTMLInputElement;

      const descInput = formRef.current.elements.namedItem(
        'desc'
      ) as HTMLInputElement;

      if (titleInput) titleInput.value = event?.title;
      if (dateInput) dateInput.value = event?.date.toISOString().split('T')[0];
      if (descInput) descInput.value = event?.description;
    }
  }, [event]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);

      const eventData: EventInput = {
        title: formData.get('title') as string,
        date: new Date(formData.get('date') as string),
        description: formData.get('desc') as string,
      };

      if (event?._id) {
        eventData._id = event._id;
      }
      onSubmit(eventData);
    }
  };

  return (
    <>
      <h2>Event form</h2>

      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input name="title" id="title" type="text"></input>
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input name="date" id="date" type="date"></input>
        </div>
        <div>
          <label htmlFor="desc">Description:</label>
          <textarea name="desc" id="desc"></textarea>
        </div>
        <button type="submit">{type} Event</button>
      </form>
    </>
  );
};

export default EventForm;
