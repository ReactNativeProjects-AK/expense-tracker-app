import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ExpenseCard({ name, date, amount, id }) {
  const navigation = useNavigation();

  return (
    <View>
      <Pressable onPress={() => navigation.navigate("ManageExpenses", { id })}>
        <View style={styles.container}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
          <Text style={styles.amount}>{amount}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#3b82f6",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "white",
    fontSize: 10,
  },
  amount: {
    color: "#3b82f6",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 4,
    fontWeight: "bold",
    width: "20%",
    textAlign: "center",
  },
});
