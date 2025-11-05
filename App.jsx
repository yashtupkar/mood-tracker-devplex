import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MoodSelector from './components/MoodSelector';
import MoodHistory from './components/MoodHistory';
import Calendar from './components/Calendar';
import MoodSummary from './components/MoodSummary';
import Footer from './components/Footer';

const App = () => {
  // Mood states with localStorage persistence
  const [moodEntries, setMoodEntries] = useState(() => {
    const savedMoods = localStorage.getItem('moodEntries');
    return savedMoods ? JSON.parse(savedMoods) : [];
  });

  // Active view state (calendar, list, summary)
  const [activeView, setActiveView] = useState('calendar');

  // Save mood entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  // Add a new mood entry
  const addMoodEntry = (mood, note) => {
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString(),
      mood,
      note,
    };
    
    setMoodEntries(prevEntries => [newEntry, ...prevEntries]);
  };

  // Delete a mood entry
  const deleteMoodEntry = (id) => {
    setMoodEntries(prevEntries => 
      prevEntries.filter(entry => entry.id !== id)
    );
  };

  // Render the active view component
  const renderActiveView = () => {
    switch(activeView) {
      case 'calendar':
        return <Calendar moodEntries={moodEntries} />;
      case 'history':
        return <MoodHistory moodEntries={moodEntries} onDelete={deleteMoodEntry} />;
      case 'summary':
        return <MoodSummary moodEntries={moodEntries} />;
      default:
        return <Calendar moodEntries={moodEntries} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col transition-colors duration-300">
      <div className="container max-w-4xl mx-auto px-4 flex-1 pb-20">
        <Header />
        
        <MoodSelector onAddMood={addMoodEntry} />
        
        <div className="mt-8 mb-4 flex justify-center">
          <div className="inline-flex rounded-lg bg-slate-100 p-1 shadow-sm">
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeView === 'calendar' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeView === 'history' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveView('history')}
            >
              History
            </button>
            <button 
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeView === 'summary' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
              onClick={() => setActiveView('summary')}
            >
              Summary
            </button>
          </div>
        </div>
        
        <div className="mt-4 mood-fade-in">
          {renderActiveView()}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default App;