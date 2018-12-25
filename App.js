import React, { Component } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  GraphRequest,
  GraphRequestManager,
  LoginManager
} from "react-native-fbsdk";

export default class App extends Component {
  fbLogin = () => {
    LoginManager.logInWithReadPermissions(["public_profile"]).then(
      function(result) {
        if (result.isCancelled) {
          alert("Login cancelled");
        } else {
          const infoRequest = new GraphRequest(
            "/me?fields=email,name",
            null,
            (error, result) => {
              if (error) return console.log(error);

              return console.log(result);
            }
          );

          // Start the graph request.
          new GraphRequestManager().addRequest(infoRequest).start();
        }
      },
      function(error) {
        alert("Login fail with error: " + error);
      }
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button title="Login with Facebook" onPress={this.fbLogin} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});
