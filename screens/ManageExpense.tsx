import { View, Text, StyleSheet, TextInput } from "react-native";
import { StackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpenseToBeAdded } from "../types/ExpenseToBeAdded";
import { ExpenseToBeUpdated } from "../types/ExpenseToBeUpdated";

type Props = NativeStackScreenProps<StackParamList, "ManageExpense">;

export default function ManageExpense(props: Props) {
	const { expenses, addExpense, updateExpense, deleteExpense } =
		useContext(ExpensesContext);
	const { route, navigation } = props;
	const expenseId = route.params?.expenseId;
	const isEditing = expenseId !== undefined;
	const expenseToEdit = expenses.find((expense) => expense.id === expenseId);

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [isEditing, navigation]);

	function deleteExpenseHandler() {
		deleteExpense(expenseId!);
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function submitHandler(expenseData: ExpenseToBeAdded | ExpenseToBeUpdated) {
		if (isEditing) {
			updateExpense(expenseId!, expenseData);
		} else {
			addExpense(expenseData as ExpenseToBeAdded);
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<ExpenseForm
				expenseToEdit={expenseToEdit && expenseToEdit}
				onCancel={cancelHandler}
				onSubmit={submitHandler}
				submitButtonLabel={isEditing ? "Update" : "Add"}
			/>
			{isEditing && (
				<View style={styles.deleteContainer}>
					<IconButton
						iconName="trash"
						color={GlobalStyles.colors.error500}
						onPress={deleteExpenseHandler}
					/>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: GlobalStyles.colors.primary700,
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: GlobalStyles.colors.primary400,
		alignItems: "center",
	},
});
