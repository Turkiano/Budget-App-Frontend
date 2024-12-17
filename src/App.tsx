import { useState } from 'react';
import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const [tasks, setTasks] = useState(['task01', 'task02', 'task03']);
  const [userInput, setUserInput] = useState('');

  const AddTask = (e) => {
    e.preventDefault();

    const newTask = [...tasks, userInput];
    setTasks(newTask);
  };

  const handelChange = (e) => {
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
          onChange={handelChange}
        />
        <button type="submit">Add</button>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
               <TodoItem title={task} key={task} />
               <button type='button' onClick={handleUpdate}>Update</button>
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
