import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export enum AppTheme {
  System = 'system',
  Light = 'light',
  Dark = 'dark',
}

export function getLabelForAppTheme(theme: AppTheme): string {
  switch (theme) {
    case AppTheme.System: return 'System';
    case AppTheme.Light: return 'Light';
    case AppTheme.Dark: return 'Dark';
  }
}

export interface AppThemeColors {
  variant: 'light' | 'dark';
  primary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
  overlay: string;
  shadow: string;
  surface: string;
  surfaceSecondary: string;
  placeholder: string;
  appbarBackground: string;
  inputBackground: string;
  inputText: string;
  info: string;
  warning: string;
  error: string;
  /* Custom token extensions if an app needs custom color tokens */
  custom: { [key: string]: string; }
}

export interface AppThemeConfig {
  lightColors: AppThemeColors;
  darkColors: AppThemeColors;
}

export function createAppTheme(config: {
  lightColors?: AppThemeColors;
  darkColors?: AppThemeColors;
}): AppThemeConfig {
  const lightColors = config.lightColors as AppThemeColors;
  const darkColors = config.darkColors as AppThemeColors;
  return {
    lightColors,
    darkColors
  };
}

export const defaultThemeConfig: AppThemeConfig = createAppTheme({
  lightColors: {
    variant: 'light',
    primary: '#01579B',
    accent: '#890817',
    background: '#ffffff',
    appbarBackground: '#f4f4f5',
    placeholder: '#999999',
    text: '#000000',
    border: '#383838ff',
    overlay: 'rgba(0, 0, 0, 0.4)',
    shadow: '#000000',
    surface: '#f4f4f5',
    surfaceSecondary: '#e4e4e7',
    inputBackground: '#ffffff',
    inputText: '#000000',
    info: '#01579B',
    warning: '#f59e0b',
    error: '#ef4444',
    custom: {}
  },
  darkColors: {
    variant: 'dark',
    primary: '#38bdf8',
    accent: '#ff4d6d',
    background: '#121212',
    appbarBackground: '#27272a',
    placeholder: '#999999',
    text: '#ffffff',
    border: '#afafafff',
    overlay: 'rgba(0, 0, 0, 0.6)',
    shadow: '#000000',
    surface: '#27272a',
    surfaceSecondary: '#3f3f46',
    inputBackground: '#212121ff',
    inputText: '#ffffff',
    info: '#38bdf8',
    warning: '#fbbf24',
    error: '#f87171',
    custom: {}
  }
});

const ThemeContext = createContext<AppThemeColors | null>(null);

const getResolvedColors = (theme: AppTheme, systemScheme: string | null | undefined, config: AppThemeConfig) => {
  const isDark = theme === AppTheme.Dark || (theme === AppTheme.System && systemScheme === 'dark');
  return isDark ? config?.darkColors : config?.lightColors;
};

export function ThemeProvider({
  theme = AppTheme.System,
  themeConfig,
  children
}: {
  theme?: AppTheme;
  themeConfig: AppThemeConfig;
  children: React.ReactNode;
}) {
  const systemColorScheme = useColorScheme();
  const [colors, setColors] = useState<AppThemeColors>(() =>
    getResolvedColors(theme, systemColorScheme, themeConfig)
  );

  useEffect(() => {
    if (!themeConfig) return;
    setColors(getResolvedColors(theme, systemColorScheme, themeConfig));
  }, [theme, systemColorScheme, themeConfig]);

  return (
    <ThemeContext.Provider value={colors}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useAppTheme(): AppThemeColors {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }

  return context;
}
