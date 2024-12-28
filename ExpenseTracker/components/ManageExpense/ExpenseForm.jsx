import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import { GlobalStyles } from "../../constants/styles";

import Input from "./Input";
import Button from "../UI/Button";

const ExpenseForm = ({
   onCancel,
   onSubmit,
   submitBtnLabel
}) => {
  const [inputValues, setInputValues] = useState({
    amount: "",
    date: "",
    description: ""
  });

  const inputChangedHandler = (inputIdentifier, enteredValue) => {
    setInputValues(prevInputValues => {
      return {
        ...prevInputValues,
        [inputIdentifier]: enteredValue
      };
    });
  };

  const submitHandler = () => {
   const expenseData = {
      amount: +inputValues.amount,
      date: new Date(inputValues.date),
      description: inputValues.description
   };
   
   onSubmit(expenseData);
  };



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputValues.amount
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date
          }}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true,
          // autocorrect: false,
          // autoCapitalize: 'words',
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputValues.description
        }}
      />
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
