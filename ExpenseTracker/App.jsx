import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import { GlobalStyles } from './constants/styles';
import { Provider } from 'react-redux';
import { store } from './store/redux/store';

import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import IconBtn from './components/UI/IconBtn';
import ExpensesContextProvider from './store/context/expenses-context';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <Tab.Navigator screenOptions={({navigation}) => (
      {
      headerTitleAlign: 'center',
      headerStyle:{
        backgroundColor: GlobalStyles.colors.primary500
      },
      headerTintColor: 'white',
      tabBarStyle: {
        backgroundColor: GlobalStyles.colors.primary500,
      },
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
      <IconBtn 
      icon={"add"} 
      size={24} 
      color={tintColor} 
      onPress={() => navigation.navigate("ManageExpense")}/>)
    }
    )}>
      <Tab.Screen name='RecentExpenses' component={RecentExpenses} options={{
        title: 'Recent Expenses',
        tabBarLabel: 'Recent',
        tabBarIcon: ({color, size}) => (
          <Ionicons name='hourglass' size={size} color={color} />
        )
      }}/>
      <Tab.Screen name='AllExpenses' component={AllExpenses} options={{
        title: 'All Expenses',
        tabBarLabel: 'All Expenses',
        tabBarIcon: ({color, size}) => (
          <Ionicons name='calendar' size={size} color={color} />
        )
      }}/>
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
      {/* <Provider store={store}> */}
        <NavigationContainer>
          <Stack.Navigator initialRouteName='ExpensesOverview' screenOptions={{
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: GlobalStyles.colors.primary500
            },
            headerTintColor: 'white',
          }}>
            <Stack.Screen name="ManageExpense" component={ManageExpense} options={{
              presentation: 'modal',
            }}/>
            <Stack.Screen name="ExpensesOverview" component={ExpensesOverview} options={{
              headerShown: false
            }}/>
          </Stack.Navigator>
        </NavigationContainer>
      {/* </Provider> */}
      </ExpensesContextProvider>
    </>
  );
}


