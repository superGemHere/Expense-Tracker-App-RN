import { configureStore } from "@reduxjs/toolkit";

import expensesReducer from "./Expense";

export const store = configureStore({
   reducer: {
      expenses: expensesReducer
   }
})