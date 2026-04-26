import { useContext, useMemo } from "react";
import { ThemeProvider as MuiProvider, createTheme } from "@mui/material";
import { ThemeProviderContext } from "../context/ThemeContext";

export function MuiThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useContext(ThemeProviderContext);

  const paletteMode = useMemo(() => {
    if (theme === "system") {
      return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return theme === "dark" ? "dark" : "light";
  }, [theme]);

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: paletteMode,
          primary: {
            main: "#ef4444",
          },
          secondary: {
            main: "#2563eb",
          },
        },
        typography: {
          button: {
            textTransform: "none",
          },
        },
      }),
    [paletteMode]
  );

  return (
    <MuiProvider theme={muiTheme}>
      {children}
    </MuiProvider>
  );
}
