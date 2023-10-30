import React from "react"; // Import React library to create React components.
import "./App.css"; // Import a CSS file to style the app.
import TodoForm from "./components/TodoForm"; // Import the 'TodoForm' component.
import TodoList from "./components/TodoList"; // Import the 'TodoList' component.

function App() {
  return (
    <div className="todo-app">
      {" "}
      {/* Create a container div with a CSS class 'todo-app'. */}
      <TodoList /> {/* Render the 'TodoList' component inside the container. */}
    </div>
  );
}

export default App; // Export the 'App' component to be used in other parts of the application.
