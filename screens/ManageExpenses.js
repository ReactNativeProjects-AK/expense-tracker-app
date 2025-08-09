import { View, StyleSheet } from "react-native";
import { useContext } from "react";

import IconButton from "../components/ui/IconButton";
import { StoreContext } from "../store/store";
import ExpenseForm from "../components/ExpenseForm";

export default function ManageExpenses({ route, navigation }) {
  const { expenses, removeExpense, updateExpense, addExpense } =
    useContext(StoreContext);
  const { id } = route.params || {};
  const isEditMode = !!id;
  const expense = expenses.find((expense) => expense.id === id);

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = (expenseData) => {
    if (isEditMode) {
      updateExpense({
        id,
        ...expenseData,
      });
    } else {
      addExpense(expenseData);
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    removeExpense(id);
    navigation.goBack();
  };

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
