import { useColorScheme } from 'react-native';
import { useCallback, useContext, useMemo } from 'react';
import { FontContext } from '../components/FontProvider';
import colors from './theme/colors';
export default function useFontContext() {
    const context = useContext(FontContext);
    const defaultFontSize = 16
    const defaultFontName = "Roboto"
    const systemColorScheme = useColorScheme();
    const FontColorTheme = systemColorScheme === 'dark' ? colors.dark.text : colors.light.text;
    if (context === undefined) {
        throw new Error('useThemeContext must be within ThemeProvider');
    }

    const { fontSize, loading, setFontSize, fontColor, setFontColor, myFontFamily, setMyFontFamily } = context;

    if (loading) {
        throw new Error('Tried to use ThemeContext before initialized');
    }

    return {
        myFontFamily: useMemo(() => {
            return myFontFamily ? myFontFamily : defaultFontName;
        }, [myFontFamily]),
        size: useMemo(() => {
            return fontSize ? fontSize : defaultFontSize;
        }, [fontSize]),
        fontColor: useMemo(() => {
            return fontColor ? fontColor : FontColorTheme;
        }, [fontColor]),
        FontColorTheme,
        setMyFontFamily: useCallback(
            (fontName: string) => setMyFontFamily(fontName),
            [setMyFontFamily],
        ),
        setFontSize: useCallback(
            (fontSize: number) => setFontSize(fontSize),
            [setFontSize],
        ),
        setFontColor: useCallback(
            (color: string) => setFontColor(color),
            [setFontColor],
        ),
    };
}
