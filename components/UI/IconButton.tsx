import { Ionicons } from "@expo/vector-icons";
import { Pressable, View, StyleSheet } from "react-native";

interface Props {
	iconName: keyof typeof Ionicons.glyphMap;
	onPress: () => void;
	size?: number;
	color?: string;
}

export default function IconButton(props: Props) {
	const { iconName, onPress, size, color } = props;

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => (pressed ? styles.pressed : null)}
		>
			<View style={styles.container}>
				<Ionicons
					name={iconName}
					size={size ? size : 24}
					color={color ? color : "white"}
				/>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 16,
		paddingHorizontal: 16,
		paddingVertical: 8,
	},
	pressed: {
		opacity: 0.6,
	},
});
