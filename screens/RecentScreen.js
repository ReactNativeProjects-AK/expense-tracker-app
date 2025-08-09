import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store/store";
import ExpenseTemplate from "../components/ExpenseTemplate";
import { getRemoteExpenses } from "../utils/https";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

export default function RecentScreen() {
  const { expenses, setExpenses } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const remoteExpenses = await getRemoteExpenses();
        setExpenses(remoteExpenses);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    fetchExpenses();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

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
