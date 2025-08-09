import { Input } from "./ui/Input";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import Button from "./ui/Button";

export default function ExpenseForm({
  defaultValues,
  onSubmit,
  onCancel,
  submitButtonLabel,
}) {
  const [inputs, setInputs] = useState({
    name: { value: defaultValues?.name || "", isValid: true },
    amount: { value: defaultValues?.amount?.toString() || "", isValid: true },
    date: { value: defaultValues?.date || "", isValid: true },
  });

  const inputChangeHandler = (inputId, value) => {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputId]: { value, isValid: true },
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      name: inputs.name.value,
      amount: +inputs.amount.value,
      date: inputs.date.value,
    };

    const isNameValid = inputs.name.value.trim().length > 0;
    const isAmountValid =
      !isNaN(inputs.amount.value) && +inputs.amount.value > 0;
    const isDateValid =
      inputs.date.value.trim().length === 10 &&
      new Date(inputs.date.value).toString() !== "Invalid Date";

    const isFormValid = isNameValid && isAmountValid && isDateValid;

    if (!isFormValid) {
      setInputs(() => {
        return {
          name: { value: inputs.name.value, isValid: isNameValid },
          amount: { value: inputs.amount.value, isValid: isAmountValid },
          date: { value: inputs.date.value, isValid: isDateValid },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const isFormValid =
    inputs.name.isValid && inputs.amount.isValid && inputs.date.isValid;

  return (
    <>
      <View style={styles.inputsContainer}>
        <Input
          label="Name"
          isValid={inputs.name.isValid}
          textInputConfig={{
            value: inputs.name.value,
            onChangeText: inputChangeHandler.bind(this, "name"),
          }}
        />
        <Input
          label="Amount"
          isValid={inputs.amount.isValid}
          textInputConfig={{
            value: inputs.amount.value,
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
        />
        <Input
          label="Date"
          isValid={inputs.date.isValid}
          textInputConfig={{
            value: inputs.date.value,
            keyboardType: "numeric",
            onChangeText: inputChangeHandler.bind(this, "date"),
            placeholder: "YYYY-MM-DD",
          }}
        />
        {!isFormValid ? (
          <Text style={styles.errorText}>
            Please enter a valid name, amount, and date.
          </Text>
        ) : null}
      </View>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button flat onPress={onCancel}>
            Cancel
          </Button>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  inputsContainer: {
    margin: 12,
    width: "80%",
    alignSelf: "center",
  },
  container: {
    margin: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    alignSelf: "center",
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "space-around",
  },
  errorText: {
    textAlign: "center",
    color: "red",
  },
});
