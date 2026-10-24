"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "night", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("night");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "day" || saved === "night") setTheme(saved);
    setReady(true);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    if (ready) window.localStorage.setItem("portfolio-theme", theme);
  }, [theme, ready]);

  const toggleTheme = () => setTheme((value) => (value === "night" ? "day" : "night"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
