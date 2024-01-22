import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { ReactNode, useEffect, useMemo, useState } from 'react';

const FONT_ASYNC_STORAGE_KEY = 'FONT_SIZE_STATE';
const FONT_COLOR_ASYNC_STORAGE_KEY = 'FONT_COLOR_STATE';
const FONT_FAMILY_ASYNC_STORAGE_KEY = 'FONT_FAMILY_STATE';
type Props = {
  children: ReactNode;
};

export type ThemeContextState = {
  fontSize: number;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  fontColor: string;
  setFontColor: React.Dispatch<React.SetStateAction<string>>;
  myFontFamily: string;
  setMyFontFamily: React.Dispatch<React.SetStateAction<string>>;
};

export const FontContext = React.createContext<ThemeContextState | undefined>(
  undefined,
);
export default function FontProvider({ children }: Props) {
  const [fontSize, setFontSize] = useState<number>();
  const [loading, setLoading] = useState(true);
  const [fontColor, setFontColor] = useState<string>()
  const [myFontFamily, setMyFontFamily] = useState<string>()
  AsyncStorage.removeItem(FONT_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(FONT_COLOR_ASYNC_STORAGE_KEY);
  AsyncStorage.removeItem(FONT_FAMILY_ASYNC_STORAGE_KEY);
  useEffect(() => {
    const load = async () => {
      const storedFontSize = (await AsyncStorage.getItem(
        FONT_ASYNC_STORAGE_KEY,
      ));
      const storedFontColor = (await AsyncStorage.getItem(
        FONT_COLOR_ASYNC_STORAGE_KEY,
      )) as string;
      const storedFontFamily = (await AsyncStorage.getItem(
        FONT_FAMILY_ASYNC_STORAGE_KEY,
      )) as string;
      setFontSize(Number(storedFontSize));
      setFontColor(storedFontColor)
      setMyFontFamily(storedFontFamily)
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    if (myFontFamily) {
      AsyncStorage.setItem(FONT_FAMILY_ASYNC_STORAGE_KEY, String(myFontFamily));
    } else {
      AsyncStorage.removeItem(FONT_FAMILY_ASYNC_STORAGE_KEY);
    }
  }, [myFontFamily]);

  useEffect(() => {
    if (fontColor) {
      AsyncStorage.setItem(FONT_COLOR_ASYNC_STORAGE_KEY, String(fontColor));
    } else {
      AsyncStorage.removeItem(FONT_COLOR_ASYNC_STORAGE_KEY);
    }
  }, [fontColor]);

  useEffect(() => {
    if (fontSize) {
      AsyncStorage.setItem(FONT_ASYNC_STORAGE_KEY, String(fontSize));
    } else {
      AsyncStorage.removeItem(FONT_ASYNC_STORAGE_KEY);
    }
  }, [fontSize]);

  const contextState = useMemo(
    () => ({ loading, setFontSize, fontSize, fontColor, setFontColor,myFontFamily,setMyFontFamily }),
    [fontSize, loading, fontColor,myFontFamily],
  );

  if (loading) {
    return null;
  }

  return (
    <FontContext.Provider value={contextState}>
      {children}
    </FontContext.Provider>
  );
}