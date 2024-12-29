import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState();
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function resolveExpenses() {
      setIsLoading(true);
      try {
        const expenses = await getExpenses();
        setExpenses(expenses);
      } catch (err) {
        setErrorMsg(err.message);
      }
      setIsLoading(false);

      return;
    }

    resolveExpenses();
  }, []);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  const errorHandler = () => {
    setErrorMsg(null);
  }

  return errorMsg ? <ErrorOverlay message={errorMsg} onConfirm={errorHandler}/> : isLoading
    ? <LoadingOverlay />
    : <ExpensesOutput
        fallbackText={"No expenses registered for the last 7 days."}
        expenses={recentExpenses}
        expensesPeriod={"Last 7 Days"}
      />;
};

export default RecentExpenses;
