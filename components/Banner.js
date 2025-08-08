import { View, Text, StyleSheet } from "react-native";

export default function Banner({ title, totalAmount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.totalAmount}>₹{totalAmount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ccc",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 4,
    marginBottom: 8,
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3b82f6",
  },
});
