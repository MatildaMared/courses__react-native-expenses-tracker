import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { StackParamList } from "../../App";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../types/Expense";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
	expense: Expense;
}

export default function ExpenseItem(props: Props) {
	const { expense } = props;
	const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

	function expensePressHandler() {
		navigation.navigate("ManageExpense", {
			expenseId: expense.id,
		});
	}

	return (
		<Pressable
			onPress={expensePressHandler}
			style={({ pressed }) => pressed && styles.pressed}
		>
			<View style={styles.container}>
				<View>
					<Text style={styles.description}>{expense.description}</Text>
					<Text style={styles.date}>{expense.date.toLocaleDateString()}</Text>
				</View>
				<View style={styles.amountContainer}>
					<Text style={styles.amount}>${expense.amount.toFixed(2)}</Text>
				</View>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary500,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
		elevation: 2,
		shadowColor: GlobalStyles.colors.gray500,
		shadowOffset: {
			width: 1,
			height: 1,
		},
		shadowRadius: 4,
		shadowOpacity: 0.25,
	},
	description: {
		fontWeight: "bold",
		color: GlobalStyles.colors.accent500,
		marginBottom: 4,
	},
	date: {
		fontSize: 12,
		color: GlobalStyles.colors.primary100,
	},
	amountContainer: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.accent500,
		borderRadius: 6,
		alignContent: "center",
		justifyContent: "center",
		minWidth: 90,
	},
	amount: {
		fontWeight: "bold",
		color: GlobalStyles.colors.primary500,
		textAlign: "center",
	},
	pressed: {
		opacity: 0.6,
	},
});
