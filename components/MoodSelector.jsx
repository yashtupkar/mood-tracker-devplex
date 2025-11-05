import React, { useState } from 'react';

const MoodSelector = ({ onAddMood }) => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [note, setNote] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  
  const moods = [
    { value: 'joyful', emoji: '😄', color: 'bg-yellow-100 border-yellow-300', label: 'Joyful' },
    { value: 'happy', emoji: '🙂', color: 'bg-green-100 border-green-300', label: 'Happy' },
    { value: 'neutral', emoji: '😐', color: 'bg-blue-100 border-blue-300', label: 'Neutral' },
    { value: 'sad', emoji: '😔', color: 'bg-indigo-100 border-indigo-300', label: 'Sad' },
    { value: 'anxious', emoji: '😰', color: 'bg-purple-100 border-purple-300', label: 'Anxious' },
  ];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setIsExpanded(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMood) {
      onAddMood(selectedMood, note);
      setSelectedMood(null);
      setNote('');
      setIsExpanded(false);
    }
  };

  const handleCancel = () => {
    setSelectedMood(null);
    setNote('');
    setIsExpanded(false);
  };

  return (
    <div className="mt-6 bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 mood-scale-in">
      <div className="p-5 border-b border-slate-100">
        <h3 className="text-lg font-medium text-slate-700">How are you feeling today?</h3>
        <p className="text-sm text-slate-500 mt-1">Select the mood that best reflects your current state</p>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {moods.map((mood) => (
            <button
              key={mood.value}
              onClick={() => handleMoodSelect(mood)}
              className={`
                flex flex-col items-center p-3 rounded-lg border-2 transition-all
                ${selectedMood?.value === mood.value ? 
                  `${mood.color} scale-110` : 
                  'border-slate-200 hover:border-slate-300 bg-slate-50'}
              `}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs font-medium text-slate-600">{mood.label}</span>
            </button>
          ))}
        </div>

        {isExpanded && (
          <form onSubmit={handleSubmit} className="mt-4 mood-fade-in">
            <div className="mb-4">
              <label htmlFor="note" className="block text-sm font-medium text-slate-700 mb-1">
                Add a note (optional)
              </label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300 text-sm text-slate-600"
                placeholder="How are you feeling today? What's on your mind?"
                rows="3"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 rounded-lg text-sm font-medium text-white hover:bg-indigo-600 transition-colors"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MoodSelector;