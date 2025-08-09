import axios from "axios";

const API_URL =
  "https://expense-tracker-2dcdb-default-rtdb.asia-southeast1.firebasedatabase.app/";

export async function getRemoteExpenses() {
  const response = await axios.get(`${API_URL}/expenses.json`);
  const data = response.data;

  return Object.entries(data).map(([id, expense]) => ({ id, ...expense }));
}

export async function addRemoteExpense(expenseData) {
  const response = await axios.post(`${API_URL}/expenses.json`, expenseData);
  return response.data.name; // Firebase returns the name of the added expense which is the id of the expense
}

export function updateRemoteExpense(expenseData) {
  return axios.put(`${API_URL}/expenses/${expenseData.id}.json`, expenseData);
}

export function deleteRemoteExpense(id) {
  return axios.delete(`${API_URL}/expenses/${id}.json`);
}
