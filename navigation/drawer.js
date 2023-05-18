import React, { Component } from "react";
import { Text } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stack";
import Profile from "../screens/profile";
import Sair from "../screens/logout";
const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  render() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="home" component={StackNavigator} />
        <Drawer.Screen name="profile" component={Profile} />
        <Drawer.Screen name="logout" component={Sair} />
      </Drawer.Navigator>
    );
  }
}
