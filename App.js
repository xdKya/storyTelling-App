import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Drawer } from "react-native-paper";
import DrawerNavigator from "./navigation/drawer";
import { firebaseConfig } from "./screens/config";
import firebase from "firebase";
import LoginScreen from "./screens/login";
import RegisterScreen from "./screens/register";
import { createStackNavigator } from "@react-navigation/stack";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}
const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="drawer" component={DrawerNavigator} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StackNav></StackNav>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
