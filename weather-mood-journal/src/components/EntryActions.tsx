import React from 'react';

interface EntryActionsProps {
  showAllEntries: boolean;
  onSave: () => void;
  onBack: () => void;
}

const EntryActions: React.FC<EntryActionsProps> = ({ showAllEntries, onSave, onBack }) => (
  showAllEntries ? (
    <button
      onClick={onBack}
      className="my-4 px-4 py-2 bg-gray-600 text-white rounded"
    >
      Back
    </button>
  ) : (
    <button onClick={onSave} className="btn">
      Save Entry
    </button>
  )
);

export default EntryActions;
