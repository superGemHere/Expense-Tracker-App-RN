import { View, Text, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label={"Amount"}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
          }}
        />
        <Input
          label={"Date"}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
          }}
        />
      </View>
      <Input
        label={"Description"}
        textInputConfig={{
          multiline: true
          // autocorrect: false,
          // autoCapitalize: 'words',
        }}
      />
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
  }
});
