import {createSlice} from '@reduxjs/toolkit';

const expensesSlice = createSlice({
   name: "expenses",
   initialState: {
      ids: [],
   },
   reducers: {
      addExpense(state, action) {
         state.ids.push(action.payload.id);
      },
      removeExpense(state, action) {
         state.ids = state.ids.filter(id => id !== action.payload.id);
      },
   }
});

export const {addExpense, removeExpense} = expensesSlice.actions;

export default expensesSlice.reducer;