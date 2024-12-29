import axios from 'axios';

// import { BACKEND_URL } from 'react-native-dotenv'

const backendURL = process.env.BACKEND_URL + "expenses.json"

export function storeExpense (expenseData) {
   axios.post(backendURL, expenseData).then(response => {
      console.log("Expense data stored successfully:", response.data);
    })
    .catch(error => {
      console.error("Error storing expense data:", error);
    });
   
}

