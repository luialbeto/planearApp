import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import {
  addStoreTodo,
  deleteTodo,
  setEditingTodo,
  toggleTodo,
} from "../../redux/actions";

import TodoListItem from "./TodoListItem";
import { ListContainer } from "./TodoListStyle";

const TodoList = ({
  todos,
  dispatchToggleTodo,
  dispatchEditingTodo,
  dispatchDeleteTodo,
  dispatchAddTodo,
}) => {
  useEffect(() => {
    const fetchTodos = async () => {
      const totalParse = await AsyncStorage.getItem("todos");
      const total = JSON.parse(totalParse);
      if (total) {
        dispatchAddTodo(total);
        console.log(total);
      }
    };
    fetchTodos();
  }, [dispatchAddTodo]);

  return (
    <ListContainer>
      {todos.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onPressTodo={() => dispatchToggleTodo(todo.id)}
          editTodo={() => dispatchEditingTodo(todo)}
          deleteTodo={() => dispatchDeleteTodo(todo.id)}
        />
      ))}
    </ListContainer>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  dispatchToggleTodo: PropTypes.func.isRequired,
  dispatchEditingTodo: PropTypes.func.isRequired,
  dispatchDeleteTodo: PropTypes.func.isRequired,
  dispatchAddTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { todos } = state;
  return { todos };
};

export default connect(mapStateToProps, {
  dispatchToggleTodo: toggleTodo,
  dispatchEditingTodo: setEditingTodo,
  dispatchAddTodo: addStoreTodo,
  dispatchDeleteTodo: deleteTodo,
})(TodoList);
