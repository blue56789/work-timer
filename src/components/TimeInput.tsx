import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

interface SavedTime {
  input: string;
}
type TimeType = "start" | "duration";

function saveTime(type: TimeType, time: SavedTime) {
  localStorage.setItem(type, JSON.stringify(time));
}
function getSavedTime(type: TimeType) {
  const saved = JSON.parse(`${localStorage.getItem(type)}`) as SavedTime;
  if (saved?.input != "") return saved;
  return null;
}

export default function TimeInput() {
  const [startInput, setStartInput] = useState(
    getSavedTime("start")?.input || ""
  );
  const [durationInput, setDurationInput] = useState(
    getSavedTime("duration")?.input || "09:00"
  );

  useEffect(() => {
    saveTime("start", { input: startInput });
  }, [startInput]);
  useEffect(() => {
    saveTime("duration", { input: durationInput });
  }, [durationInput]);

  return (
    <div className="flex gap-8">
      <Label className="flex flex-col gap-2">
        Start Time
        <Input
          type="time"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
        />
      </Label>
      <Label className="flex flex-col gap-2">
        Duration
        <Input
          type="time"
          value={durationInput}
          onChange={(e) => setDurationInput(e.target.value)}
        />
      </Label>
    </div>
  );
}
