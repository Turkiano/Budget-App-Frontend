import { useState } from 'react';
import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const [tasks, setTasks] = useState(['task01', 'task02', 'task03']);
  const [userInput, setUserInput] = useState("");

  const handleAddTask = () => {
    const newTask = [...tasks, userInput];
    setTasks(newTask);
  };

  const handelChange = (e) => {
    const UserValue = e.target.value;
    setUserInput(UserValue);
  };

  //Return DOM using Jsx elements
  return (
    <div className="App">
      <input type="text" placeholder="Add a new task" onChange={handelChange} />
      <button onClick={handleAddTask}>Add</button>
      <ul>
        {tasks.map((task) => {
          return <TodoItem title={task} key={task} />;
        })}
      </ul>
    </div>
  );
}

export default App;
