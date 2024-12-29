import { View, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/context/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses, } from "../utils/http";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function resolveExpenses() {
      const expenses = await getExpenses();
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

  )
  );
};

export default RecentExpenses;
