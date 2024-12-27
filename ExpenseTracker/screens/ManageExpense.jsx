import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import IconBtn from "../components/UI/IconBtn";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/context/expenses-context";

const ManageExpense = ({ route, navigation }) => {
  const { deleteExpense, updateExpense, addExpense } = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;

  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
      headerTitle: () => (
        <Text
          style={{
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            textShadowColor: GlobalStyles.colors.accent500,
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 4,
          }}
        >
          {isEditing ? "Edit Expense" : "Add Expense"}
        </Text>
      ),
    })
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };
  
  const confirmHandler = () => {
    if(expenseId){
      updateExpense(expenseId, {
        id: Math.random().toString(),
        description: "Test Expense Updated",
        amount: 19.99,
        date: new Date('2024-12-17'),
      });
    }else{
      addExpense({
        id: Math.random().toString(),
        description: "Test Expense Added",
        amount: 19.99,
        date: new Date('2024-12-15'),
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Button mode={"flat"} onPress={cancelHandler} style={styles.button}>Cancel</Button>
        <Button onPress={confirmHandler} style={styles.button}>{isEditing ? "Update" : "Add"}</Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconBtn 
          icon={"trash"} 
          color={GlobalStyles.colors.error500} 
          size={36} 
          onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  btnContainer:{
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  }
})
