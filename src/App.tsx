import  { useState } from "react";

const TodoApp = () => {
  //01. store your list of to-do items in state structure
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", isEditing: false },
    { id: 2, text: "Build a Todo App", isEditing: false },
  ]);
//2. Set Up Initial State
  const [editText, setEditText] = useState("");

  // Function to enable editing mode
  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, isEditing: true }
        : { ...todo, isEditing: false } // Only one todo should be editable at a time
    );
    const currentTodo = todos.find((todo) => todo.id === id);
    setEditText(currentTodo.text); // Set current text for editing
    setTodos(updatedTodos);
  };

  // Function to save the edited text

  const saveTodo = (id) => {
    //1. Mapping Over Todos
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editText, isEditing: false } : todo
    );

    //2. Updating the Todos State
    setTodos(updatedTodos);
    //3. Clearing the input for next Edit Text
    setEditText(""); 
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={() => saveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <button onClick={() => editTodo(todo.id)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
