import { View, StyleSheet } from "react-native";
import { useContext, useState } from "react";

import IconButton from "../components/ui/IconButton";
import { StoreContext } from "../store/store";
import ExpenseForm from "../components/ExpenseForm";
import {
  updateRemoteExpense,
  addRemoteExpense,
  deleteRemoteExpense,
} from "../utils/https";
import LoadingOverlay from "../components/LoadingOverlay";
import ErrorOverlay from "../components/ErrorOverlay";

export default function ManageExpenses({ route, navigation }) {
  const { expenses, removeExpense, updateExpense, addExpense } =
    useContext(StoreContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = route.params || {};
  const isEditMode = !!id;
  const expense = expenses.find((expense) => expense.id === id);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = async (expenseData) => {
    setIsLoading(true);
    try {
      if (isEditMode) {
        const expense = {
          id,
          ...expenseData,
        };
        await updateRemoteExpense(expense);
        updateExpense(expense);
      } else {
        const id = await addRemoteExpense(expenseData);
        addExpense({
          id,
          ...expenseData,
        });
      }
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteRemoteExpense(id);
      removeExpense(id);
      navigation.goBack();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (error) {
    return <ErrorOverlay message={error} />;
  }

  return (
    <View>
      <ExpenseForm
        defaultValues={expense}
        submitButtonLabel={isEditMode ? "Update" : "Add"}
        onSubmit={handleConfirm}
        onCancel={handleCancel}
      />

      {isEditMode && (
        <View style={styles.deleteButton}>
          <IconButton
            icon="trash"
            size={32}
            color="red"
            onPress={handleDelete}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    marginTop: 12,
    padding: 12,
    borderTopWidth: 2,
    borderTopColor: "#ccc",
  },
});
