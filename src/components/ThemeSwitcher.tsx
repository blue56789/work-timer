import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeSwitcher({
  theme,
  toggleTheme,
}: {
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <Button
      variant="outline"
      className="size-10 rounded-full"
      onClick={toggleTheme}
    >
      {theme == "light" ? (
        <Sun className="!size-5" />
      ) : (
        <Moon className="!size-5" />
      )}
    </Button>
  );
}
