import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../UI/Button";

const ExpenseForm = ({ onCancel, onSubmit, submitBtnLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    }
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputs(prevInputs => {
      return {
        ...prevInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true }
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs(prevInputs => {
        return {
          amount: { value: prevInputs.amount.value, isValid: amountIsValid },
          date: { value: prevInputs.date.value, isValid: dateIsValid },
          description: {
            value: prevInputs.description.value,
            isValid: descriptionIsValid
          }
        };
      });
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          style={styles.rowInput}
          invalid = {!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          invalid = {!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value
          }}
        />
      </View>
      <Input
        label={"Description"}
        invalid = {!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          // autocorrect: false,
          // autoCapitalize: 'words',
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid input values, please check your entered data</Text>}
      <View style={styles.btnContainer}>
        <Button mode={"flat"} onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitBtnLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
    textShadowColor: GlobalStyles.colors.accent500,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInput: {
    flex: 1
  },
  errorText: {
   textAlign: "center",
   color: GlobalStyles.colors.error500,
   margin: 8,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  }
});
