import './App.css';
import { ExpenseWrapper } from './Components/ExpenseWrapper';
import { IncomeWrapper } from './Components/IncomeWrapper';

function App() {
  return (
    <div className="App">
      <h1>Budget App</h1>
      <IncomeWrapper />
      <ExpenseWrapper />
    </div>
  );
}

export default App;
