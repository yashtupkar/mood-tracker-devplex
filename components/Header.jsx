import React from 'react';

const Header = () => {
  return (
    <header className="pt-8 pb-4">
      <div className="text-center">
        <h1 className="text-3xl font-light text-indigo-600 mb-2 tracking-wide">
          Serene
        </h1>
        <div className="flex items-center justify-center space-x-2">
          <div className="h-[1px] w-8 bg-indigo-300"></div>
          <h2 className="text-md font-medium text-slate-500 tracking-widest uppercase">Mood Tracker</h2>
          <div className="h-[1px] w-8 bg-indigo-300"></div>
        </div>
        <p className="mt-4 text-slate-500 max-w-md mx-auto text-sm">
          Track your emotional journey with a moment of daily reflection.
        </p>
      </div>
    </header>
  );
};

export default Header;