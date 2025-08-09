import { View, Text, StyleSheet } from "react-native";

export default function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong.</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
});
