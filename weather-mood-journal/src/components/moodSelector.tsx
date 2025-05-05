import React from 'react';
import { moodConfig } from '../utils/moodConfig';

interface MoodSelectorProps {
  selectedMood: string;
  setSelectedMood: (mood: string) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, setSelectedMood }) => (
  <div className="mood-inside">
    {Object.keys(moodConfig).map((mood) => {
      const { color, gradient } = moodConfig[mood];
      const isSelected = selectedMood === mood;

      return (
        <button
          key={mood}
          onClick={() => setSelectedMood(mood)}
          className={`text-3xl p-2 rounded-full cursor-pointer`}
          style={{
            backgroundColor: isSelected ? color : '',
            ringColor: isSelected ? color : '',  
            backgroundImage: isSelected ? gradient : '',
            borderWidth: isSelected ? '2px' : '0px',
          }}
        >
          {mood}
        </button>
      );
    })}
  </div>
);

export default MoodSelector;
