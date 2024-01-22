
import React, { useEffect, useState } from 'react';
import {
	SafeAreaView,
	Text,
	Switch, View, TouchableOpacity,
	Button, Modal,
	StatusBar
} from 'react-native';
import BodyText from "../../components/ThemedText"
import type { ApplicationScreenProps } from '../../types/navigations';
import useThemeContext from '../../util/useThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
function Startup({ navigation }: ApplicationScreenProps) {
	const { colors, isSystemTheme, systemTheme, colorTheme, setColorTheme } =
		useThemeContext();

	return (

		<SafeAreaView style={{ flex: 1, flexDirection: "column", justifyContent: "center" }}>
			<View style={{ alignItems: "center" }}>
				<BodyText>
					All features you may find on Settings tab
				</BodyText>
				<View style={{marginTop:32}}>
					<Icon name="smileo" size={64} color={colors.text} />
				</View>
			</View>
		</SafeAreaView>
	);
}

export default Startup;