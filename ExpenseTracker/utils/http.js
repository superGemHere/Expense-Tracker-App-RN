import axios from "axios";

// import { BACKEND_URL } from 'react-native-dotenv'

const backendURL = process.env.BACKEND_URL;

export async function storeExpense(expenseData) {
  const response = await axios.post(backendURL + "expenses.json", expenseData);
  const id = response.data.name;
  return id;
}

export async function getExpenses() {
  const response = await axios.get(backendURL + "expenses.json")

  
  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
 
}

export function updateExpenseRemote(id, expenseData) {
  return axios.put(backendURL + `expenses/${id}.json`, expenseData);
};

export async function deleteExpenseRemote(id) {
  return axios.delete(backendURL + `expenses/${id}.json`);
};
