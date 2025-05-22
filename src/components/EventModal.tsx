import React, { useEffect, useRef, useState } from 'react';
import { CalendarEvent } from '../types/CalendarEvent';
import styles from '../styles/EventModal.module.css';

import { useCalendarEventContext } from '../contexts/CalendarEventContext';
import EventForm from './EventForm';
import { EventInput } from './EventForm';
import { title } from 'process';

interface EventModalProps {
  event: CalendarEvent | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  // A React ref allows us to directly reference and access a DOM element
  // In this case, we need the ref to check if a click occurs inside or outside the modal
  // When we click outside the modal, we want to close it, but clicks inside shouldn't close it
  // Unlike state variables, changing a ref's value doesn't cause a re-render
  const modalRef = useRef<HTMLDivElement>(null);
  const [isExiting, setIsExiting] = useState(false);
  const { updateEvents, deleteEvent } = useCalendarEventContext();

  const handleDelete = () => {
    deleteEvent(event?._id);
    console.log(event?._id);
  };

  const handleUpdate = (eventData: EventInput) => {
    console.log('STARTING UPDATE', eventData);
    const { _id, title, date, description } = eventData;
    console.log(_id);

    if (_id) {
      updateEvents(_id, title, date, description);
    }
  };

  // Handle close with animation
  const handleClose = () => {
    setIsExiting(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration (0.3s)
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  if (!event) return null;

  // Format dates for display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isExiting ? styles.backgroundExit : styles.backgroundEnter
      }`}
    >
      <div
        ref={modalRef}
        className={`bg-white w-full max-w-md rounded-lg p-6 shadow-xl max-h-[90vh] overflow-auto ${
          styles.modalContent
        } ${isExiting ? styles.modalExit : styles.modalEnter}`}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
          <button
            onClick={handleClose}
            className={`text-gray-500 rounded-full w-8 h-8 flex items-center justify-center focus:outline-none ${styles.modalClose}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Date</div>
          <div className="text-gray-700">{formatDate(event.date)}</div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-500 mb-1">Description</div>
          <p className="text-gray-700 whitespace-pre-wrap">
            {event.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-gray-500 mb-1">Created</div>
            <div className="text-gray-700">{formatDate(event.createdAt)}</div>
          </div>
          <div>
            <div className="text-gray-500 mb-1">Last Updated</div>
            <div className="text-gray-700">{formatDate(event.updatedAt)}</div>
          </div>
        </div>
        <EventForm
          onSubmit={handleUpdate}
          type={'Update'}
          event={event}
        ></EventForm>
        <button
          className="bg-red-500 text-white p-2 px-4 rounded-md mt-2"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EventModal;
