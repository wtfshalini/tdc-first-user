import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const CalendarFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 Days');

  const periods = [
    'Last 7 Days',
    'Last 30 Days',
    'Last 90 Days',
    'Last 6 Months',
    'Last Year',
    'Custom Range'
  ];

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        <Calendar className="w-4 h-4" />
        <span>{selectedPeriod}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {periods.map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodSelect(period)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedPeriod === period ? 'bg-green-50 text-custom-green font-medium' : 'text-gray-700'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarFilter;