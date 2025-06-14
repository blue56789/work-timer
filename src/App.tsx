import Progress from "@/components/Progress";
import TimeInput from "@/components/TimeInput";
import { useState } from "react";

function App() {
  const [start, setStart] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <div className="h-dvh bg-background flex justify-center">
      <div className="container h-full flex flex-col justify-center items-center gap-8">
        <TimeInput setStart={setStart} setDuration={setDuration} />
        <Progress start={start} duration={duration} />
      </div>
    </div>
  );
}

export default App;
