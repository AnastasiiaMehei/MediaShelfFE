import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/Button"; 
import { useTheme } from "../hooks/useTheme";

export function ModeToggle() {
  const {  setTheme } = useTheme();

  return (
    <>
      <Button
        className="hidden dark:flex"
        onClick={() => setTheme("light")}
        variant="outline"
        size="icon"
      >
        <Sun strokeWidth={1} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Switch to light mode</span>
      </Button>

       <Button
        className="dark:hidden"
        onClick={() => setTheme("dark")}
        variant="outline"
        size="icon"
      >
        <Moon strokeWidth={1} className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Switch to dark mode</span>
      </Button>
    </>
  );
}
