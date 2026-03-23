import { useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
  listeners.forEach((cb) => cb());
}

// Initialize on load
if (typeof window !== "undefined") {
  const stored = localStorage.getItem("theme") as Theme | null;
  const preferred =
    stored ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  document.documentElement.classList.toggle("dark", preferred === "dark");
  localStorage.setItem("theme", preferred);
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "light" as Theme,
  );

  const setTheme = useCallback((t: Theme) => applyTheme(t), []);
  const toggleTheme = useCallback(
    () => applyTheme(getTheme() === "dark" ? "light" : "dark"),
    [],
  );

  return { theme, setTheme, toggleTheme };
}
