import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { useWeather } from '../hooks/useWeather';
import { moodConfig } from '../utils/moodConfig';
import MoodCard from './MoodCard';
import "../styles/MoodMate.css";

import CustomCalendar from './CalenderView';
import HeaderInfo from './HeaderInfo';
import MoodSelector from './moodSelector';
import NoteInput from './NoteInput';
import EntriesList from './EntryList';
import EntryActions from './EntryActions';

interface Weather {
  temp: string;
  icon: string;
}

interface MoodEntry {
  mood: string;
  note: string;
  date: string;
  temp: string;
  icon: string;
}

const MoodMate: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showAllEntries, setShowAllEntries] = useState<boolean>(false);
  const weather: Weather = useWeather();
  const today: string = format(new Date(), 'PPP');
  const selectedDateString: string = format(selectedDate, 'yyyy-MM-dd');

  useEffect(() => {
    const storedEntries = localStorage.getItem('moodEntries');
    if (storedEntries) {
      setEntries(JSON.parse(storedEntries));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(entries));
  }, [entries]);

  const handleSave = () => {
    if (!selectedMood || !note.trim()) return alert('Please select mood and write note!');
    const entry: MoodEntry = {
      mood: selectedMood,
      note,
      date: selectedDateString,
      temp: weather.temp,
      icon: weather.icon,
    };
    setEntries([entry, ...entries]);
    setNote('');
    setSelectedMood('');
  };

  const bgGradient = moodConfig[selectedMood]?.gradient || 'linear-gradient(to right, #ffffff, #f3f3f3)';
  const entriesForSelectedDate = entries.filter((entry) => entry.date === selectedDateString);

  return (
    <div style={{ background: bgGradient, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div className="mainContainer" style={{ background: bgGradient }}>
        <HeaderInfo today={today} weather={weather} showAllEntries={showAllEntries} toggleShowAll={() => setShowAllEntries(!showAllEntries)} />

        {showAllEntries ? (
          <>
            <button onClick={() => setShowAllEntries(false)} className="my-4 px-4 py-2 bg-gray-600 text-white rounded">
              Back
            </button>

            <EntriesList entries={entries} />
          </>
        ) : (
          <>
            <div className="inside-card">
              <div className="calender" style={{ background: bgGradient, borderRadius: '1rem', padding: '1rem' }}>
                <CustomCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
              </div>

              <div className="mood">
                <MoodSelector selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
                <NoteInput note={note} setNote={setNote} />

                <EntryActions showAllEntries={showAllEntries} onSave={handleSave} onBack={() => setShowAllEntries(false)} />
              </div>
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">Mood Entries</h2>
              {entriesForSelectedDate.length > 0 ? (
                entriesForSelectedDate.map((entry, i) => <MoodCard key={i} {...entry} />)
              ) : (
                <p>No mood entries for this date.</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoodMate;
