import React from "react";
import PropTypes from "prop-types";
import { InputForm } from "./TodoFormStyle";

const Input = ({ onChangeText, value }) => (
  <InputForm
    onChange={(e) => onChangeText(e.target.value)}
    value={value}
    placeholder="Digite a sua tarefa"
    placeholderTextColor="rgba(255, 255, 255, 0.65)"
  />
);

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Input;
