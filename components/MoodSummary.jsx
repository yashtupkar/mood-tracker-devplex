import React, { useMemo } from 'react';

const MoodSummary = ({ moodEntries }) => {
  // Calculate mood distribution
  const moodStats = useMemo(() => {
    if (moodEntries.length === 0) return null;
    
    // Count occurrences of each mood
    const moodCounts = moodEntries.reduce((acc, { mood }) => {
      acc[mood.value] = (acc[mood.value] || 0) + 1;
      return acc;
    }, {});
    
    // Calculate percentages
    const total = moodEntries.length;
    const moodPercentages = {};
    
    for (const mood in moodCounts) {
      moodPercentages[mood] = Math.round((moodCounts[mood] / total) * 100);
    }
    
    // Find most common mood
    let mostCommonMood = null;
    let maxCount = 0;
    
    for (const mood in moodCounts) {
      if (moodCounts[mood] > maxCount) {
        maxCount = moodCounts[mood];
        mostCommonMood = moodEntries.find(entry => entry.mood.value === mood).mood;
      }
    }
    
    // Get mood streak (consecutive days with entries)
    const sortedEntries = [...moodEntries].sort((a, b) => new Date(b.date) - new Date(a.date));
    let currentStreak = 0;
    
    if (sortedEntries.length > 0) {
      currentStreak = 1;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const firstEntryDate = new Date(sortedEntries[0].date);
      firstEntryDate.setHours(0, 0, 0, 0);
      
      // Check if most recent entry is from today
      if (firstEntryDate.getTime() === today.getTime()) {
        let prevDate = today;
        
        // Count consecutive days
        for (let i = 1; i < sortedEntries.length; i++) {
          const entryDate = new Date(sortedEntries[i].date);
          entryDate.setHours(0, 0, 0, 0);
          
          const expectedPrevDate = new Date(prevDate);
          expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
          
          if (entryDate.getTime() === expectedPrevDate.getTime()) {
            currentStreak++;
            prevDate = entryDate;
          } else {
            break;
          }
        }
      } else {
        currentStreak = 0;
      }
    }
    
    return {
      moodCounts,
      moodPercentages,
      mostCommonMood,
      currentStreak,
      totalEntries: total,
    };
  }, [moodEntries]);

  if (!moodStats) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <div className="text-5xl mb-3">📊</div>
        <h3 className="text-lg font-medium text-slate-700 mb-2">No data available</h3>
        <p className="text-slate-500 text-sm">Start tracking your mood to see statistics here.</p>
      </div>
    );
  }

  const { moodPercentages, mostCommonMood, currentStreak, totalEntries } = moodStats;

  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h3 className="text-lg font-medium text-slate-700 mb-4">Mood Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-indigo-50 rounded-lg p-4 text-center">
          <p className="text-sm text-indigo-600 mb-1">Most Common Mood</p>
          <div className="text-2xl mb-1">{mostCommonMood.emoji}</div>
          <p className="font-medium text-slate-700">{mostCommonMood.label}</p>
        </div>
        
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <p className="text-sm text-green-600 mb-1">Current Streak</p>
          <p className="text-3xl font-light text-slate-700 mb-1">{currentStreak}</p>
          <p className="text-xs text-slate-500">consecutive days</p>
        </div>
        
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-600 mb-1">Total Entries</p>
          <p className="text-3xl font-light text-slate-700 mb-1">{totalEntries}</p>
          <p className="text-xs text-slate-500">mood records</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-sm font-medium text-slate-700 mb-3">Mood Distribution</h4>
        
        <div className="space-y-3">
          {['joyful', 'happy', 'neutral', 'sad', 'anxious'].map(mood => {
            const percentage = moodPercentages[mood] || 0;
            const colors = {
              joyful: 'bg-yellow-200',
              happy: 'bg-green-200',
              neutral: 'bg-blue-200',
              sad: 'bg-indigo-200',
              anxious: 'bg-purple-200'
            };
            
            return (
              <div key={mood} className="w-full">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-500 capitalize">{mood}</span>
                  <span className="text-xs font-medium text-slate-700">{percentage}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${colors[mood]}`} 
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-xs text-slate-500">
          Continue tracking your moods daily to see more detailed insights.
        </p>
      </div>
    </div>
  );
};

export default MoodSummary;