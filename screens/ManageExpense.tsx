import { View, Text, StyleSheet } from "react-native";
import { StackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";

type Props = NativeStackScreenProps<StackParamList, "ManageExpense">;

export default function ManageExpense(props: Props) {
	const { route, navigation } = props;
	const expenseId = route.params?.expenseId;
	const isEditing = expenseId !== undefined;

	useLayoutEffect(() => {
		navigation.setOptions({
			title: isEditing ? "Edit Expense" : "Add Expense",
		});
	}, [isEditing, navigation]);

	function deleteExpenseHandler() {
		navigation.goBack();
	}

	function cancelHandler() {
		navigation.goBack();
	}

	function confirmHandler() {
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
