import React, { Component } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, View } from "react-native";
import Input from "./Input";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import { addTodo, setTodoText, updateTodo } from "../../redux/actions";
import { ButtonIcon, Container } from "./TodoFormStyle";

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.onChangeText = this.onChangeText.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onChangeText(text) {
    this.props.dispatchSetTodoText(text);
  }

  async onPress() {
    const { todo, todos, dispatchAddTodo, dispatchUpdateTodo } = this.props;

    if (todo.text) {
      try {
        if (todo.id) {
          dispatchUpdateTodo(todo);
          console.log(todos);
        } else {
          await dispatchAddTodo(todo.text);
          console.log(todos);
        }
      } catch (e) {
        alert(e);
      }
    }
  }

  render() {
    const { todo } = this.props;

    return (
      <Container>
        <LinearGradient
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          colors={["#4740534D", "#47405300"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Container.Input>
            <Input value={todo.text} onChangeText={this.onChangeText} />
          </Container.Input>
          <View>
            <TouchableOpacity activeOpacity={0.5} onPress={this.onPress}>
              <ButtonIcon
                source={
                  !todo.id
                    ? require("../../assets/images/Add.png")
                    : require("../../assets/images/updated.png")
                }
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Container>
    );
  }
}

TodoForm.propTypes = {
  dispatchSetTodoText: PropTypes.func.isRequired,
  dispatchAddTodo: PropTypes.func.isRequired,
  dispatchUpdateTodo: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

const mapStateToProps = (state) => ({
  todo: state.editingTodo,
  todos: state.todos,
});

const mapDispatchToProps = {
  dispatchSetTodoText: setTodoText,
  dispatchAddTodo: addTodo,
  dispatchUpdateTodo: updateTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);
