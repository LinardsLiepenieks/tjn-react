// types/CalendarEvent.ts
// Base interface that defines common properties for all event types
export interface BaseCalendarEvent {
  id: number | string;
  _id?: number | string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

// SingleEvent extends BaseCalendarEvent to include specific properties for single events
// This pattern allows us to add new event types later while maintaining common base properties
export interface SingleEvent extends BaseCalendarEvent {
  type: 'single';
  date: Date;
}

// Currently only includes SingleEvent, but can be extended with union types
// Example: export type CalendarEvent = SingleEvent | RecurringEvent;
export type CalendarEvent = SingleEvent;

// Abstract base factory class that defines the common structure for all event factories
// We use abstract class because:
// 1. We want to share common functionality (createBaseEvent)
// 2. We want to force all event factories to implement createEvent method
// 3. We want to maintain consistent event creation across different event types
export abstract class CalendarEventFactory {
  // Static counter for generating unique IDs
  // Shared across all instances of CalendarEventFactory and its subclasses
  private static currentId = 1;

  // Protected method that creates the base event properties
  // Protected allows access in child classes but keeps it private from outside
  // Used as a helper method to ensure consistent base event creation
  protected createBaseEvent(
    title: string,
    description: string
  ): Omit<BaseCalendarEvent, 'type'> {
    return {
      id: CalendarEventFactory.currentId++,
      title,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  // Abstract method that each concrete factory must implement
  // This ensures that each event type has its own creation logic
  // while maintaining a consistent interface
  abstract createEvent(...args: any[]): CalendarEvent;
}

// Concrete factory for creating single events
// Extends CalendarEventFactory to inherit the createBaseEvent functionality
// and implement the required createEvent method
export class SingleEventFactory extends CalendarEventFactory {
  // Implements the createEvent method specifically for single events
  // Uses createBaseEvent from parent class and adds single-event-specific properties
  createEvent(title: string, date: Date, description: string): SingleEvent {
    return {
      ...this.createBaseEvent(title, description), // Get base properties
      type: 'single', // Add event type
      date, // Add single-event specific property
    };
  }
}
