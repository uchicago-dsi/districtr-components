
import React from "react";

import { InputProps } from "./Input.types";

import "./Input.css";

const Input: React.FC<InputProps> = ({ foo }) => {
  
  return (
    <div data-testid="Input" className="foo-bar">{foo}</div>)
  };

export default Input;

