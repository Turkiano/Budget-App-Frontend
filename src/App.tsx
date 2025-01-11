import { useState } from 'react';
import './App.css';
import { Expense, ExpenseWrapper } from './Components/ExpenseWrapper';
import { Income, IncomeWrapper } from './Components/IncomeWrapper';

function App() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  
//way 01 Using [Income]
let totalIncome = 0
incomes.forEach((income) => {
  totalIncome += income.amount
})

//way 02 Using [Expense]
const totalExpense = expenses.reduce((acc, curr) =>{
  return acc + curr.amount
}, 0)
// to get the balance
const balance = totalIncome - totalExpense
console.log("Balance is: ", balance);

  return (
    <div className="App">
      <h1>Budget App</h1>
      <IncomeWrapper incomes = {incomes} setIncomes = {setIncomes}/>
      <ExpenseWrapper expenses = {expenses} setExpenses = {setExpenses} />
    </div>
  );
}

export default App;
