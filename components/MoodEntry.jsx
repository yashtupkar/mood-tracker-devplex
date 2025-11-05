import React from 'react';

const MoodEntry = ({ entry, onDelete }) => {
  const { id, date, mood, note } = entry;
  
  // Format the date to a human-readable format
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 hover:shadow-md transition-shadow mood-fade-in"
      style={{ borderLeftColor: mood.value === 'joyful' ? '#fef08a' : 
                              mood.value === 'happy' ? '#bbf7d0' :
                              mood.value === 'neutral' ? '#bfdbfe' :
                              mood.value === 'sad' ? '#c7d2fe' : 
                              '#ddd6fe' }}>
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{mood.emoji}</span>
          <div>
            <h4 className="font-medium text-slate-700">{mood.label}</h4>
            <p className="text-xs text-slate-500">{formattedDate}</p>
          </div>
        </div>
        <button
          onClick={() => onDelete(id)}
          className="text-slate-400 hover:text-red-500 p-1 rounded-full hover:bg-slate-100 transition-colors"
          aria-label="Delete entry"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
      
      {note && (
        <div className="mt-3 pt-3 border-t border-slate-100">
          <p className="text-sm text-slate-600 whitespace-pre-wrap">{note}</p>
        </div>
      )}
    </div>
  );
};

export default MoodEntry;