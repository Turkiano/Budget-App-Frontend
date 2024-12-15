import { useState } from 'react';
import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const [tasks, setTasks] = useState(['task01', 'task02', 'task03']);

  const handleAddTask = () => {
    const task = 'hit the gym';
    const newTask = [...tasks, task];
    setTasks(newTask);
  };
  //Return DOM using Jsx elements
  return (
    <div className="App">
      <ul>
        {tasks.map((task) => {
          return <TodoItem title={task} key={task} />;
        })}
      </ul>
        <button onClick={handleAddTask}>Add</button>
    </div>
  );
}

export default App;
