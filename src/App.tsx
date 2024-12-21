import './App.css';
import { Button } from './Components/Button';
import { Income } from './Components/Income';

function App() {
  

  return (
    <div className="App">
     <h1>Budget App</h1>
     <Income/>
     <Button label="Add Income"/>
   
    </div>
  );
}

export default App;
