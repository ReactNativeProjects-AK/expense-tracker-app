import { View, Text, StyleSheet, FlatList } from "react-native";

import ExpenseCard from "../components/ExpenseCard";
import Banner from "../components/Banner";

export default function ExpenseTemplate({ title, expenses }) {
  return (
    <View style={styles.container}>
      <Banner
        title={title}
        totalAmount={expenses.reduce(
          (total, expense) => total + expense.amount,
          0
        )}
      />
      {expenses.length > 0 ? (
        <FlatList
          data={expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ExpenseCard
              id={item.id}
              name={item.name}
              date={item.date}
              amount={item.amount}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text>No expenses found.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
