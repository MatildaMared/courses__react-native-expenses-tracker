import { FlatList, Text, View } from "react-native";
import { Expense } from "../../types/Expense";
import ExpenseItem from "./ExpenseItem";

interface Props {
	expenses: Expense[];
}

function renderExpenseItem(expense: Expense) {
	return <ExpenseItem expense={expense} />;
}

export default function ExpensesList(props: Props) {
	const { expenses } = props;

	return (
		<FlatList
			data={expenses}
			renderItem={(expense) => renderExpenseItem(expense.item)}
			keyExtractor={(expense) => expense.id}
		/>
	);
}
