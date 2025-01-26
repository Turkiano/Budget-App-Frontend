import { FormEvent, useState } from 'react';
import './App.css';
import { Expense, ExpenseWrapper } from './Components/ExpenseWrapper';
import { Income, IncomeWrapper } from './Components/IncomeWrapper';
import { Link } from 'react-router-dom';
import { SavingWrapper } from './Components/SavingWrapper';
import { TransferAccountWrapper } from './Components/TransferAccountWrapper';



function App() {
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
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
      setExpenses(updatedExpenses);
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
    console.log("Saving Account: ", savingAccount);

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



  return (
    <div className="App">
      <h1>Budget App</h1>
      <Link to="/income/1">Income</Link>

      <IncomeWrapper
        incomes={incomes}
        setIncomes={setIncomes}
        handleDelete={(id) => handleDeleteItems(id, 'income')}
        />
      <ExpenseWrapper
        expenses={expenses}
        setExpenses={setExpenses}
        handleDelete={(id) => handleDeleteItems(id, 'expense')}
        />

      <SavingWrapper setSavingsTarget={setSavingsTarget} currentSaving = {currentSaving} savingsTarget={savingsTarget}></SavingWrapper>
        <h3>Balance: {balance}</h3>
        {transferError && <p className="error">{transferError}</p>}
        <TransferAccountWrapper setSavingAccount={setSavingAccount} handleSubmit = {handleSubmit} savingAccount={savingAccount}/>
    </div>
  );
}

export default App;
