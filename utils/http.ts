import axios from "axios";
import { Expense } from "../types/Expense";
import { ExpenseToBeAdded } from "../types/ExpenseToBeAdded";

const ROOT_URL =
	"https://react-native-course-dc5ca-default-rtdb.europe-west1.firebasedatabase.app";

export async function storeExpense(
	expenseData: ExpenseToBeAdded
): Promise<string> {
	const result = await axios.post(`${ROOT_URL}/expenses.json`, expenseData);
	return result.data.name;
}

export async function getExpenses(): Promise<Expense[]> {
	const result = await axios.get(`${ROOT_URL}/expenses.json`);
	const expenses = [];

	for (const key in result.data) {
		expenses.push({
			id: key,
			description: result.data[key].description as string,
			amount: +result.data[key].amount,
			date: new Date(result.data[key].date),
		});
	}

	return expenses;
}
