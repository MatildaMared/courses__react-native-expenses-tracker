import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { ExpenseToBeAdded } from "../../types/ExpenseToBeAdded";
import { ExpenseToBeUpdated } from "../../types/ExpenseToBeUpdated";
import Button from "../UI/Button";
import Input from "./Input";

interface Props {
	defaultValues?: {
		amount: string;
		date: string;
		description: string;
	};
	onSubmit: (expenseData: ExpenseToBeAdded | ExpenseToBeUpdated) => void;
	onCancel: () => void;
	submitButtonLabel: string;
}

export default function ExpenseForm(props: Props) {
	const { onSubmit, onCancel, submitButtonLabel, defaultValues } = props;

	const [inputValues, setInputValues] = useState(
		defaultValues
			? defaultValues
			: {
					amount: "",
					date: "",
					description: "",
			  }
	);

	function inputChangeHandler(inputKey: string, input: string) {
		setInputValues((inputValues) => ({
			...inputValues,
			[inputKey]: input,
		}));
	}

	function submitHandler() {
		const expenseData = {
			amount: parseFloat(inputValues.amount),
			date: new Date(inputValues.date),
			description: inputValues.description,
		};

		onSubmit(expenseData);
	}

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Expense</Text>
			<View style={styles.inputs}>
				<Input
					label="Amount"
					type="decimal-pad"
					onChangeText={(amount) => inputChangeHandler("amount", amount)}
					value={inputValues.amount}
					style={{
						marginRight: 16,
						flex: 1,
					}}
				/>
				<Input
					label="Date"
					value={inputValues.date}
					placeholder="YYYY-MM-DD"
					maxLength={10}
					onChangeText={(date) => inputChangeHandler("date", date)}
					style={{ flex: 1 }}
				/>
			</View>
			<Input
				value={inputValues.description}
				label="Description"
				onChangeText={(description) =>
					inputChangeHandler("description", description)
				}
				multiline={true}
			/>
			<View style={styles.buttonsContainer}>
				<Button style={styles.button} onPress={onCancel} mode="flat">
					Cancel
				</Button>
				<Button style={styles.button} onPress={submitHandler}>
					{submitButtonLabel}
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
		marginBottom: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 16,
		textAlign: "center",
		color: "#fff",
	},
	inputs: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonsContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		minWidth: 90,
		marginHorizontal: 8,
	},
});
