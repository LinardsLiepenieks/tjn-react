// utils/createCalendarEvent.ts
import { CalendarEvent, SingleEventFactory } from '../types/CalendarEvent';

// Define a type for the parameters we expect for each event type
type EventParams = {
  title: string;
  date: Date;
  description: string;
};

// Utility function with properly typed parameters
export const createCalendarEvent = (
  type: 'single',
  params: EventParams
): CalendarEvent => {
  const factories = {
    single: new SingleEventFactory(),
  };

  const factory = factories[type];
  return factory.createEvent(params.title, params.date, params.description);
};
