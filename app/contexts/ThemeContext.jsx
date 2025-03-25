"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if we're in the browser
    if (typeof window !== "undefined") {
      // Check localStorage first
      const storedTheme = localStorage.getItem("theme");

      // If there's a stored theme, use it
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );
      }
      // Otherwise, check user's system preference
      else {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setTheme(systemPrefersDark ? "dark" : "light");
        document.documentElement.classList.toggle("dark", systemPrefersDark);
      }

      // Add listener for system theme change
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        if (!localStorage.getItem("theme")) {
          const newTheme = e.matches ? "dark" : "light";
          setTheme(newTheme);
          document.documentElement.classList.toggle("dark", e.matches);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Function to toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    // Store the theme preference in localStorage
    localStorage.setItem("theme", newTheme);

    // Add or remove dark class from html element
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
