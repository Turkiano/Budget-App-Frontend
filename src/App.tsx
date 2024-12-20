import { useState } from 'react';
import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Learn React', isEditing: false },
    { id: 2, title: 'Build a Todo App', isEditing: false },
  ]);
  const [userInput, setUserInput] = useState('');

  const AddTask = (e) => {
    e.preventDefault();
    //validation for preventing empty tasks
    if (userInput.trim() === '') {
      alert('Task title cannot be empty');
      return;
    }

    //each task should be an object with properties like id, title, and isEditing
    const newTask = {
      id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1, // Generate a new unique id
      title: userInput.trim(), // Use the trimmed user input as the title
      isEditing: false, // Default `isEditing` to false
    };

    setTasks([...tasks, newTask]); // Add the new task to the main tasks array
    setUserInput(''); // Clear the input field after adding the new task
  };

  const handleChange = (e) => {
    const UserValue = e.target.value;
    setUserInput(UserValue);
  };

  const handleRemove = (item) => {
    setTasks(tasks.filter((task) => task !== item));
  };

  const handleUpdate = (item) => {
    setTasks(tasks.filter((task) => task !== item));
  };
  //Return DOM using Jsx elements
  return (
    <div className="App">
      <form onSubmit={AddTask}>
        <input
          type="text"
          placeholder="Add a new task"
          onChange={handleChange}
          value={userInput} //to ensure the input field is controlled and syncs with the userInput state.
        />
        <button type="submit">Add</button>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <TodoItem title={task.title} />
              <button type="button" onClick={handleUpdate}>
                Update
              </button>
              <button type="button" onClick={() => handleRemove(task)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </form>
    </div>
  );
}

export default App;
