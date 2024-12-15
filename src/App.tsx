import { useState } from 'react';
import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const tasks = ['task01', 'task02', 'task03'];
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1);
  };
  //Return DOM using Jsx elements
  return (
    <div className="App">
      <h3>{counter}</h3> 
      <ul>
        {tasks.map((task) => {
          return <TodoItem title={task} />;
        })}
        <button onClick={handleIncrement}>Add</button> 
      </ul>
    </div>
  );
}

export default App;
