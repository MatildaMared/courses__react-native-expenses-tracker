import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpensesContext } from "../store/expenses-context";
import { getExpenses } from "../utils/http";

export default function RecentExpenses() {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const { setExpenses, expenses } = useContext(ExpensesContext);

	useEffect(() => {
		async function getData() {
			setIsLoading(true);
			try {
				const expenses = await getExpenses();
				setExpenses(expenses);
			} catch (error) {
				setError("Could not fetch expenses data.");
			}
			setIsLoading(false);
		}

		getData();
	}, []);

	const recentExpenses = expenses.filter((expense) => {
		const expenseDate = new Date(expense.date);
		const today = new Date();
		const difference = today.getTime() - expenseDate.getTime();
		const days = difference / (1000 * 3600 * 24);
		return days <= 7;
	});

	function errorHandler() {
		setError(null);
	}

	if (isLoading) return <LoadingOverlay />;
	if (error) return <ErrorOverlay message={error} onConfirm={errorHandler} />;

	return (
		<ExpensesOutput
			fallbackText={"You don't have any recent expenses."}
			expenses={recentExpenses}
			expensePeriod="Last 7 days"
		/>
	);
}
