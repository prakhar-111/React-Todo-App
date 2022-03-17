import * as React from "react";
import "../App.css";
import { TodoContext } from "../utils/todoprovider";

function Todo({ todo, todoState }) {
  const [todos, setTodos, , setActiveTodos] = React.useContext(TodoContext);
  const [disabled, setDisabled] = React.useState(true);
  const [localTodoValue, setLocalTodoValue] = React.useState(todo.value);
  function handleRemove(event) {
    event.preventDefault();
    let remainingTodos = todos.filter((element) => element.id !== todo.id);
    setTodos(remainingTodos);
    if (todo.isCompleted === false) {
      setActiveTodos((prevCount) => prevCount - 1);
    }
  }
  function handleEdit(event) {
    setLocalTodoValue(event.target.value);
  }
  function handleDoubleClick(event) {
    event.preventDefault();
    setDisabled(false);
  }
  function saveTodo() {
    let modifiedTodos = todos.map(function (element) {
      if (element.id === todo.id) {
        return {
          ...element,
          value: localTodoValue,
        };
      }
      return element;
    });
    let remainingTodos = modifiedTodos.filter(
      (element) => element.value !== ""
    );
    setTodos(remainingTodos);
    setDisabled(true);
    // setTodos(modifiedTodos);
  }
  function handleCheck(event) {
    console.log(event.target.checked);
    let index = todos.findIndex(function (element) {
      if (element.id === todo.id) {
        return true;
      }
    });
    let modifiedTodos = [...todos];
    modifiedTodos[index].isCompleted = !todos[index].isCompleted;
    setTodos(modifiedTodos);
    if (event.target.checked) {
      setActiveTodos((prevCount) => prevCount - 1);
    } else {
      setActiveTodos((prevCount) => prevCount + 1);
    }
  }
  if (todoState === "active" && todo.isCompleted) {
    return null;
  }
  if (todoState === "completed" && todo.isCompleted === false) {
    return null;
  }
  return (
    <li
      className="todoDiv"
      onDoubleClick={(event) => {
        handleDoubleClick(event);
      }}
    >
      <label className="checkLabel">
        ⃝
        <div className={todo.isCompleted ? "tickSpan" : "incompleteTickSpan"}>
          ✓
        </div>
        <input
          type={"checkbox"}
          check-id={todo.id}
          onClick={handleCheck}
          checked={todo.isCompleted}
        />
      </label>
      <input
        input-id={todo.id}
        value={localTodoValue}
        onChange={handleEdit}
        onBlur={saveTodo}
        disabled={disabled}
        className={todo.isCompleted ? "strike" : ""}
      />
      <button remove-id={todo.id} onClick={handleRemove}>
        ❌
      </button>
    </li>
  );
}

export { Todo };
