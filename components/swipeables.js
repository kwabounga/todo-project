import React, { Component } from "react";
import { Animated, Text, StyleSheet, View } from "react-native";
import {
  PanGestureHandler,
  State,
  RectButton,
} from "react-native-gesture-handler";

// locales
import { local } from "./texts";
const localText = local();

import { USE_NATIVE_DRIVER } from "../config";
import {
  db,
  addItem,
  removeItem,
  reactivateItem,
  archivateItem,
  deleteItem,
} from "./dbAccess";

const RATIO = 3;
export class Swipeable extends Component {
  constructor(props) {
    super(props);
    this._width = 0;
    this._dragX = new Animated.Value(0);
    this._transX = this._dragX.interpolate({
      inputRange: [0, RATIO],
      outputRange: [0, 1],
    });
    this._showLeftAction = this._dragX.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });
    this._showRightAction = this._dragX.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [1, 0, 0],
    });
    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: this._dragX } }],
      { useNativeDriver: USE_NATIVE_DRIVER }
    );
  }
  _onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const dragToss = 0.05;
      const endOffsetX =
        event.nativeEvent.translationX + dragToss * event.nativeEvent.velocityX;

      let toValue = 0;
      if (endOffsetX > this._width / 2) {
        toValue = this._width * RATIO;
      } else if (endOffsetX < -this._width / 2) {
        toValue = -this._width * RATIO;
      }

      Animated.spring(this._dragX, {
        velocity: event.nativeEvent.velocityX,
        tension: 15,
        friction: 5,
        toValue,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();
    }
  };
  _onLayout = (event) => {
    this._width = event.nativeEvent.layout.width;
  };
  _reset = () => {
    Animated.spring(this._dragX, {
      toValue: 0,
      useNativeDriver: USE_NATIVE_DRIVER,
      tension: 15,
      friction: 5,
    }).start();
  };
  render() {
    const { children, forceUp } = this.props;

    return (
      <View>
        <Animated.View
          style={[styles.rowAction, { opacity: this._showLeftAction }]}>
          <RectButton
            style={[styles.rowAction, styles.leftAction]}
            onPress={() => {
              // alert(this.props.idx);
              if (this.props.done) {
                reactivateItem(this.props.idx).then(forceUp);
              } else {
                archivateItem(this.props.idx).then(forceUp);
              }
            }}>
            <Text style={styles.actionButtonTextLeft}>
              {this.props.done
                ? localText.swipeables.reactivate
                : localText.swipeables.archivate}
            </Text>
          </RectButton>
        </Animated.View>
        <Animated.View
          style={[styles.rowAction, { opacity: this._showRightAction }]}>
          <RectButton
            style={[styles.rowAction, styles.rightAction]}
            // onPress={this._reset}>
            onPress={() => {
              // alert(this.props.idx);
              deleteItem(this.props.idx).then(() => forceUp());
            }}>
            <Text style={styles.actionButtonTextRight}>
              {localText.swipeables.delete}
            </Text>
          </RectButton>
        </Animated.View>
        <PanGestureHandler
          {...this.props}
          activeOffsetX={[-10, 10]}
          onGestureEvent={this._onGestureEvent}
          onHandlerStateChange={this._onHandlerStateChange}>
          <Animated.View
            style={{
              backgroundColor: "transparent",
              transform: [{ translateX: this._transX }],
            }}
            onLayout={this._onLayout}>
            {children}
          </Animated.View>
        </PanGestureHandler>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rectButton: {
    backgroundColor: "transparent",
    borderRadius: 3,
    flex: 1,
    height: 60,
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  rowAction: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  leftAction: {
    backgroundColor: "#4CAF50",
    borderRadius: 3,
    textAlign: "right",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightAction: {
    backgroundColor: "#F44336",
    borderRadius: 3,
    textAlign: "left",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButtonTextRight: {
    fontFamily: "Fragmentcore",
    color: "white",
    fontSize: 18,
    textAlign: "left",
    padding: 8,
  },
  actionButtonTextLeft: {
    fontFamily: "Fragmentcore",
    color: "white",
    fontSize: 18,
    textAlign: "right",
    padding: 8,
  },
  buttonDelimiter: {
    height: 1,
    backgroundColor: "#999",
  },
  buttonText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  infoButton: {
    width: 40,
    height: 40,
  },
  infoButtonBorders: {
    borderColor: "#467AFB",
    borderWidth: 2,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
  },
  infoButtonText: {
    color: "#467AFB",
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
});
