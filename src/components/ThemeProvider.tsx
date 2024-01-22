import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useEffect, useMemo, useState, } from 'react';
import { ImageBackground } from "react-native"
import { ColorSchemeName } from 'react-native';
import ImageWrapper from "./ImageWrapper"
const THEME_ASYNC_STORAGE_KEY = 'THEME_STATE';
const ICON_ASYNC_STORAGE_KEY = 'ICON_STATE';
const ICON_WIDTH_ASYNC_STORAGE_KEY = 'ICON_WIDTH_STATE';
const ICON_HEIGHT_ASYNC_STORAGE_KEY = 'ICON_HEIGHT_STATE';
const ICON_NAME_START_ASYNC_STORAGE_KEY = 'ICON_NAME_START_STATE';
const ICON_NAME_SETTINGS_ASYNC_STORAGE_KEY = 'ICON_NAME_SETTINGS_STATE';
const BACKGROUND_IMAGE_ASYNC_STORAGE_KEY = 'BACKGROUND_IMAGE_STATE';
type Props = {
  children: ReactNode;
};

export type ThemeContextState = {
  theme: ColorSchemeName;
  setTheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
  loading: boolean;
  iconColor: string;
  setIconColor: React.Dispatch<React.SetStateAction<string>>;
  iconWidth: string;
  iconHeight: string;
  setIconWidth: React.Dispatch<React.SetStateAction<string>>;
  setIconHeight: React.Dispatch<React.SetStateAction<string>>;
  iconNameStartup: string;
  iconNameSettings: string;
  setIconNameStartup: React.Dispatch<React.SetStateAction<string>>;
  setIconNameSettings: React.Dispatch<React.SetStateAction<string>>;
  backgroundImagePath: string;
  setBackgroundImagePath: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = React.createContext<ThemeContextState | undefined>(
  undefined,
);
export default function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<ColorSchemeName>();
  const [iconColor, setIconColor] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [iconWidth, setIconWidth] = useState<string>();
  const [iconHeight, setIconHeight] = useState<string>();
  const [iconNameStartup, setIconNameStartup] = useState<string>();
  const [iconNameSettings, setIconNameSettings] = useState<string>();
  const [backgroundImagePath, setBackgroundImagePath] = useState<string>();
  AsyncStorage.removeItem(BACKGROUND_IMAGE_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(THEME_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(ICON_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(ICON_WIDTH_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(ICON_HEIGHT_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(ICON_NAME_START_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(ICON_NAME_SETTINGS_ASYNC_STORAGE_KEY);
  useEffect(() => {
    const load = async () => {
      const storedBackgroundImagePath = (await AsyncStorage.getItem(
        BACKGROUND_IMAGE_ASYNC_STORAGE_KEY,
      )) as string;
      setBackgroundImagePath(storedBackgroundImagePath);
      setLoading(false);
    };

    load();
  }, []);
  useEffect(() => {
    const load = async () => {
      const storedNameStartup = (await AsyncStorage.getItem(
        ICON_NAME_START_ASYNC_STORAGE_KEY,
      )) as string;
      const storedNameSettings = (await AsyncStorage.getItem(
        ICON_NAME_SETTINGS_ASYNC_STORAGE_KEY,
      )) as string;
      setIconNameStartup(storedNameStartup);
      setIconNameSettings(storedNameSettings);
      setLoading(false);
    };

    load();
  }, []);
  useEffect(() => {
    const load = async () => {
      const storedWidth = (await AsyncStorage.getItem(
        ICON_WIDTH_ASYNC_STORAGE_KEY,
      )) as string;
      const storedHeight = (await AsyncStorage.getItem(
        ICON_HEIGHT_ASYNC_STORAGE_KEY,
      )) as string
      setIconHeight(storedHeight);
      setIconWidth(storedWidth);
      setLoading(false);
    };

    load();
  }, []);
  useEffect(() => {
    const load = async () => {
      const storedTheme = (await AsyncStorage.getItem(
        THEME_ASYNC_STORAGE_KEY,
      )) as ColorSchemeName;

      setTheme(storedTheme);
      setLoading(false);
    };

    load();
  }, []);
  useEffect(() => {
    const load = async () => {
      const storedColor = (await AsyncStorage.getItem(
        ICON_ASYNC_STORAGE_KEY,
      )) as string;

      setIconColor(storedColor);
      setLoading(false);
    };

    load();
  }, []);
  useEffect(() => {
    if (backgroundImagePath) {
      AsyncStorage.setItem(BACKGROUND_IMAGE_ASYNC_STORAGE_KEY, backgroundImagePath);
    } else {
      AsyncStorage.removeItem(BACKGROUND_IMAGE_ASYNC_STORAGE_KEY);
    }
  }, [backgroundImagePath]);
  useEffect(() => {
    if (iconNameSettings) {
      AsyncStorage.setItem(ICON_NAME_SETTINGS_ASYNC_STORAGE_KEY, iconNameSettings);
    } else {
      AsyncStorage.removeItem(ICON_NAME_SETTINGS_ASYNC_STORAGE_KEY);
    }
  }, [iconNameSettings]);
  useEffect(() => {
    if (iconNameStartup) {
      AsyncStorage.setItem(ICON_NAME_START_ASYNC_STORAGE_KEY, iconNameStartup);
    } else {
      AsyncStorage.removeItem(ICON_NAME_START_ASYNC_STORAGE_KEY);
    }
  }, [iconNameStartup]);
  useEffect(() => {
    if (iconColor) {
      AsyncStorage.setItem(ICON_ASYNC_STORAGE_KEY, iconColor);
    } else {
      AsyncStorage.removeItem(ICON_ASYNC_STORAGE_KEY);
    }
  }, [iconColor]);
  useEffect(() => {
    if (iconHeight) {
      AsyncStorage.setItem(ICON_HEIGHT_ASYNC_STORAGE_KEY, iconHeight);
    } else {
      AsyncStorage.removeItem(ICON_HEIGHT_ASYNC_STORAGE_KEY);
    }
  }, [iconHeight]);

  useEffect(() => {
    if (iconWidth) {
      AsyncStorage.setItem(ICON_WIDTH_ASYNC_STORAGE_KEY, iconWidth);
    } else {
      AsyncStorage.removeItem(ICON_WIDTH_ASYNC_STORAGE_KEY);
    }
  }, [iconWidth]);

  useEffect(() => {
    if (theme) {
      AsyncStorage.setItem(THEME_ASYNC_STORAGE_KEY, theme);
    } else {
      AsyncStorage.removeItem(THEME_ASYNC_STORAGE_KEY);
    }
  }, [theme]);

  const contextState = useMemo(
    () => ({ loading, setTheme, backgroundImagePath, setBackgroundImagePath, theme, iconColor, setIconColor, iconHeight, setIconNameStartup, setIconNameSettings, iconWidth, setIconWidth, setIconHeight, iconNameStartup, iconNameSettings }),
    [theme, loading, iconColor, iconHeight, iconWidth, iconNameStartup, iconNameSettings, backgroundImagePath],
  );

  if (loading) {
    return null;
  }
  return (
    <ThemeContext.Provider value={contextState}>
      {children}
    </ThemeContext.Provider>
  );
}