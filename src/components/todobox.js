import * as React from "react";
import "../App.css";
import { TodoInput } from "./todoInput";
import { Todo } from "./todo";
import { TodoContext } from "../utils/todoprovider";

function TodoBox({ todoState, setTodoState }) {
  const [todos, setTodos, activeTodos] = React.useContext(TodoContext);
  console.log(todos);
  function handleState(event, state) {
    event.preventDefault();
    setTodoState(state);
  }
  function clearCompleted(event) {
    event.preventDefault();
    let modifiedTodos = todos.filter(
      (element) => element.isCompleted === false
    );
    setTodos(modifiedTodos);
  }
  return (
    <div className="box">
      <TodoInput />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} todoState={todoState} />
      ))}
      <footer>
        <span className="totalTodos">{`${activeTodos} items left`}</span>
        <div className="todoType">
          <button
            className={todoState === "all" ? "filters highlight" : "filters"}
            id="all"
            onClick={(event) => handleState(event, "all")}
          >
            All
          </button>
          <button
            className={todoState === "active" ? "filters highlight" : "filters"}
            id="active"
            onClick={(event) => handleState(event, "active")}
          >
            Active
          </button>
          <button
            className={
              todoState === "completed" ? "filters highlight" : "filters"
            }
            id="completed"
            onClick={(event) => handleState(event, "completed")}
          >
            Completed
          </button>
        </div>
        <button
          className="clearAll"
          id="clearCompleted"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      </footer>
    </div>
  );
}

export { TodoBox };
