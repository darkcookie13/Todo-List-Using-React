// this todoform shows how we can update a todo or add new todo
import React, { useState, useEffect, useRef } from "react";

function TodoForm({ onSubmit, edit }) {
  // Define a state variable 'input' and initialize it with the value of 'edit' if it exists, or an empty string.
  const [input, setInput] = useState(edit ? edit.value : "");

  // Create a reference to the input element.
  const inputRef = useRef(null);

  // Use the 'useEffect' hook to focus on the input element when the component is first mounted.
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Define a function 'handleChange' to update the 'input' state when the input field value changes.
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // Define a function 'handleSubmit' to handle the form submission.
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the 'input' is empty and return if it is.
    if (input.trim() === "") {
      return;
    }

    // Create a new todo object with a random 'id', the 'input' text, and 'isComplete' set to false.
    const newTodo = {
      id: Math.floor(Math.random() * 1000),
      text: input,
      isComplete: false
    };

    // Call the 'onSubmit' function passed as a prop and pass the newTodo object.
    onSubmit(newTodo);

    // Clear the 'input' field by setting it to an empty string.
    setInput("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      {edit ? (
        // If 'edit' is true, render an input field and a button for updating the todo.
        <>
          <input
            type="text"
            placeholder="Update"
            value={input}
            name="text"
            className="todo-input edit"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button edit">Update</button>
        </>
      ) : (
        // If 'edit' is false, render an input field and a button for adding a new todo.
        <>
          <input
            type="text"
            placeholder="Add a todo"
            value={input}
            name="text"
            className="todo-input"
            onChange={handleChange}
            ref={inputRef}
          />
          <button className="todo-button">Add Todo</button>
        </>
      )}
    </form>
  );
}

export default TodoForm;
