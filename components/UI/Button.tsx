import { Pressable, Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

interface Props {
	children: React.ReactNode;
	onPress: () => void;
	mode?: "flat";
	style?: any;
}

export default function Button(props: Props) {
	const { children, onPress, mode, style } = props;

	return (
		<View style={style}>
			<Pressable
				onPress={onPress}
				style={({ pressed }) => (pressed ? styles.pressed : null)}
			>
				<View style={[styles.button, mode === "flat" && styles.flat]}>
					<Text style={[styles.text, mode === "flat" && styles.flatText]}>
						{children}
					</Text>
				</View>
			</Pressable>
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		borderRadius: 8,
		paddingHorizontal: 16,
		paddingVertical: 8,
		backgroundColor: GlobalStyles.colors.primary500,
	},
	flat: {
		backgroundColor: "transparent",
	},
	text: {
		color: "white",
		textAlign: "center",
	},
	flatText: {
		color: GlobalStyles.colors.primary200,
	},
	pressed: {
		opacity: 0.6,
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 8,
	},
});
