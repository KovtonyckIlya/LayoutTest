import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/AntDesign';
import useFontContext from '../util/useFontContext';
import useThemeContext from '../util/useThemeContext';
const data = [
    { label: 'monospace', value: 'monospace' },
    { label: 'serif', value: 'serif' },
    { label: 'notoserif', value: 'notoserif' },
    { label: 'sans-serif', value: 'sans-serif' },
    { label: 'sans-serif-light', value: 'sans-serif-light' },
    { label: 'sans-serif-thin', value: 'sans-serif-thin' },
    { label: 'sans-serif-condensed', value: 'sans-serif-condensed' },
    { label: 'sans-serif-medium', value: 'sans-serif-medium' },
];

const DropdownComponent = () => {
    const { size, fontColor, myFontFamily, setMyFontFamily } = useFontContext()
    const [value, setValue] = useState(myFontFamily);
	const { colors, iconColor, iconWidth, iconNameSettings, iconNameStartup } = useThemeContext();
    return (
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={{fontSize:size,fontFamily:myFontFamily,color:colors.text}}
            selectedTextStyle={{fontSize:size,fontFamily:myFontFamily,color:colors.text}}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={600}
            labelField="label"
            valueField="value"
            placeholder="Select font family"
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
                setValue(item.value);
                setMyFontFamily(item.value)
            }}
            renderLeftIcon={() => (
                <Icon style={styles.icon} color={iconColor} name="Safety" size={20} />
            )}
        />
    );
};

export default DropdownComponent;

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        width:"100%",
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});