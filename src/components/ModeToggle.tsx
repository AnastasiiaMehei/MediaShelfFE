import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/Button"; 
import { useTheme } from "../hooks/useTheme";
import { motion } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", prefersDark);
    } else {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  return (
    <div className="flex items-center gap-2">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          className="hidden dark:flex"
          onClick={() => setTheme("light")}
          variant="outline"
          size="icon"
        >
          <Sun strokeWidth={1} className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to light mode</span>
        </Button>
      </motion.div>

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          className="dark:hidden"
          onClick={() => setTheme("dark")}
          variant="outline"
          size="icon"
        >
          <Moon strokeWidth={1} className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Switch to dark mode</span>
        </Button>
      </motion.div>
    </div>
  );
}
