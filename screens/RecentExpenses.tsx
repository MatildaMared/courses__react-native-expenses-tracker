import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";

export default function RecentExpenses() {
	const { expenses } = useContext(ExpensesContext);

	return <ExpensesOutput expenses={expenses} expensePeriod="Last 7 days" />;
}
