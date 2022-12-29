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
			<Text style={styles.sum}>${totalExpenseAmount.toFixed(2)}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary50,
		borderRadius: 8,
		margin: 16,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	period: {
		color: GlobalStyles.colors.primary500,
	},
	sum: {
		fontWeight: "bold",
		color: GlobalStyles.colors.primary500,
	},
});
