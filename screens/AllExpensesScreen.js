import { useContext } from "react";
import { StoreContext } from "../store/store";
import ExpenseTemplate from "../components/ExpenseTemplate";

export default function AllExpensesScreen() {
  const { expenses } = useContext(StoreContext);

  return <ExpenseTemplate title="Total" expenses={expenses} />;
}
