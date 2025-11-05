import React from 'react';
import MoodEntry from './MoodEntry';

const MoodHistory = ({ moodEntries, onDelete }) => {
  if (moodEntries.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-5xl mb-3">📝</div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">No mood entries yet</h3>
        <p className="text-slate-500 text-sm">Start tracking your mood to see your history here.</p>
      </div>
    );
  }

  // Group entries by date for display
  const groupedEntries = moodEntries.reduce((acc, entry) => {
    const date = new Date(entry.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    if (!acc[date]) {
      acc[date] = [];
    }
    
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div>
      {Object.keys(groupedEntries).map((date) => (
        <div key={date} className="mb-6">
          <h3 className="text-sm font-medium text-slate-500 mb-3 pl-1">{date}</h3>
          {groupedEntries[date].map((entry) => (
            <MoodEntry 
              key={entry.id} 
              entry={entry} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MoodHistory;