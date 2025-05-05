import React from 'react';
import MoodCard from './MoodCard';

interface Entry {
  mood: string;
  note: string;
  date: string;
  temp: string;
  icon: string;
}

interface EntriesListProps {
  entries: Entry[];
}

const EntriesList: React.FC<EntriesListProps> = ({ entries }) => (
  entries.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {entries.map((entry, i) => <MoodCard key={i} {...entry} />)}
    </div>
  ) : <p>No entries saved yet.</p>
);

export default EntriesList;
