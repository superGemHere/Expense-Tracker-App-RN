import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { GlobalStyles } from "../../constants/styles";

const Input = ({ label, invalid, style, textInputConfig }) => {
  let inputStyle = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyle.push(styles.inputMultiline);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={[inputStyle, invalid && styles.invalidInput]} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  input: {
    padding: 6,
    fontSize: 18,
    borderRadius: 6,
    color: GlobalStyles.colors.primary700,
    backgroundColor: GlobalStyles.colors.primary100
    //  borderColor: GlobalStyles.colors.primary50,
    //  borderWidth: 1.1
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  invalidLabel: {
      color: GlobalStyles.colors.error500
  },
  invalidInput: {
   backgroundColor: GlobalStyles.colors.error50,
  }
});
