import * as React from "react";
import "../App.css";
import { TodoContext } from "../utils/todoprovider";

function TodoInput() {
  const [todos, setTodos, activeTodos, setActiveTodos] =
    React.useContext(TodoContext);

  function addTodo(event) {
    if (event.type === "keyup" && event.keyCode !== 13) {
      return;
    }
    // console.log(event);
    if (event.target.value === "") {
      return;
    }
    const newTodo = {
      id: Date.now(),
      value: event.target.value,
      isCompleted: false,
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    event.target.value = "";
    setActiveTodos((prevCount) => prevCount + 1);
  }

  function selectAll(event) {
    if (activeTodos === 0) {
      let modifiedTodos = todos.map(function (element) {
        return {
          ...element,
          isCompleted: false,
        };
      });

      setTodos(modifiedTodos);
      setActiveTodos(todos.length);
    } else {
      let modifiedTodos = todos.map(function (element) {
        return {
          ...element,
          isCompleted: true,
        };
      });

      setTodos(modifiedTodos);
      setActiveTodos(0);
    }
  }

  return (
    <div className="inputDiv">
      <label className="check">
        ⌄
        <input type="checkbox" id="selectAll" onClick={selectAll} />
      </label>
      <input
        type="text"
        id="enterTodo"
        placeholder="What needs to be done?"
        onBlur={addTodo}
        onKeyUp={addTodo}
      />
      <label htmlFor="enterTodo"></label>
    </div>
  );
}

export { TodoInput };
