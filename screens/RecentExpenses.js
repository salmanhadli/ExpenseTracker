import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-content";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default () => {
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState();

  const expenseCtx = useContext(ExpensesContext);

  useEffect(() => {
    async function fetchExpenses() {
      setisLoading(true);
      try {
        const expenses = await getExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (e) {
        setError(e.message || "Could not fetch expenses");
      }
      setisLoading(false);
    }
    fetchExpenses();
  }, []);

  const recentExpenses = expenseCtx.expenses.filter((exp) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return exp.date > date7DaysAgo;
  });

  if (error && !isLoading)
    return (
      <ErrorOverlay message={error} onConfirm={() => setError(undefined)} />
    );

  if (isLoading) return <LoadingOverlay />;
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName="Last 7 days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
};
