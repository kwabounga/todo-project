import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export class ButtonTodo extends React.Component {
  render() {
    return (
      <View style={styles.button}>
        <TouchableOpacity onPress={() => alert("click!")}>
          <Text style={{ fontSize: 20, color: "#fff" }}>
            {" "}
            {this.props.value}{" "}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
