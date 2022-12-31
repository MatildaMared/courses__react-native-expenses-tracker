import {
	Text,
	TextInput,
	View,
	StyleSheet,
	KeyboardTypeOptions,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Props {
	label: string;
	type?: KeyboardTypeOptions;
	onChangeText: (text: string) => void;
	placeholder?: string;
	maxLength?: number;
	multiline?: boolean;
	autoCorrect?: boolean;
	autoCapitalize?: "none" | "sentences" | "words" | "characters";
	style?: any;
	value?: string;
	errorMessage?: string;
}

export default function Input(props: Props) {
	const {
		label,
		type,
		onChangeText,
		placeholder,
		maxLength,
		multiline,
		autoCorrect,
		autoCapitalize,
		style,
		value,
		errorMessage,
	} = props;

	const hasError = !!errorMessage;

	return (
		<View style={[styles.container, style && style]}>
			<Text style={styles.label}>{label}</Text>
			<TextInput
				onChangeText={onChangeText}
				style={[
					styles.input,
					multiline && styles.inputMultiline,
					hasError && styles.error,
				]}
				keyboardType={type}
				placeholder={placeholder}
				maxLength={maxLength}
				multiline={multiline}
				autoCorrect={autoCorrect}
				autoCapitalize={autoCapitalize}
				value={value}
			/>
			<Text style={styles.errorText}>{hasError && errorMessage}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: 8,
	},
	label: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
		marginBottom: 4,
	},
	input: {
		backgroundColor: GlobalStyles.colors.primary100,
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 6,
		color: GlobalStyles.colors.primary700,
	},
	inputMultiline: {
		minHeight: 100,
		textAlignVertical: "top",
		paddingTop: 12,
	},
	error: {
        backgroundColor: GlobalStyles.colors.error50,
	},
	errorText: {
		marginTop: 4,
		color: GlobalStyles.colors.error50,
		fontSize: 12,
	},
});
