import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { themes, type ThemeSet } from "@/content/data";

type ThemeContextValue = {
  theme: ThemeSet;
  themeId: string;
  setThemeId: (id: string) => void;
  themes: ThemeSet[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const STORAGE_KEY = "sg-theme";

function applyTheme(theme: ThemeSet) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-onPrimary", theme.onPrimary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-onSecondary", theme.onSecondary);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme.primary);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeIdState] = useState(() => {
    if (typeof window === "undefined") return "2";
    return localStorage.getItem(STORAGE_KEY) ?? "1";
  });

  const theme = useMemo(
    () => themes.find((t) => t.id === themeId) ?? themes[1],
    [themeId],
  );

  const setThemeId = useCallback((id: string) => {
    setThemeIdState(id);
    localStorage.setItem(STORAGE_KEY, id);
  }, []);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const value = useMemo(
    () => ({ theme, themeId, setThemeId, themes }),
    [theme, themeId, setThemeId],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme requires ThemeProvider");
  return ctx;
}
