import Progress from "@/components/Progress";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import TimeInput from "@/components/TimeInput";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(
    (() => {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme == "light" || savedTheme == "dark") return savedTheme;
      return "light";
    })()
  );

  const [start, setStart] = useState(0);
  const [duration, setDuration] = useState(0);
  return (
    <div
      className={`${theme} h-dvh bg-background text-foreground flex justify-center`}
    >
      <div className="relative container h-full flex flex-col justify-center items-center gap-6">
        <div className="absolute top-6 right-6">
          <ThemeSwitcher
            theme={theme}
            toggleTheme={() =>
              setTheme((t) => (t == "light" ? "dark" : "light"))
            }
          />
        </div>
        <TimeInput setStart={setStart} setDuration={setDuration} />
        <Progress start={start} duration={duration} />
      </div>
    </div>
  );
}

export default App;
