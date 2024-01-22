import type { StackScreenProps } from '@react-navigation/stack';

export type ApplicationStackParamList = {
	Startup: undefined;
	SettingsScreen: undefined;
};

export type ApplicationScreenProps =
	StackScreenProps<ApplicationStackParamList>;