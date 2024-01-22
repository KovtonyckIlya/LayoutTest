import { StyleSheet, Text, TextProps } from 'react-native';
import useThemeContext from '../util/useThemeContext';
import useFontContext from '../util/useFontContext';
type Props = TextProps;

export default function BodyText({ style, ...props }: Props) {
    const { colors } = useThemeContext();
    const { size, fontColor,myFontFamily } = useFontContext()
    const fontHeight = size + 2
    return (
        <Text style={{ color: colors.text,fontFamily:myFontFamily, fontSize: size, lineHeight: fontHeight, }} {...props} />
    );
}
