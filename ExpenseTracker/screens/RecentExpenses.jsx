import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/context/expenses-context';
import { getDateMinusDays } from '../utils/date';

const RecentExpenses = () => {
   const {expenses} =  useContext(ExpensesContext);

   const recentExpenses = expenses.filter(expense => {
      const today = new Date();
      const date7DaysAgo = getDateMinusDays(today, 7);

      return (expense.date >= date7DaysAgo) && (expense.date <= today);
   });

  return (
    <ExpensesOutput fallbackText={"No expenses registered for the last 7 days."} expenses={recentExpenses} expensesPeriod={"Last 7 Days"} />
  )
}

export default RecentExpenses