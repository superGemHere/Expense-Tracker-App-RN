import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'

import ExpensesSummary from './ExpensesSummary'
import ExpensesList from './ExpensesList'
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES = [
   {
      id: "e1",
      description: "A pair of socks",
      amount: 59.99,
      date: new Date('2024-12-19')
   },
   {
      id: "e2",
      description: "A pair of shoes",
      amount: 89.29,
      date: new Date('2024-12-21')
   },
   {
      id: "e3",
      description: "Some bananas",
      amount: 5.99,
      date: new Date('2024-12-20')
   },
   {
      id: "e4",
      description: "Book",
      amount: 14.99,
      date: new Date('2024-12-22')
   },
   {
      id: "e5",
      description: "Book",
      amount: 18.59,
      date: new Date('2024-12-22')
   },
   {
      id: "e6",
      description: "Some bananas",
      amount: 5.99,
      date: new Date('2024-12-20')
   },
   {
      id: "e7",
      description: "Book",
      amount: 14.99,
      date: new Date('2024-12-22')
   },
   {
      id: "e8",
      description: "Book",
      amount: 18.59,
      date: new Date('2024-12-22')
   },
];

const ExpensesOutput = ({
   expenses,
   expensesPeriod,
}) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod} />
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 0,
      backgroundColor: GlobalStyles.colors.primary700,
   }
});