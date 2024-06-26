import React from "react";
import { StyleSheet, View } from "react-native";
import TodoApp from "../src/TodoApp";
import WeatherComponent from "../src/components/WeatherComponent.jsx";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <TodoApp />
        <WeatherComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
