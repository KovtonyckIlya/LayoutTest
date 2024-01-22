import { createStackNavigator } from '@react-navigation/stack';
import {
	NavigationContainer,
	DarkTheme,
	DefaultTheme,
} from '@react-navigation/native';
import { Startup,Settings } from '../screens';
import { useColorScheme, View, ImageBackground } from 'react-native';
import type { ApplicationStackParamList } from '../types/navigations';
import React, { useEffect, useState } from 'react';
import useThemeContext from '../util/useThemeContext';
import Icon from 'react-native-vector-icons/AntDesign';
import BodyText from "../components/ThemedText"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Stack = createStackNavigator<ApplicationStackParamList>();


const Tab = createBottomTabNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {

	const { colors, iconColor, iconWidth, iconNameSettings, iconNameStartup,backgroundImagePath } = useThemeContext();
	const [customIconColor, setCustomIconColor] = useState<string>(iconColor)
	useEffect(() => {
		setCustomIconColor(iconColor)
	}, [iconColor])
	const image = { uri: backgroundImagePath };
	const navigationTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			text: colors.text,
			background: colors.backgrounds.default,
			primary: colors.text,
		},

	};
	const navTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: 'transparent',
			backgroundColor: 'transparent',
		},
	};
	return backgroundImagePath ? (
		<ImageBackground source={image} resizeMode="cover" style={{
			flex: 1,
		}}>
			<NavigationContainer theme={navTheme}>
				<Tab.Navigator screenOptions={{
					headerTransparent: true,
					headerShown: false,
					tabBarStyle: {
						backgroundColor: 'transparent',
						height: 60

					},
				}} >

					<Tab.Screen name="Startup" component={Startup} options={{
						tabBarLabel: ({ }) => {
							return (
								<BodyText>
									Main
								</BodyText>
							)
						},
						tabBarIcon: ({ focused }) => {
							return (
								<Icon name={iconNameStartup} size={Number(iconWidth)} color={focused ? customIconColor : colors.backgrounds.soft} />
							);
						},
					}} />
					<Tab.Screen name="SettingsScreen" component={Settings} options={{
						tabBarLabel: ({ }) => {
							return (

								<BodyText>
									Settings
								</BodyText>

							)
						},
						tabBarIcon: ({ focused }) => {
							return (
								<Icon name={iconNameSettings} size={Number(iconWidth)} color={focused ? customIconColor : colors.backgrounds.soft} />
							);
						},
					}} />
				</Tab.Navigator>
			</NavigationContainer>
		</ImageBackground>

	) : (
		<NavigationContainer theme={navigationTheme}>
			<Tab.Navigator screenOptions={{
				headerTransparent: true,
				headerShown: false,
				tabBarStyle: {
					backgroundColor:colors.backgrounds.default,
					height: 60

				},
			}} >

				<Tab.Screen name="Startup" component={Startup} options={{
					tabBarLabel: ({ }) => {
						return (
							<BodyText>
								Main
							</BodyText>
						)
					},
					tabBarIcon: ({ focused }) => {
						return (
							<Icon name={iconNameStartup} size={Number(iconWidth)} color={focused ? customIconColor : colors.backgrounds.soft} />
						);
					},
				}} />
				<Tab.Screen name="SettingsScreen" component={Settings} options={{
					tabBarLabel: ({ }) => {
						return (

							<BodyText>
								Settings
							</BodyText>

						)
					},
					tabBarIcon: ({ focused }) => {
						return (
							<Icon name={iconNameSettings} size={Number(iconWidth)} color={focused ? customIconColor : colors.backgrounds.soft} />
						);
					},
				}} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;