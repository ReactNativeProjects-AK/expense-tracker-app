import { View, TextInput, Text, StyleSheet } from "react-native";

export const Input = ({ label, textInputConfig, isValid }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, !isValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        {...textInputConfig}
        style={[styles.input, !isValid && styles.inputInvalid]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    borderRadius: 8,
  },
  input: {
    backgroundColor: "#ccdcf8",
    borderRadius: 8,
    padding: 8,
  },
  inputInvalid: {
    backgroundColor: "#f9cccd",
  },
  label: {
    fontSize: 14,
    color: "#3b82f6",
  },
  invalidLabel: {
    color: "red",
  },
});
