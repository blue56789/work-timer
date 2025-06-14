import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getMs, getTime } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SavedTime {
  input: string;
  value: number;
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
function getStartTime() {
  const start = getSavedTime("start");
  const duration = getSavedTime("duration");
  if (!start || !duration) return "";
  if (start.value + duration.value < Date.now()) return "";
  return start.input;
}

export default function TimeInput({
  setStart,
  setDuration,
}: {
  setStart: (v: number) => void;
  setDuration: (v: number) => void;
}) {
  const [startInput, setStartInput] = useState(getStartTime());
  const [durationInput, setDurationInput] = useState(
    getSavedTime("duration")?.input || "09:00"
  );

  useEffect(() => {
    const val =
      startInput == "" ? 0 : getTime(...(startInput.split(":") as []));
    saveTime("start", {
      input: startInput,
      value: val,
    });
    setStart(val);
  }, [startInput, setStart]);
  useEffect(() => {
    const val = getMs(...(durationInput.split(":") as []));
    saveTime("duration", {
      input: durationInput,
      value: val,
    });
    setDuration(val);
  }, [durationInput, setDuration]);

  return (
    <div className="flex gap-8">
      <Label className="flex flex-col gap-2 font-semibold">
        Start Time
        <Input
          type="time"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
        />
      </Label>
      <Label className="flex flex-col gap-2 font-semibold">
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
