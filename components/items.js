import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Swipeable } from "./swipeables";

// récupération des textes
import { local } from "../exports/texts";
const localText = local();

// import functions database
import { selectAllItems } from "../exports/dbAccess";

export function Items({ done: doneHeading, onPressItem, forceUp }) {
  const [items, setItems] = React.useState(null);

  React.useEffect(() => {
    selectAllItems(doneHeading).then((_array) => setItems(_array));
  }, []);

  const heading = doneHeading ? localText.heading.made : localText.heading.todo;

  if (!items || items === null || items.length === 0) {
    return null;
  }

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={{
          fontFamily: "FrederickatheGreat",
          fontSize: 20,
          marginBottom: 8,
          borderRadius: 3,
          color: doneHeading ? "#dbffb9" : "#ffe6dd",
          backgroundColor: doneHeading ? "#6b8e23" : "#b22222",
        }}>
        {" "}
        {heading}{" "}
      </Text>
      {items.map(({ id, done, value }) => (
        <Swipeable key={"swipe_" + id} done={done} idx={id} forceUp={forceUp}>
          <RectButton enabled={false} style={styles.rectButton}>
            <TouchableOpacity
              key={id}
              onPress={() => onPressItem && onPressItem(id)}
              style={{
                backgroundColor: done ? "#bdb76b" : "#ffdead",
                borderColor: "#564C39",
                borderRadius: 3,
                borderWidth: 1,
                padding: 8,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontFamily: "Fragmentcore",
                  color: done ? "#fff" : "#000",
                }}>
                {" "}
                {value}{" "}
              </Text>
            </TouchableOpacity>
          </RectButton>
        </Swipeable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  rectButton: {
    backgroundColor: "transparent",
  },
});
