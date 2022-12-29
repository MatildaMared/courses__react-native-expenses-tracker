import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../types/Expense";

interface Props {
	periodName: string;
	expenses: Expense[];
}

export default function ExpensesSummary(props: Props) {
	const { periodName, expenses } = props;

	const totalExpenseAmount = expenses.reduce((total, expense) => {
		return total + expense.amount;
	}, 0);

	return (
		<View style={styles.container}>
			<Text style={styles.period}>{periodName}</Text>
			<View style={styles.amountContainer}>
				<Text style={styles.amount}>${totalExpenseAmount.toFixed(2)}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary100,
		borderRadius: 8,
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 16,
		alignItems: "center",
	},
	period: {
		color: GlobalStyles.colors.primary500,
	},
	amount: {
		fontWeight: "bold",
		color: GlobalStyles.colors.primary100,
		textAlign: "center",
	},
	amountContainer: {
		padding: 8,
		backgroundColor: GlobalStyles.colors.primary500,
		borderRadius: 6,
		alignContent: "center",
		justifyContent: "center",
		minWidth: 90,
	},
});
