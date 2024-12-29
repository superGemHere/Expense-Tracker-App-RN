import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses, } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function resolveExpenses() {
      setIsLoading(true);
      const expenses = await getExpenses();
      setIsLoading(false);
      setExpenses(expenses)
      return;
    }

    resolveExpenses();
  }, []);

  const recentExpenses = expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return ( isLoading ? <LoadingOverlay /> : (
    <ExpensesOutput
      fallbackText={"No expenses registered for the last 7 days."}
      expenses={recentExpenses}
      expensesPeriod={"Last 7 Days"}
    />
  )
  );
};

export default RecentExpenses;
