import React from 'react';

interface Weather {
  temp: string;
  icon: string;
}

interface HeaderInfoProps {
  today: string;
  weather: Weather;
  showAllEntries: boolean;
  toggleShowAll: () => void;
}

const HeaderInfo: React.FC<HeaderInfoProps> = ({ today, weather, showAllEntries, toggleShowAll }) => (
  <div className='header-info'>
    <h1 className="text-2xl font-bold">MoodMate</h1>
    <p className="text-gray-600">{today}</p>
    {weather.temp && (
      <div className="flex gap-3 items-center">
        <img src={weather.icon} alt="weather" className="w-10 h-10" />
        <span>{weather.temp}</span>
      </div>
    )}
    {!showAllEntries && (
      <button
        onClick={toggleShowAll}
        className="px-4 py-2 bg-blue-500 text-white rounded shadow"
      >
        View All Entries
      </button>
    )}
  </div>
);

export default HeaderInfo;
