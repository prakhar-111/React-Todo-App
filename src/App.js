import "./App.css";
import { TodoBox } from "./components/todobox";
import * as React from "react";
import { TodoContext } from "./utils/todoprovider";

function App() {
  const [todos, , activeTodos] = React.useContext(TodoContext);
  if (!localStorage.getItem("todoState")) {
    localStorage.setItem("todoState", "all");
  }
  const [todoState, setTodostate] = React.useState(() => {
    const initialState = localStorage.getItem("todoState");
    return initialState;
  });
  React.useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);
  React.useEffect(() => {
    localStorage.setItem("todoState", todoState);
  }, [todoState]);
  React.useEffect(() => {
    localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
  }, [activeTodos]);

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoBox todoState={todoState} setTodoState={setTodostate}></TodoBox>
    </div>
  );
}

export { App };
