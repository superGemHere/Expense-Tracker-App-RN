import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";

import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/context/expenses-context";

import IconBtn from "../components/UI/IconBtn";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpenseRemote, storeExpense, updateExpenseRemote } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({ route, navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { deleteExpenseLocal, updateExpenseLocal, addExpense, expenses } = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;

  const isEditing = !!expenseId;

  const selectedExpense = isEditing ? expenses.find(expense => expense.id === expenseId) : null;

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

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    try {
      await deleteExpenseRemote(expenseId);
      deleteExpenseLocal(expenseId);
    } catch (error) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };
  
  const confirmHandler = async (expenseData) => {
    setIsLoading(true);
    try {

      if(expenseId){
        updateExpenseLocal(expenseId, expenseData);
        await  updateExpenseRemote(expenseId, expenseData);
      }else{
        const id = await storeExpense(expenseData);
        addExpense({...expenseData, id: id});
      }
      navigation.goBack();

    } catch (error) {

      setErrorMsg(error.message);
      setIsLoading(false);
      
    }


  };

  const errorHandler = () => {
    setErrorMsg(null);
  }

  return ( errorMsg ? <ErrorOverlay message={errorMsg} onConfirm={errorHandler} /> : isLoading ? <LoadingOverlay /> :(
    <ScrollView style={styles.screen}>
      <KeyboardAvoidingView behavior="position" style={styles.screen}>
        <View style={styles.container}>
          <ExpenseForm 
            onCancel={cancelHandler} 
            submitBtnLabel={isEditing ? "Update" : "Add"}
            onSubmit={confirmHandler}
            defaultValues={selectedExpense}
          />
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
      </KeyboardAvoidingView>
    </ScrollView>
    )
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
  }
})
