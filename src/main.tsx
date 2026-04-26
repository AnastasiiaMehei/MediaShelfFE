// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "./components/ThemeProvider";
import { MuiThemeProvider } from "./components/MuiThemeProvider";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <MuiThemeProvider>
          <App />
          <Toaster />
        </MuiThemeProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
