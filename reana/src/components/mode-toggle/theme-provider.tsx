"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  attribute?: string;
  disableTransitionOnChange?: boolean;
};

const initialState: {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} = {
  theme: "light",
  setTheme: () => null,
  toggleTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  attribute = "class",
  disableTransitionOnChange = false,
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    const removeOldTheme = () => {
      if (attribute === "class") {
        root.classList.remove("light", "dark");
      } else {
        root.removeAttribute(attribute);
      }
    };

    const applyTheme = (newTheme: Theme) => {
      if (disableTransitionOnChange) {
        document.documentElement.classList.add("transition-none");
        requestAnimationFrame(() => {
          document.documentElement.classList.remove("transition-none");
        });
      }
      if (attribute === "class") {
        root.classList.add(newTheme);
      } else {
        root.setAttribute(attribute, newTheme);
      }
      localStorage.setItem("theme", newTheme);
    };
    
    removeOldTheme();
    applyTheme(theme);
  }, [theme, attribute, disableTransitionOnChange]);

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};