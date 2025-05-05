import React from 'react';

interface NoteInputProps {
  note: string;
  setNote: (note: string) => void;
}

const NoteInput: React.FC<NoteInputProps> = ({ note, setNote }) => (
  <textarea
    placeholder="How are you feeling today?"
    className="w-full p-2 border rounded mb-4 resize-none"
    value={note}
    onChange={(e) => setNote(e.target.value)}
    style={{ height: '100px' }}
  />
);

export default NoteInput;
