import { View } from "react-native";
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
		<View>
			<ExpensesSummary expenses={expenses} periodName={expensePeriod} />
			<ExpensesList expenses={expenses} />
		</View>
	);
}
