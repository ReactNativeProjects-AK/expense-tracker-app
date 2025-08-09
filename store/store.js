import { createContext, useReducer } from "react";

export const StoreContext = createContext({
  expenses: [],
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
    case "SET":
      return action.payload;
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
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: "ADD", payload: { ...expense } });
  };
  const removeExpense = (id) => {
    dispatch({ type: "REMOVE", payload: id });
  };
  const updateExpense = (expense) => {
    dispatch({ type: "UPDATE", payload: { ...expense } });
  };

  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const store = {
    expenses,
    addExpense,
    removeExpense,
    updateExpense,
    setExpenses,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
