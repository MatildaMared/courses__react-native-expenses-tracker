import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../../types/Expense";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";

interface Props {
	expenses: Expense[];
	expensePeriod: string;
}

export default function ExpensesOutput(props: Props) {
	const { expenses, expensePeriod } = props;

	return (
		<View style={styles.container}>
			<ExpensesSummary expenses={expenses} periodName={expensePeriod} />
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
});
