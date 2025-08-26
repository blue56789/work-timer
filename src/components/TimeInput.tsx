import NumberInput from "@/components/NumberInput";
import { Label } from "@/components/ui/label";
import { getMs, getTime } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SavedTime {
  input?: { hh: number; mm: number };
  value: number;
}
type TimeType = "start" | "duration";

function saveTime(type: TimeType, time: SavedTime) {
  localStorage.setItem(type, JSON.stringify(time));
}
function getSavedTime(type: TimeType) {
  const saved = JSON.parse(`${localStorage.getItem(type)}`) as SavedTime;
  if (!saved) return null;
  return saved;
}
function getStartTime() {
  const start = getSavedTime("start");
  const duration = getSavedTime("duration");
  if (!start || !duration) return undefined;
  if (start.value + duration.value < Date.now()) return undefined;
  return start.input;
}

export default function TimeInput({
  setStart,
  setDuration,
}: {
  setStart: (v: number) => void;
  setDuration: (v: number) => void;
}) {
  const [startH, setStartH] = useState<number | undefined>(getStartTime()?.hh);
  const [startM, setStartM] = useState<number | undefined>(getStartTime()?.mm);
  const [durationH, setDurationH] = useState<number | undefined>(
    getSavedTime("duration")?.input?.hh || 9
  );
  const [durationM, setDurationM] = useState<number | undefined>(
    getSavedTime("duration")?.input?.mm || 0
  );

  useEffect(() => {
    if (startH == undefined || startM == undefined) {
      saveTime("start", { value: 0 });
      return;
    }
    const val = getTime(startH, startM);
    saveTime("start", {
      input: { hh: startH, mm: startM },
      value: val,
    });
    setStart(val);
  }, [startH, startM, setStart]);
  useEffect(() => {
    if (durationH == undefined || durationM == undefined) {
      saveTime("duration", { value: 0 });
      return;
    }
    const val = getMs(durationH, durationM);
    saveTime("duration", {
      input: { hh: durationH, mm: durationM },
      value: val,
    });
    setDuration(val);
  }, [durationH, durationM, setDuration]);

  return (
    <div className="flex gap-8">
      <Label className="flex flex-col gap-2 font-semibold">
        Start Time
        <div className="flex items-center gap-2">
          <NumberInput num={startH} setNum={setStartH} max={23} />
          <span>:</span>
          <NumberInput num={startM} setNum={setStartM} max={59} />
        </div>
      </Label>
      <Label className="flex flex-col gap-2 font-semibold">
        Duration
        <div className="flex items-center gap-2">
          <NumberInput num={durationH} setNum={setDurationH} max={99} />
          <span>:</span>
          <NumberInput num={durationM} setNum={setDurationM} max={59} />
        </div>
      </Label>
    </div>
  );
}
