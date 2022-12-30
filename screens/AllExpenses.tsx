import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function AllExpenses() {
	const { expenses } = useContext(ExpensesContext);

	return (
		<ExpensesOutput
			fallbackText="You haven't registered any expenses yet."
			expenses={expenses}
			expensePeriod="All Expenses"
		/>
	);
}
