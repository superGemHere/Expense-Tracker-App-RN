import { createContext, useReducer } from "react";
import { addExpense } from "../redux/Expense";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: expenses => {},
  deleteExpenseLocal: id => {},
  updateExpenseLocal: (id, { description, amount, date }) => {}
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      const invertedExpenses = action.payload.reverse();
      return invertedExpenses;
    case "UPDATE":
      const expenseIndex = state.findIndex(
        expense => expense.id === action.payload.id
      );
      const updateableExpense = state[expenseIndex];
      const updatedItem = { ...updateableExpense, ...action.payload.data };
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
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function deleteExpenseLocal(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpenseLocal(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpenses: setExpenses,
    deleteExpenseLocal: deleteExpenseLocal,
    updateExpenseLocal: updateExpenseLocal
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
