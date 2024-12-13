import './App.css';
import { TodoItem } from './TodoItem';
export {TodoItem} from "./TodoItem"

function App() {
  const tasks = [""]
  return (
    
      <div className='App'>
        <ul>
        {tasks.map(() =>{
          return (
            <TodoItem></TodoItem>
          )
        })}

        </ul>
      </div>
    
  );
}

export default App;
