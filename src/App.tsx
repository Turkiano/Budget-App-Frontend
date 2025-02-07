import { FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import { SavingWrapper } from './Components/SavingWrapper';
import { BudgetContext } from './Components/Router';
import { ExpenseWrapper } from './Components/ExpenseWrapper';
import { IncomeTypes, IncomeWrapper } from './Components/IncomeWrapper';
import { TransferAccountWrapper } from './Components/TransferAccountWrapper';



function App() {
  const context = useContext(BudgetContext);
  console.log("context: ", context);
  
  const expenses = context?.state.expenses
  const setState = context?.setState;
  const [incomes, setIncomes] = useState<IncomeTypes[]>([]);
  // const [expenses, setExpenses] = useState<ExpenseTypes[]>([]);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [savingAccount, setSavingAccount] = useState(0);
  const [currentSaving, setCurrentSaving] = useState(0);
  const  [transferError, setTransferError] = useState('');

  console.log('Saving Target: ', savingsTarget);

  // console.log('Saving Account: ', savingAccount);


    //way 01: Using [Income] to get the total
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome += income.amount;
    });
  
    //way 02: Using [Expense]  to get the total
    const totalExpense = expenses.reduce((acc, curr) => {
      return acc + curr.amount;
    }, 0);
    // to get the balance
    const balance = totalIncome - totalExpense - currentSaving
  
    



  const handleDeleteItems = (id: string, type: 'income' | 'expense') => {
    if (type === 'income') {
      const updateIncomes = incomes.filter((income) => income.id !== id);
      setIncomes(updateIncomes);
    } else if (type === 'expense') {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setState(updatedExpenses);
    }
  };

  const handleSubmit = (e: FormEvent) =>{
    e.preventDefault()

    //to force users to enter a valid amount
    if (isNaN(savingAccount) || savingAccount <= 0) {
      setTransferError("Please enter a valid amount to transfer.");
      return;
    }

    console.log('Balance is: ', balance);
    
    //validation for transferring data
    if(savingAccount<=balance){
      
      //implict return (callBack) function
      setCurrentSaving((prev) => prev + savingAccount);
      setTransferError(''); // Clear error on success
      setSavingAccount(0)// Reset only on success
      
    } else {
      setTransferError("Not enough creadit on your balance!!");
      
    }
    
  }
  console.log("current Account: ", currentSaving);

const progress = (currentSaving / savingsTarget) * 100 || 0

  return (
    <div className="App">
      <h1>Budget App</h1>
      <Link to="/income/1">Income</Link>

      <IncomeWrapper
        incomes={incomes}
        setIncomes={setIncomes}
        handleDelete={(id) => handleDeleteItems(id, 'income')}
        />
      {/* <ExpenseWrapper
        expenses={expenses}
        setState={setState}
        handleDelete={(id) => handleDeleteItems(id, 'expense')}
        /> */}

      <SavingWrapper setSavingsTarget={setSavingsTarget} currentSaving = {currentSaving} savingsTarget={savingsTarget} progress={progress}></SavingWrapper>
        <h3>Balance: {balance}</h3>
        {transferError && <p className="error">{transferError}</p>}
        <TransferAccountWrapper setSavingAccount={setSavingAccount} handleSubmit = {handleSubmit} savingAccount={savingAccount}/>
    </div>
  );
}

export default App;
