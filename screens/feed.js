import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import StoryCard from "./StoryCard";

import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import firebase from "firebase"

SplashScreen.preventAutoHideAsync();
let stories = require("./temp.json");

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      stories: [],
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchStories = () => {
    firebase
      .database()
      .ref("/posts/")
      .on(
        "value",
        (snapshot) => {
          let stories = [];
          if (snapshot.val()) {
            Object.keys(snapshot.val()).forEach(function (key) {
              stories.push({
                key: key,
                value: snapshot.val()[key],
              });
            });
          }
          this.setState({ stories: stories });
          //this.props.setUpdateToFalse();
        },
        function (errorObject) {
          console.log("A leitura falhou: " + errorObject.code);
        }
      );
  };
  componentDidMount() {
    this.fetchStories();
    this._loadFontsAsync();
  }

  keyExtractor = (item, index) => index.toString();

  renderItem = ({ item: story }) => {
    return (
      <StoryCard story={story} navigation={this.props.navigation}></StoryCard>
    );
  };
  render() {
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Historias gratis</Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            {!this.state.stories[0] ? (
              <View>
                <Text>nenhuma história disponivel</Text>
              </View>
            ) : (
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.stories}
                renderItem={this.renderItem}
              />
            )}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  cardContainer: {
    flex: 0.93,
  },
});
