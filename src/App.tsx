import './App.css';
import { TodoItem } from './TodoItem';

function App() {
  const tasks = ["task01", "task02", "task03"]

  //Return DOM using Jsx elements
  return (
    
      <div className='App'>
        <ul>
        {tasks.map((task) =>{
          return <TodoItem title= {task} />
        })}

        </ul>
      </div>
    
  );
}

export default App;
