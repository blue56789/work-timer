import CircularProgress from "@/components/progress-09";
import { get00 } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressInterface {
  per: number;
  timeLeft: number;
}

function getTimeLeft(sec: number) {
  const hh = get00(Math.floor(sec / 3600));
  const mm = get00(Math.floor((sec / 60) % 60));
  const ss = get00(Math.floor(sec % 60));
  return `${hh}:${mm}:${ss}`;
}

export default function Progress({
  start,
  duration,
}: {
  start: number;
  duration: number;
}) {
  const [progress, setProgress] = useState<ProgressInterface>({
    per: 100,
    timeLeft: 0,
  });

  useEffect(() => {
    const end = start + duration;
    const delta = end - start;
    const interval = setInterval(() => {
      if (start == 0) {
        clearInterval(interval);
        return;
      }
      const now = Date.now();
      setProgress({ per: ((now - start) / delta) * 100, timeLeft: end - now });
    }, 1000);
    return () => clearInterval(interval);
  }, [start, duration]);

  return (
    <CircularProgress
      value={progress.per}
      size={240}
      strokeWidth={16}
      showLabel
      renderLabel={(p) => (
        <div className="flex flex-col gap-1 justify-center items-center">
          <div className="font-bold text-2xl">{p.toFixed(2)}%</div>
          <div>{getTimeLeft(progress.timeLeft / 1000)}</div>
        </div>
      )}
    />
  );
}
