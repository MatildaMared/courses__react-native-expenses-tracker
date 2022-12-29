import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { expenses } from "../dummyData";

export default function AllExpenses() {
	return <ExpensesOutput expenses={expenses} expensePeriod="All Expenses" />;
}
