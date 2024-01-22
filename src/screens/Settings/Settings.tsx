
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Button, Modal,
    FlatList,
    ScrollView,
    StyleSheet
} from 'react-native';
import BodyText from "../../components/ThemedText"
import type { ApplicationScreenProps } from '../../types/navigations';
import useThemeContext from '../../util/useThemeContext';
import useFontContext from '../../util/useFontContext';
import ColorPicker, { Panel1, Swatches, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';
import Icon from 'react-native-vector-icons/AntDesign';
import DropdownComponent from "../../components/DropDown"
import * as ImagePicker from 'react-native-image-picker';
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'notification',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'menuunfold',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'cloud',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d12',
        title: 'windowso',
    },
    {
        id: '58694a0f-3da1-471f-bd96-1455776e29d12',
        title: 'smileo',
    },
    {
        id: '58694a0f-3da21-471f-bd96-1455776e29d12',
        title: 'frowno',
    },
    {
        id: '58694a0f-3da21-471f-bd96-1455776e129d12',
        title: 'frowno',
    },
];

function Icons({ navigation }: ApplicationScreenProps) {
    const [showModal, setShowModal] = useState(false);
    const { colors, setBackgroundImagePath, setIconColor, iconHeight, iconWidth, setIconHeight, setIconWidth, setIconNameStartup, setIconNameSettings, setColorTheme } =
        useThemeContext();
    const { size, setFontSize } =
        useFontContext();
    const onSelectIconColor = ({ hex }) => {
        // do something with the selected color.
        console.log(hex);
        setIconColor(hex)
    };
    const increaseIcon = () => {
        let curentHeight = Number(iconHeight)
        let increaseHeight = (curentHeight + 5).toString()
        let curentWigth = Number(iconWidth)
        let increaseWidth = (curentWigth + 5).toString()
        setIconHeight(increaseHeight)
        setIconWidth(increaseWidth)
    }
    const deacreseIcon = () => {
        let curentHeight = Number(iconHeight)
        let increaseHeight = (curentHeight - 5).toString()
        let curentWigth = Number(iconWidth)
        let increaseWidth = (curentWigth - 5).toString()
        setIconHeight(increaseHeight)
        setIconWidth(increaseWidth)
    }
    type ItemProps = { title: string };
    const ItemStartup = ({ title }: ItemProps) => (
        <View>
            <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={() => setIconNameStartup(title)}>
                <Icon name={title} size={32} color={colors.text} />
            </TouchableOpacity>
        </View>
    );
    const ItemSettings = ({ title }: ItemProps) => (
        <View>
            <TouchableOpacity style={{ marginHorizontal: 16 }} onPress={() => setIconNameSettings(title)}>
                <Icon name={title} size={32} color={colors.text} />
            </TouchableOpacity>
        </View>
    );

    const onButtonPress = async () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response) => {
                setBackgroundImagePath(response.assets[0].uri)
            }
        )

    }
    return (
        <SafeAreaView>
            <ScrollView>
            <View style={{ marginVertical: 32 }}>
                <View style={styles.textPosition}>
                    <BodyText >
                        Change icon for Startup tab
                    </BodyText>
                </View>
                <View style={styles.listView} >
                    <ScrollView>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => <ItemStartup title={item.title} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                    </ScrollView>

                </View>
                <View style={styles.textPosition}>
                    <BodyText>
                        Change icon for Settings tab
                    </BodyText>
                </View>
                <View style={styles.listView} >
                    <ScrollView>
                        <FlatList
                            data={DATA}
                            inverted={true}
                            renderItem={({ item }) => <ItemSettings title={item.title} />}
                            keyExtractor={item => item.id}
                            horizontal={true}
                        />
                    </ScrollView>

                </View>
                <View>
                    <View style={styles.textPosition}>
                        <BodyText>
                            Change theme
                        </BodyText>
                        <View style={styles.buttonHover}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setColorTheme('dark')}>
                                <BodyText>Dark theme</BodyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setColorTheme('light')}>
                                <BodyText>Light theme</BodyText>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.textPosition}>
                        <BodyText>
                            Change icon color
                        </BodyText>
                        <View style={styles.buttonHover}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setShowModal(true)}>
                                <BodyText>Custom color</BodyText>
                            </TouchableOpacity>
                            <Modal visible={showModal} animationType='slide'>
                                <ColorPicker style={{ marginHorizontal: 16 }} value='red' onComplete={onSelectIconColor}>
                                    <Preview />
                                    <Panel1 />
                                    <HueSlider />
                                    <OpacitySlider />
                                    <Swatches />
                                </ColorPicker>
                                <View style={styles.buttonPicker}>
                                    <Button title='Ok' onPress={() => setShowModal(false)} />
                                </View>
                            </Modal>
                        </View>
                    </View>
                    <View style={styles.textPosition}>
                        <BodyText>
                            Change tab icon size
                        </BodyText>
                        <View style={styles.buttonHover}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => increaseIcon()}>
                                <BodyText>Increase</BodyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => deacreseIcon()}>
                                <BodyText>Decrease</BodyText>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.textPosition}>
                        <BodyText>
                            Font
                        </BodyText>
                        <View style={styles.buttonHover}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setFontSize(size + 1)}>
                                <BodyText>Increase</BodyText>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonStyle} onPress={() => setFontSize(size - 1)}>
                                <BodyText>Decrease</BodyText>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dropDownStyle}>
                            <BodyText>
                                Change font family
                            </BodyText>
                            <DropdownComponent />
                        </View>
                    </View>
                    <View style={styles.textPosition}>
                        <TouchableOpacity style={styles.buttonStyle} onPress={() => onButtonPress()}>
                            <BodyText>
                                Change background for image
                            </BodyText>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Icons;


const styles = StyleSheet.create({
    buttonHover: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginTop: 16
    },
    listView: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    textPosition: {
        marginVertical: 12,
        alignItems: "center"
    },
    dropDownStyle: {
        width: "90%", 
        alignItems: "center", 
        marginTop: 16,
         marginHorizontal: 32
    },
    buttonStyle: {
        borderWidth: 1,
        padding: 8
    },
    buttonPicker: {
        width: "100%", 
        alignItems: "center"
    },
});