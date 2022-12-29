import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { expenses } from "../dummyData";

export default function RecentExpenses() {
	return <ExpensesOutput expenses={expenses} expensePeriod="Last 7 days" />;
}
