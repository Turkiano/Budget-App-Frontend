import { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', isEditing: false },
    { id: 2, title: 'Build a Todo App', isEditing: false },
  ]);
  const [userInput, setUserInput] = useState('');
  const [editText, setEditText] = useState('');

  const AddTask = (e) => {
    e.preventDefault();
    if (userInput.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }

    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
      title: userInput.trim(),
      isEditing: false,
    };

    setTasks([...tasks, newTask]);
    setUserInput('');
  };

  const handleChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleRemove = (taskToRemove) => {
    setTasks(tasks.filter((task) => task.id !== taskToRemove.id));
  };

  const handleUpdate = (id) => {
    const updatedTodos = tasks.map((task) =>
      task.id === id
        ? { ...task, isEditing: true }
        : { ...task, isEditing: false }
    );

    const currentTask = tasks.find((task) => task.id === id);
    setEditText(currentTask.title);
    setTasks(updatedTodos);
  };

  const saveTodo = (id) => {
    const updatedTodos = tasks.map((task) =>
      task.id === id
        ? { ...task, title: editText.trim(), isEditing: false }
        : task
    );

    setTasks(updatedTodos);
    setEditText('');
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  return (
    <div className="App">
      <form onSubmit={AddTask}>
        <input
          type="text"
          placeholder="Add a new task"
          onChange={handleChange}
          value={userInput}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.isEditing ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={handleEditChange}
                />
                <button onClick={() => saveTodo(task.id)}>Save</button>
              </>
            ) : (
              <>
                <span>{task.title}</span>
                <button onClick={() => handleUpdate(task.id)}>Update</button>
              </>
            )}
            <button onClick={() => handleRemove(task)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
