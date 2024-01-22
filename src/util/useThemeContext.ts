import { useCallback, useContext, useMemo } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';
import { ThemeContext } from '../components/ThemeProvider';
import colors from './theme/colors';

export default function useThemeContext() {
  const context = useContext(ThemeContext);
  const systemColorScheme = useColorScheme();
  const defaultIconWidth = "32"
  const defaultIconHeight = "32"
  if (context === undefined) {
    throw new Error('useThemeContext must be within ThemeProvider');
  }

  const { theme, loading,backgroundImagePath,setBackgroundImagePath, setTheme, iconColor, setIconColor, iconHeight, iconWidth, setIconWidth, setIconHeight, iconNameStartup, iconNameSettings, setIconNameSettings, setIconNameStartup } = context;

  if (loading) {
    throw new Error('Tried to use ThemeContext before initialized');
  }
  const colorTheme: NonNullable<ColorSchemeName> =
    theme ?? systemColorScheme ?? 'light';
  const IconcolorTheme = theme === 'dark' ? colors.dark.text : colors.light.text;
  return {
    backgroundImagePath: useMemo(() => {
      return backgroundImagePath ? backgroundImagePath : "";
    }, [backgroundImagePath]),
    iconNameStartup: useMemo(() => {
      return iconNameStartup ? iconNameStartup : "videocamera";
    }, [iconNameStartup]),
    iconNameSettings: useMemo(() => {
      return iconNameSettings ? iconNameSettings : "circledowno";
    }, [iconNameSettings]),
    colors: useMemo(() => {
      return colors[colorTheme || 'light'];
    }, [colorTheme]),
    colorTheme,
    iconColor: useMemo(() => {
      return iconColor ? iconColor : IconcolorTheme;
    }, [iconColor, IconcolorTheme]),
    iconHeight: useMemo(() => {
      return iconHeight ? iconHeight : defaultIconHeight;
    }, [iconHeight]),
    iconWidth: useMemo(() => {
      return iconWidth ? iconWidth : defaultIconWidth;
    }, [iconWidth]),
    IconcolorTheme,
    isSystemTheme: !theme,
    isDark: theme === 'dark',
    systemTheme: systemColorScheme,
    setIconNameStartup: useCallback(
      (name: string) => setIconNameStartup(name),
      [setIconNameStartup],
    ),
    setIconNameSettings: useCallback(
      (name: string) => setIconNameSettings(name),
      [setIconNameSettings],
    ),
    setBackgroundImagePath: useCallback(
      (path: string) => setBackgroundImagePath(path),
      [setBackgroundImagePath],
    ),
    setIconHeight: useCallback(
      (height: string) => setIconHeight(height),
      [setIconHeight],
    ),
    setIconWidth: useCallback(
      (width: string) => setIconWidth(width),
      [setIconWidth],
    ),
    setIconColor: useCallback(
      (color: string) => setIconColor(color),
      [setIconColor],
    ),
    setColorTheme: useCallback(
      (themeName: ColorSchemeName) => setTheme(themeName),
      [setTheme],
    ),
  };
}
