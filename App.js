import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";
import * as SQLite from "expo-sqlite";

// import * as Font from 'expo-font';
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

// Items
import { Items } from "./components/items";
import {db, addItem, removeItem, reactivateItem, archivateItem , deleteItem} from "./components/dbAccess";
// const db = SQLite.openDatabase("todo.db");
export default function App() {
  let [fontsLoaded] = useFonts({
    FrederickatheGreat: require("./assets/fonts/FrederickatheGreat-Regular.ttf"),
    Fragmentcore: require("./assets/fonts/Fragmentcore.otf"),
  });

  const [text, setText] = React.useState(null);
  const [forceUpdate, forceUpdateId] = useForceUpdate();

  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, done int, value text);"
      );
    });
  }, []);

  // adding item to db
  

  // _loadFontsAsync()
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    // render  view
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Choses à faire</Text>
        <View style={styles.flexRow}>
          <TextInput
            onChangeText={(text) => setText(text)}
            onSubmitEditing={() => {
              addItem(text).then(forceUpdate);
              setText(null);
            }}
            placeholder="Qu'est ce que tu veux faire ?"
            style={styles.input}
            value={text}
          />
        </View>
        <ScrollView style={styles.listArea}>
          <Items
            key={`forceupdate-todo-${forceUpdateId}`}
            done={false}
              onPressItem={(id) => {archivateItem(id).then(forceUpdate)}}
              forceUp={forceUpdate}
          />

          <Items
            done
            key={`forceupdate-done-${forceUpdateId}`}
            /*onPressItem={(id) => {deleteItem(id).then(forceUpdate)}}*/
            forceUp={forceUpdate}
          />
        </ScrollView>
        <StatusBar style="auto" />
      </View>
    );
  }
}

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return [() => setValue(value + 1), value];
}

// styles definitions
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5DEB3",
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    fontFamily: "FrederickatheGreat",
    fontSize: 30,
    textAlign: "center",
    color: "#564C39",
  },
  flexRow: {
    flexDirection: "row",
  },
  input: {
    backgroundColor: "#fffbf3",
    borderColor: "#800000",
    borderRadius: 4,
    borderWidth: 1,
    flex: 1,
    height: 48,
    margin: 16,
    padding: 8,
    fontSize: 18,
    fontFamily: "Fragmentcore",
  },
  listArea: {
    backgroundColor: "#AE9C78",
    flex: 1,
    paddingTop: 16,
  },
});
