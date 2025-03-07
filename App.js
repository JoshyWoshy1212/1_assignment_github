import './App.css';
import React, { useState } from 'react';
import Template from "./components/Template"
import TodoList from "./components/TodoList"

const App = () => {
  const [todos, setTodos]= useState([
    {
      id: 1,
      text: 'study',
      checked: true
    },
    {
      id: 2,
      text: 'mathmatics',
      checked: false
    },
    {
      id: 3,
      text: 'science',
      checked: true
    },
  ]);
  return (
    <Template>
      <TodoList todos={todos} />
    </Template>
  );
};

export default App;
