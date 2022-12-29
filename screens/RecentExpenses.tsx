import { View, StyleSheet } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { expenses } from "../dummyData";

export default function RecentExpenses() {
	return (
		<View>
			<ExpensesOutput expenses={expenses} expensePeriod="Last 7 days" />
		</View>
	);
}
