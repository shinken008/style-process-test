import { styled } from "linaria/react";
import React from "react";
import ReactDOM from "react-dom";

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 48px;
  color: red;
`;

const App = () => <Title>Hello world!</Title>;

ReactDOM.render(<App />, document.getElementById("root"));
