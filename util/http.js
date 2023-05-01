import axios from "axios";

const BACKEND_URL =
  "https://react-native-expenses-75306-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  return response.data.name;
}

export async function getExpenses() {
  const expenses = [];
  try {
    const response = await axios.get(BACKEND_URL + "/expenses.json");
    for (const key in response.data) {
      const expense = response.data[key];
      const expenseObj = {
        id: key,
        date: new Date(expense.date),
        amount: expense.amount,
        description: expense.description,
      };
      expenses.push(expenseObj);
    }
  } catch (e) {
    throw new Error(e);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  try {
    return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
  } catch (e) {
    throw new Error(e);
  }
}

export function deleteExpense(id) {
  try {
    return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
  } catch (e) {
    throw new Error(e);
  }
}
