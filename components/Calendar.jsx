import React, { useState } from 'react';

const Calendar = ({ moodEntries }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Format the current month/year
  const monthYear = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Get days in month
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Add empty days for padding at start of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10"></div>);
    }
    
    // Create days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      
      // Find mood entry for this day
      const dayEntry = moodEntries.find(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getDate() === day && 
               entryDate.getMonth() === month && 
               entryDate.getFullYear() === year;
      });
      
      days.push(
        <div 
          key={day} 
          className={`h-12 w-12 flex items-center justify-center rounded-full text-sm relative
                      ${dayEntry ? 'font-medium' : 'text-slate-500 hover:bg-slate-100'}`}
        >
          {day}
          {dayEntry && (
            <div 
              className="absolute inset-0 rounded-full opacity-50"
              style={{
                backgroundColor: dayEntry.mood.value === 'joyful' ? '#fef08a' : 
                                dayEntry.mood.value === 'happy' ? '#bbf7d0' :
                                dayEntry.mood.value === 'neutral' ? '#bfdbfe' :
                                dayEntry.mood.value === 'sad' ? '#c7d2fe' : 
                                '#ddd6fe'
              }}
            ></div>
          )}
          {dayEntry && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
              <span className="text-lg">{dayEntry.mood.emoji}</span>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={prevMonth}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="Previous month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="font-medium text-slate-700">{monthYear}</h3>
        <button 
          onClick={nextMonth}
          className="p-1 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
          aria-label="Next month"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-xs font-medium text-slate-400">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1 justify-items-center">
        {generateCalendar()}
      </div>
      
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-yellow-200 mr-2"></div>
          <span className="text-xs text-slate-600">Joyful</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-green-200 mr-2"></div>
          <span className="text-xs text-slate-600">Happy</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-blue-200 mr-2"></div>
          <span className="text-xs text-slate-600">Neutral</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-200 mr-2"></div>
          <span className="text-xs text-slate-600">Sad</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-purple-200 mr-2"></div>
          <span className="text-xs text-slate-600">Anxious</span>
        </div>
      </div>
    </div>
  );
};

export default Calendar;