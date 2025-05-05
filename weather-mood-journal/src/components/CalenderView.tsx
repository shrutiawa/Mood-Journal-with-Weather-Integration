import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface CustomCalendarProps {
  selectedDate: Date | null;
  setSelectedDate: any; 
}

const CustomCalendar: React.FC<CustomCalendarProps>= ({ selectedDate, setSelectedDate }) => {
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 50 + i);
  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString('default', { month: 'long' })
  );

  const updateCalendarDate = (newYear: number, newMonth: number) => {
    const updated = new Date(activeStartDate);
    updated.setFullYear(newYear);
    updated.setMonth(newMonth);
    setActiveStartDate(new Date(updated));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newYear = parseInt(e.target.value, 10);
    updateCalendarDate(newYear, activeStartDate.getMonth());
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    updateCalendarDate(activeStartDate.getFullYear(), newMonth);
  };

  return (
   
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month"
        activeStartDate={activeStartDate}
        tileClassName="text-sm"
        className="custom-calendar"
        navigationLabel={() => (
          <div className="flex gap-2 items-center justify-center mb-2">
            <select
              value={activeStartDate.getFullYear()}
              onChange={handleYearChange}
              className="px-2 py-1 rounded border-1"
            >
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select
              value={activeStartDate.getMonth()}
              onChange={handleMonthChange}
              className="px-2 py-1 rounded border-1"
            >
              {months.map((month, i) => (
                <option key={i} value={i}>{month}</option>
              ))}
            </select>
          </div>
        )}
        next2Label={null}
        prev2Label={null}
      />
  );
}
export default  CustomCalendar