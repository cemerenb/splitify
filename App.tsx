import React, { useContext, useState } from "react";
import { View, StyleSheet, NativeModules, Platform } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  Theme as NavigationTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ThemeContext, ThemeProvider } from "./Theme/ThemeContext";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { TabBar } from "./TabBar/TabBar";
import PersonalExpensEntry from "./Pages/PersonalExpensesEntry";
import Groups from "./Pages/Groups";
import CreateGroup from "./Pages/CreateGroup";
import ResetPassword from "./Pages/ResetPassword";
import AllExpenses from "./Pages/AllExpenses";
import GroupPage from "./Pages/GroupPage";
import Members from "./Pages/Members";
import JoinGroup from "./Pages/JoinGroup";
import JoinPage from "./Pages/JoinGroup";
import ExpenseDetails from "./Pages/ExpensDetails";
import GroupExpenseDetails from "./Pages/GroupExpenseDetails";
import GroupExpensEntry from "./Pages/GroupExpensesEntry";
import GroupExpensesEntry from "./Pages/GroupExpensesEntry";
import AllGroupExpenses from "./Pages/GroupAllExpenses";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GroupSummary from "./Pages/GroupSummary";
import OldTransections from "./Pages/SummaryHistory";
import TransferDetails from "./Pages/TransferDetails";
import QRScanner from "./Pages/QRCodeScanner";
import ScanResult from "./Pages/ScanResult";
import Profile from "./Pages/Profile";
import DeleteAccount from "./Pages/DeleteAccount";
import i18n from "./Language/i18n";
export type RootStackNavigatorParamsList = {
  Login: undefined;
  Register: undefined;
  TabBar: undefined;
  Groups: undefined;
  AddExpense: undefined;
  ExpenseDetails: undefined;
  CreateGroup: undefined;
  ResetPassword: undefined;
  AllExpenses: undefined;
  GroupPage: undefined;
  Members: undefined;
  JoinPage: undefined;
  GroupExpenseDetails: undefined;
  GroupExpensesEntry: undefined;
  AllGroupExpenses: undefined;
  GroupSummary: undefined;
  OldTransections: undefined;
  TransferDetails: undefined;
  QRScanner: undefined;
  ScanResult: undefined;
  Profile: undefined;
  DeleteAccount: undefined;
};

const Stack = createStackNavigator<RootStackNavigatorParamsList>();

const App: React.FC = () => {
  console.log("dil");

  let deviceLanguage =
    Platform.OS === "ios"
      ? NativeModules.SettingsManager.settings.AppleLocale
      : NativeModules.I18nManager.localeIdentifier;
  console.log(deviceLanguage);
  AsyncStorage.setItem("lg", deviceLanguage);
  if (deviceLanguage === undefined) {
    // iOS 13 workaround, take first of AppleLanguages array
    deviceLanguage = NativeModules.SettingsManager.settings.AppleLanguages[0];
    console.log(deviceLanguage);
  }

  const [themeData, setThemeData] = useState(0);
  const { theme } = useContext(ThemeContext);

  const MyTheme: NavigationTheme = {
    dark: true,
    colors: {
      primary: "rgb(255, 45, 85)",
      background: "transparent",
      card: "rgb(18, 18, 18)",
      text: theme.text,
      border: "rgb(39, 39, 41)",
      notification: "rgb(255, 69, 58)",
    },
  };

  return (
    <ThemeProvider>
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ gestureEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ gestureEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ gestureEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="ResetPassword"
            component={ResetPassword}
            options={{
              gestureEnabled: false,
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="AllExpenses"
            component={AllExpenses}
            options={{
              gestureEnabled: false,
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="GroupSummary"
            component={GroupSummary}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DeleteAccount"
            component={DeleteAccount}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TransferDetails"
            component={TransferDetails}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="OldTransections"
            component={OldTransections}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AllGroupExpenses"
            component={AllGroupExpenses}
            options={{
              gestureEnabled: false,
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="QRScanner"
            component={QRScanner}
            options={{
              gestureEnabled: false,
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="ScanResult"
            component={ScanResult}
            options={{
              gestureEnabled: false,
              headerShown: false,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="GroupPage"
            component={GroupPage}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="JoinPage"
            component={JoinPage}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: "#FF964F",
                borderColor: "transparent",
              },
              gestureEnabled: false,
              headerBackTitle: i18n.back,
              headerBackTitleStyle: { fontWeight: "500" },
              headerTintColor: "white",
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Members"
            component={Members}
            options={{
              gestureEnabled: false,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ExpenseDetails"
            component={ExpenseDetails}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTintColor: theme.reverse,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="GroupExpenseDetails"
            component={GroupExpenseDetails}
            options={{
              headerShown: false,
              headerTransparent: true,
              headerTintColor: theme.reverse,
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="CreateGroup"
            component={CreateGroup}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: "rgb(0,168,107)",
                borderColor: "transparent",
              },
              gestureEnabled: false,
              headerBackTitle: i18n.back,
              headerBackTitleStyle: { fontWeight: "500" },
              headerTintColor: "white",
              headerTitle: "",
            }}
          />
          <Stack.Screen
            name="Groups"
            component={Groups}
            options={{
              gestureEnabled: false,
              headerShown: true,
            }}
          />
          <Stack.Screen
            name="GroupExpensesEntry"
            component={GroupExpensesEntry}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: "rgb(253,60,74)",
                borderColor: "transparent",
              },
              gestureEnabled: false,
              headerBackTitle: i18n.back,
              headerBackTitleStyle: { fontWeight: "500" },
              headerTintColor: "white",
              headerTitle: i18n.groupexpense,
              headerTitleStyle: {
                fontSize: 20,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="AddExpense"
            component={PersonalExpensEntry}
            options={{
              headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: "rgb(253,60,74)",
                borderColor: "transparent",
              },
              gestureEnabled: false,
              headerBackTitle: i18n.back,
              headerBackTitleStyle: { fontWeight: "500" },
              headerTintColor: "white",
              headerTitle: i18n.expense,
              headerTitleStyle: {
                fontSize: 20,
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="TabBar"
            component={TabBar}
            options={{
              gestureEnabled: true,
              headerShown: false,
              headerLeft: () => null, // Remove the back button
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const RootApp: React.FC = () => <App />;

export default RootApp;
