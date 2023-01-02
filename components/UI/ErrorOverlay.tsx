import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

interface Props {
	message: string;
	onConfirm: () => void;
}

export default function ErrorOverlay(props: Props) {
	const { message, onConfirm } = props;

	return (
		<View style={styles.container}>
			<Text style={[styles.text, styles.title]}>An error occured.</Text>
			<Text style={styles.text}>{message}</Text>
			<Button onPress={onConfirm}>Ok</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	text: {
		textAlign: "center",
		marginBottom: 16,
		color: "white",
	},
	title: {
		fontWeight: "bold",
	},
});
