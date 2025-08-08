import { View, StyleSheet } from "react-native";
import Button from "../components/ui/Button";
import IconButton from "../components/ui/IconButton";
import { useContext } from "react";
import { StoreContext } from "../store/store";

export default function ManageExpenses({ route, navigation }) {
  const { removeExpense, updateExpense, addExpense } = useContext(StoreContext);
  const { id } = route.params || {};
  const isEditMode = !!id;

  const handleCancel = () => {
    navigation.goBack();
  };

  const handleConfirm = () => {
    if (isEditMode) {
      updateExpense({
        id,
        name: "Default",
        amount: 10,
        date: "2025-08-08",
      });
    } else {
      addExpense({
        name: "Default123",
        amount: 1230,
        date: "2025-08-10", 
      });
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    removeExpense(id);
    navigation.goBack();
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button flat onPress={handleCancel}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={handleConfirm}>
            {isEditMode ? "Update" : "Add"}
          </Button>
        </View>
      </View>
      {isEditMode && (
        <IconButton icon="trash" size={32} color="red" onPress={handleDelete} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  deleteButton: {
    marginTop: 24,
  },
});
