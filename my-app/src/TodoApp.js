import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Provider } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";

import TodoForm from "./components/form/TodoForm";
import TodoList from "./components/list/TodoList";
import { store } from "./redux/store/store";
import { Container, FinalBar } from "./TodoAppStyle";

const { width } = Dimensions.get("window");
export default class TodoApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Container>
          <Container.Title>To Do List</Container.Title>
          <Container.Subtitle>Organize a sua vida</Container.Subtitle>
          <TodoForm />
          <TodoList />
        </Container>
        <FinalBar width={width}>
          <LinearGradient
            style={{ flex: 1 }}
            colors={["transparent", "rgba(0,0,0,0.83)", "#000000"]}
          />
        </FinalBar>
      </Provider>
    );
  }
}
