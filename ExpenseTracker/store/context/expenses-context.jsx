import { createContext, useReducer } from "react";
import { addExpense } from "../redux/Expense";

const DUMMY_EXPENSES = [
   {
      id: "e1",
      description: "A pair of socks",
      amount: 59.99,
      date: new Date('2024-12-15')
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

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: id => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
    case "UPDATE":
      const expenseIndex = state.findIndex(expense => expense.id === action.payload.id);
      const updateableExpense = state[expenseIndex];
      const updatedItem = {...updateableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter(expense => expense.id !== action.payload);
    default:
      return state;
  }
};

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
  }

  return (
    <ExpensesContext.Provider
     value={value}
    >
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
