import { FlatList, Text, View } from "react-native";
import { Expense } from "../../types/Expense";

interface Props {
	expenses: Expense[];
}

function renderExpenseItem(expense: Expense) {
	return (
		<View>
			<Text>{expense.date.toLocaleDateString()}</Text>
			<Text>{expense.description}</Text>
			<Text>${expense.amount}</Text>
		</View>
	);
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
