export default function MoodCard({ mood, note, date, temp, icon }:any) {
    return (
      <div className="bg-white p-4 rounded-lg shadow flex items-start justify-between">
        <div>
          <div className="text-2xl">{mood}</div>
          <p className="text-sm text-gray-600">{date}</p>
          <p className="mt-2">{note}</p>
        </div>
        <div className="text-right">
          {temp && (
            <div className="flex items-center gap-1">
              <img src={icon} alt="weather" className="w-5 h-5" />
              <span>{temp}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
  