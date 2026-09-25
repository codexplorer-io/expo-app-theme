# `@codexporer.io/expo-app-theme`

Dynamic theme management and theming system for Expo and React Native applications. Supports light, dark, and system themes with full TypeScript type safety and customizable color tokens.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-app-theme
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)

## Quick Start

### 1. Define or Use a Theme Configuration

You can use the built-in `defaultThemeConfig` or create custom themes with `createAppTheme()`:

```tsx
import React from 'react';
import { ThemeProvider, defaultThemeConfig } from '@codexporer.io/expo-app-theme';

export function App() {
  return (
    <ThemeProvider themeConfig={defaultThemeConfig}>
      {/* App components */}
    </ThemeProvider>
  );
}
```

### 2. Custom Theme Configuration

```tsx
import { createAppTheme } from '@codexporer.io/expo-app-theme';

export const myThemeConfig = createAppTheme({
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
```

### 3. Consume Theme in Components

```tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '@codexporer.io/expo-app-theme';

export function Header() {
  const theme = useAppTheme();

  return (
    <View style={[styles.header, { backgroundColor: theme.appbarBackground }]}>
      <Text style={{ color: theme.text }}>Welcome</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
});
```

## API Reference

### `AppTheme` (Enum)
- `AppTheme.System = 'system'`
- `AppTheme.Light = 'light'`
- `AppTheme.Dark = 'dark'`

### Functions & Exports
- `ThemeProvider`: Context provider taking `themeConfig` and optional `theme` (`AppTheme`).
- `useAppTheme()`: Hook returning the current `AppThemeColors`.
- `createAppTheme(config)`: Helper to construct and validate `AppThemeConfig`.
- `defaultThemeConfig`: Pre-configured light and dark theme configuration.
- `getLabelForAppTheme(theme)`: Returns `'System'`, `'Light'`, or `'Dark'`.

### `AppThemeColors` Tokens
| Token | Type | Description |
| :--- | :--- | :--- |
| `variant` | `'light' \| 'dark'` | Active color mode variant |
| `primary` | `string` | Primary branding color |
| `accent` | `string` | Accent color |
| `background` | `string` | Screen background color |
| `surface` | `string` | Card / dialog surface color |
| `surfaceSecondary` | `string` | Secondary surface background |
| `text` | `string` | Main text color |
| `border` | `string` | Border / divider color |
| `placeholder` | `string` | Placeholder text / icon color |
| `appbarBackground` | `string` | Navigation / top header background |
| `inputBackground` | `string` | Text input background color |
| `inputText` | `string` | Text input font color |
| `overlay` | `string` | Modal backdrop color |
| `shadow` | `string` | Drop shadow color |
| `info` | `string` | Informational status color |
| `warning` | `string` | Warning status color |
| `error` | `string` | Error status color |
| `custom` | `Record<string, string>` | Custom app-specific tokens |

## License

MIT