import { View, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../types/Expense";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface Props {
	expenses: Expense[];
	expensePeriod: string;
	fallbackText: string;
}

export default function ExpensesOutput(props: Props) {
	const { expenses, expensePeriod, fallbackText } = props;
	const fallback = <Text style={styles.fallback}>{fallbackText}</Text>;

	return (
		<View style={styles.container}>
			<ExpensesSummary expenses={expenses} periodName={expensePeriod} />
			{expenses.length === 0 && fallback}
			<ExpensesList expenses={expenses} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	fallback: {
		color: GlobalStyles.colors.primary100,
		textAlign: "center",
	},
});
