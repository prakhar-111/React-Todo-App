import React from "react";

const TodoContext = React.createContext();

function TodoProvider(props) {
  if (!localStorage.getItem("todoList")) {
    let newTodoList = [];
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }
  if (!localStorage.getItem("activeTodos")) {
    localStorage.setItem("activeTodos", JSON.stringify(0));
  }
  const [todos, setTodos] = React.useState(() => {
    if (localStorage.getItem("todoList")) {
      let localArr = JSON.parse(localStorage.getItem("todoList"));
      return localArr;
    }
  });
  const [activeTodos, setActiveTodos] = React.useState(() => {
    if (localStorage.getItem("activeTodos")) {
      let leftTodos = JSON.parse(localStorage.getItem("activeTodos"));
      return leftTodos;
    }
  });
  const value = [todos, setTodos, activeTodos, setActiveTodos];
  return <TodoContext.Provider value={value} {...props} />;
}

export { TodoProvider, TodoContext };
