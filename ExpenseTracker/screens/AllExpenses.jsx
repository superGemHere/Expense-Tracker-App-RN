import { View, Text } from 'react-native'
import React, {useContext} from 'react'

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/context/expenses-context';


const AllExpenses = () => {
  const {expenses} =  useContext(ExpensesContext);
  return (
    <ExpensesOutput fallbackText={"No registered expenses found."} expenses={expenses} expensesPeriod={"Total"} />
  )
}

export default AllExpenses