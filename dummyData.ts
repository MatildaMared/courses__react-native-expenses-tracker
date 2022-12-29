import { Expense } from "./types/Expense";

export const expenses: Expense[] = [
	{
		id: "e1",
		description: "Running Shoes",
		amount: 99.99,
		date: new Date("2022-12-03"),
	},
	{
		id: "e2",
		description: "Computer",
		amount: 1899.99,
		date: new Date("2022-12-19"),
	},
	{
		id: "e3",
		description: "TV",
		amount: 1299.99,
		date: new Date("2022-11-10"),
	},
	{
		id: "e4",
		description: "Jacket",
		amount: 139.99,
		date: new Date("2022-10-03"),
	},
	{
		id: "e5",
		description: "Bag",
		amount: 79.99,
		date: new Date("2021-11-13"),
	},
];
