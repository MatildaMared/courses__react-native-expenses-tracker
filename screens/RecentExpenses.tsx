import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function RecentExpenses() {
	const { expenses } = useContext(ExpensesContext);

	const recentExpenses = expenses.filter((expense) => {
		const expenseDate = new Date(expense.date);
		const today = new Date();
		const difference = today.getTime() - expenseDate.getTime();
		const days = difference / (1000 * 3600 * 24);
		return days <= 7;
	});

	return (
		<ExpensesOutput
			fallbackText={"You don't have any recent expenses."}
			expenses={recentExpenses}
			expensePeriod="Last 7 days"
		/>
	);
}
