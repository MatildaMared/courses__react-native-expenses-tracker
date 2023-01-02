import { View, Text, StyleSheet, TextInput } from "react-native";
import { StackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { ExpenseToBeAdded } from "../types/ExpenseToBeAdded";
import { ExpenseToBeUpdated } from "../types/ExpenseToBeUpdated";
import {
	storeExpense as storeExpenseInDB,
	updateExpense as updateExpenseInDB,
	deleteExpense as deleteExpenseFromDB,
} from "../utils/http";
import { Expense } from "../types/Expense";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

type Props = NativeStackScreenProps<StackParamList, "ManageExpense">;

export default function ManageExpense(props: Props) {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
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

	async function deleteExpenseHandler() {
		deleteExpense(expenseId!);
		setIsLoading(true);
		try {
			await deleteExpenseFromDB(expenseId!);
			setIsLoading(false);
		} catch (error) {
			setIsLoading(false);
			setError(
				"Something went wrong while trying to deleting the expense. Try again."
			);
		}
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function resetErrorHandler() {
		setError(null);
	}

	async function submitHandler(
		expenseData: ExpenseToBeAdded | ExpenseToBeUpdated
	) {
		setIsLoading(true);
		if (isEditing) {
			updateExpense(expenseId!, expenseData);
			const oldExpense = expenses.find((expense) => expense.id === expenseId);
			await updateExpenseInDB(expenseId, {
				...{
					amount: oldExpense?.amount,
					description: oldExpense?.description,
					date: oldExpense?.date,
				},
				...expenseData,
			});
			setIsLoading(false);
		} else {
			const id = await storeExpenseInDB(expenseData as ExpenseToBeAdded);
			addExpense({ id, ...expenseData } as Expense);
			setIsLoading(false);
		}
		navigation.goBack();
	}

	if (isLoading) return <LoadingOverlay />;
	if (error)
		return <ErrorOverlay message={error} onConfirm={resetErrorHandler} />;

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
