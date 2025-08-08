import { createContext, useReducer, useState } from "react";

const DummyExpenses = [
  {
    id: "e1",
    name: "Groceries",
    amount: 100,
    date: "2025-07-31",
  },
  {
    id: "e2",
    name: "Transport",
    amount: 200,
    date: "2025-08-01",
  },
  {
    id: "e3",
    name: "Entertainment",
    amount: 300,
    date: "2025-08-02",
  },
];

export const StoreContext = createContext({
  expenses: DummyExpenses,
  addExpense: ({ name, amount, date }) => {},
  removeExpense: (id) => {},
  updateExpense: ({ id, name, amount, date }) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [...state, { id, ...action.payload }];
    case "REMOVE":
      return state.filter((expense) => expense.id !== action.payload);
    case "UPDATE":
      return state.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      });
    default:
      return state;
  }
};

export default function StoreProvider({ children }) {
  const [expenses, dispatch] = useReducer(expenseReducer, DummyExpenses);

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: { ...expense } });
  };
  const removeExpense = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE", payload: { ...expense } });
  };

  const store = {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
