// this todo component use for rendering and managing the todo items like there are edit and delete icons

import React, { useState } from 'react';
import TodoForm from './TodoForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

function Todo({ todos, completeTodo, removeTodo, updateTodo }) {
  // Define state using the 'useState' hook to manage the editing of a todo item.
  const [edit, setEdit] = useState({
    id: null,  // ID of the todo being edited (null if not in edit mode)
    value: '', // Text value of the todo being edited
  });

  // Define a function 'submitUpdate' to handle the submission of edited todo data.
  const submitUpdate = (value) => {
    // Call the 'updateTodo' function and pass the ID of the todo being edited and the new value.
    updateTodo(edit.id, value);

    // Reset the 'edit' state to exit edit mode.
    setEdit({
      id: null,
      value: '',
    });
  };

  // Check if an edit is in progress. If so, render the 'TodoForm' component for editing.
  if (edit.id) {
    return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  }

  // If not in edit mode, map through the 'todos' array and render each todo item.
  return todos.map((todo, index) => (
    <div className={todo.isComplete ? 'todo-row complete' : 'todo-row'} key={index}>
      <div key={todo.id} onClick={() => completeTodo(todo.id)}>
        {todo.text}
      </div>

      <div className="icons">
        {/* Render a delete icon that calls the 'removeTodo' function when clicked. */}
        <RiCloseCircleLine
          onClick={() => removeTodo(todo.id)}
          className="delete-icon"
        />

        {/* Render an edit icon that sets the 'edit' state for the selected todo when clicked. */}
        <TiEdit
          onClick={() => setEdit({ id: todo.id, value: todo.text })}
          className="edit-icon"
        />
      </div>
    </div>
  ));
}

export default Todo;
