import React, { useReducer, useState } from "react";
import { createContext } from "react";
import { Expense } from "../types/Expense";
import { ExpenseToBeUpdated } from "../types/ExpenseToBeUpdated";

export const ExpensesContext = createContext({
	expenses: [] as Expense[],
	addExpense: (expense: Expense) => {},
	deleteExpense: (id: string) => {},
	updateExpense: (id: string, expense: ExpenseToBeUpdated) => {},
	setExpenses: (expenses: Expense[]) => {},
});

type Add = { type: "ADD"; payload: { expense: Expense } };
type Delete = { type: "DELETE"; payload: { id: string } };
type Update = {
	type: "UPDATE";
	payload: { id: string; expense: ExpenseToBeUpdated };
};
type Set = { type: "SET"; payload: { expenses: Expense[] } };

function expensesReducer(
	state: Expense[],
	action: Add | Delete | Update | Set
): Expense[] {
	switch (action.type) {
		case "ADD":
			return [action.payload.expense, ...state];
		case "DELETE":
			return state.filter((expense) => expense.id !== action.payload.id);
		case "UPDATE":
			const { id, expense } = action.payload;
			const expenseToBeUpdated = state.find((expense) => expense.id === id);
			const updatedExpense = { ...expenseToBeUpdated, ...expense } as Expense;
			const updatedExpenses = state.filter((expense) => expense.id !== id);
			return [...updatedExpenses, updatedExpense];
		case "SET":
			const invertedExpenses = action.payload.expenses.reverse();
			return invertedExpenses;
		default:
			return state;
	}
}

function ExpensesContextProvider(props: { children: React.ReactNode }) {
	const { children } = props;
	const initialState: Expense[] = [];
	const [expenses, dispatch] = useReducer(expensesReducer, initialState);

	function setExpenses(expenses: Expense[]) {
		dispatch({ type: "SET", payload: { expenses } });
	}

	function addExpense(expense: Expense) {
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
		setExpenses,
	};

	return (
		<ExpensesContext.Provider value={value}>
			{children}
		</ExpensesContext.Provider>
	);
}

export default ExpensesContextProvider;
