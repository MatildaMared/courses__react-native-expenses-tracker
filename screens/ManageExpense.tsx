import { View, Text, StyleSheet } from "react-native";
import { StackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useContext, useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";

type Props = NativeStackScreenProps<StackParamList, "ManageExpense">;

export default function ManageExpense(props: Props) {
	const { expenses, addExpense, updateExpense, deleteExpense } =
		useContext(ExpensesContext);
	const { route, navigation } = props;
	const expenseId = route.params?.expenseId;
	const isEditing = expenseId !== undefined;

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

	function confirmHandler() {
		if (isEditing) {
			// Update existing expense
			updateExpense(expenseId!, {
				description: "Updated title",
			});
		} else {
			// Add new expense
			addExpense({
				description: "New expense",
				amount: 99.99,
				date: new Date(),
			});
		}
		navigation.goBack();
	}

	return (
		<View style={styles.container}>
			<View style={styles.buttonsContainer}>
				<Button style={styles.button} onPress={cancelHandler} mode="flat">
					Cancel
				</Button>
				<Button style={styles.button} onPress={confirmHandler}>
					{isEditing ? "Update" : "Add"}
				</Button>
			</View>
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
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	deleteContainer: {
		marginTop: 16,
		paddingTop: 8,
		borderTopWidth: 1,
		borderTopColor: GlobalStyles.colors.primary400,
		alignItems: "center",
	},
	button: {
		minWidth: 90,
		marginHorizontal: 8,
	},
});
