import { View, Text } from "react-native";
import React, { useLayoutEffect } from "react";

const ManageExpense = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    })
  }, [navigation, isEditing]);

  

  return (
    <View>
      <Text>ManageExpense</Text>
    </View>
  );
};

export default ManageExpense;
