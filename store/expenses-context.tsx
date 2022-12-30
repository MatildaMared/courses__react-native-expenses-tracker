import React, { useReducer, useState } from "react";
import { createContext } from "react";
import { Expense } from "../types/Expense";
import { ExpenseToBeAdded } from "../types/ExpenseToBeAdded";
import { expenses as dummyData } from "../dummyData";
import { ExpenseToBeUpdated } from "../types/ExpenseToBeUpdated";

export const ExpensesContext = createContext({
	expenses: [] as Expense[],
	addExpense: (expense: ExpenseToBeAdded) => {},
	deleteExpense: (id: string) => {},
	updateExpense: (id: string, expense: ExpenseToBeUpdated) => {},
});

type Add = { type: "ADD"; payload: { expense: ExpenseToBeAdded } };
type Delete = { type: "DELETE"; payload: { id: string } };
type Update = {
	type: "UPDATE";
	payload: { id: string; expense: ExpenseToBeUpdated };
};

function expensesReducer(state: Expense[], action: Add | Delete | Update) {
	switch (action.type) {
		case "ADD":
			return [
				...state,
				{ id: Math.random().toString(), ...action.payload.expense },
			];
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload.id);
		case "UPDATE":
			const { id, expense } = action.payload;
			const expenseToBeUpdated = state.find((expense) => expense.id === id);
			const updatedExpense = { ...expenseToBeUpdated, ...expense } as Expense;
			const updatedExpenses = state.filter((expense) => expense.id !== id);
			return [...updatedExpenses, updatedExpense];
		default:
			return state;
	}
}

function ExpensesContextProvider(props: { children: React.ReactNode }) {
	const { children } = props;
	const [expenses, dispatch] = useReducer(expensesReducer, dummyData);

	function addExpense(expense: ExpenseToBeAdded) {
		dispatch({ type: "ADD", payload: { expense } });
	}

	function deleteExpense(id: string) {
		dispatch({ type: "DELETE", payload: { id } });
	}

	function updateExpense(id: string, expense: ExpenseToBeUpdated) {
		dispatch({ type: "UPDATE", payload: { id, expense } });
	}

	const value = {
		expenses,
		addExpense,
		deleteExpense,
		updateExpense,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
