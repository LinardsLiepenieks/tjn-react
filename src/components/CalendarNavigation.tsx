import React from 'react';

interface CalendarNavigartionProps {
  month: Date;
  onLeft: () => void;
  onRight: () => void;
}

const CalendarNavigation: React.FC<CalendarNavigartionProps> = ({
  month,
  onLeft,
  onRight,
}) => {
  return (
    <nav className="flex items-center">
      <button onClick={onLeft} className="p-2 m-2 bg-gray-200 border-solid">
        {'<'}
      </button>
      <span>{month.toLocaleString('default', { month: 'long' })}</span>
      <button onClick={onRight} className="p-2 m-2 bg-gray-200 border-solid">
        {'>'}
      </button>
    </nav>
  );
};

export default CalendarNavigation;
