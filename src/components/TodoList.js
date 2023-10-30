// this todolist component uses the state to store and manipulate the list of todos.

import React, { useState, useEffect } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function TodoList() {
  // Define a state variable 'todos' to store the list of todos and initialize it as an empty array.
  const [todos, setTodos] = useState([]);

  // Use the 'useEffect' hook to fetch todo items from an API when the component mounts.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Define a function 'addTodo' to add a new todo to the list and send a POST request to the API.
  const addTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    // Add the new todo to the local state.
    setTodos([todo, ...todos]);

    // Make a POST request to add a new todo to the API.
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: todo.text,
        completed: false
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("New todo added to API:", data);
      });
  };

  // Define a function 'addCustomTodo' to add a custom todo to the list.
  const addCustomTodo = () => {
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: "Your custom todo text",
      isComplete: false
    };

    // Call the 'addTodo' function to add the custom todo.
    addTodo(newTodo);
  };

  // Define a function 'updateTodo' to update a todo and send a PUT request to the API.
  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    // Update the todo in the local state.
    setTodos((prev) =>
      prev.map((item) => (item.id === todoId ? newValue : item))
    );

    // Make a PUT request to update the todo in the API.
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: newValue.text,
        completed: newValue.isComplete
      })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Todo updated in API:", data);
      });
  };

  // Define a function 'removeTodo' to remove a todo from the list and send a DELETE request to the API.
  const removeTodo = (id) => {
    // Remove the todo from the local state.
    const removeArr = todos.filter((todo) => todo.id !== id);
    setTodos(removeArr);

    // Make a DELETE request to delete the todo from the API.
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE"
    })
      .then(() => {
        console.log("Todo deleted from API");
      })
      .catch((error) => {
        console.error("Error deleting todo:", error);
      });
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      {/* Render the 'TodoForm' component and pass the 'addTodo' function as a prop. */}
      <TodoForm onSubmit={addTodo} />

      {/* Render the 'Todo' component, passing in the list of 'todos' and relevant functions as props. */}
      <Todo
        todos={todos}
        completeTodo={updateTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default TodoList;
