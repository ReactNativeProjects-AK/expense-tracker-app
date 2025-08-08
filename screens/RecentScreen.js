import { useContext } from "react";
import { StoreContext } from "../store/store";
import ExpenseTemplate from "../components/ExpenseTemplate";

export default function RecentScreen() {
  const { expenses } = useContext(StoreContext);

  const recentExpenses = expenses.filter((expense) => {
    const date = new Date(expense.date);
    const today = new Date();
    const diff = today - date;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (diffDays > 7) {
      return false;
    }
    return true;
  });

  return <ExpenseTemplate title="Last 7 days" expenses={recentExpenses} />;
}
