import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import './App.css';
import { BudgetContext } from './Components/Router';
import { NavigationMenu } from './Components/NavigationMenu';
import { IncomeWrapper } from './Components/IncomeWrapper';
import { ExpenseWrapper } from './Components/ExpenseWrapper';
import { SavingWrapper } from './Components/SavingWrapper';
import { IncomeList } from './Components/IncomeList';
import { ExpenseList } from './Components/ExpenseList';
import { TransferAccountWrapper } from './Components/TransferAccountWrapper';
import { Table } from './Components/Table';
import { UUID } from 'crypto';


export type AllTranscationTypes = {
  id: UUID;
  source: string;
  amount: number;
  date: string;
  type: 'Income' | 'Expense';
};

function App() {
  
  const context = useContext(BudgetContext);
  // console.log('context: ', context);

  if (!context) throw Error('Budget Context should be provided');
  const incomes = context.state.incomes;
  const expenses = context.state.expenses;

  const AllTranscations = [...incomes, ...expenses];
  console.log('AllTranscations: ', AllTranscations);

  const setState = context.setState;
  // const [incomes, setIncomes] = useState<IncomeTypes[]>([]);
  // const [expenses, setExpenses] = useState<ExpenseTypes[]>([]);
  const [savingsTarget, setSavingsTarget] = useState(0);
  const [savingAccount, setSavingAccount] = useState(0);
  const [currentSaving, setCurrentSaving] = useState(0);
  const [transferError, setTransferError] = useState('');
  const [searchBy, setSearchBy] = useState('');

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
  const balance = totalIncome - totalExpense - currentSaving;

  const handleDeleteItems = (id: string, type: 'income' | 'expense') => {
    if (type === 'income') {
      const updateIncomes = incomes.filter((income) => income.id !== id);
      setState({
        ...context.state,
        incomes: updateIncomes,
      });
    } else if (type === 'expense') {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      setState({
        ...context.state,
        expenses: updatedExpenses,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    //to force users to enter a valid amount
    if (isNaN(savingAccount) || savingAccount <= 0) {
      setTransferError('Please enter a valid amount to transfer.');
      return;
    }

    console.log('Balance is: ', balance);

    //validation for transferring data
    if (savingAccount <= balance) {
      //implict return (callBack) function
      setCurrentSaving((prev) => prev + savingAccount);
      setTransferError(''); // Clear error on success
      setSavingAccount(0); // Reset only on success
    } else {
      setTransferError('Not enough creadit on your balance!!');
    }
  };
  console.log('current Account: ', currentSaving);

  const progress = (currentSaving / savingsTarget) * 100 || 0;

  const handleSortArray = (items: AllTranscationTypes[]) => {
    const sorted = items.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    console.log(sorted);

    return sorted;
  };

  const sortedAllTranscations = handleSortArray(AllTranscations);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBy(e.target.value); //to capture the value
  };

  const handleSearchBySource = (items: AllTranscationTypes[]) => {
    const filtered = items.filter((transcation) => {
      return transcation.source.startsWith(searchBy);
    });
    return filtered;
  };

  const filteredTranscations = handleSearchBySource(sortedAllTranscations);

  return (
    <>
    <NavigationMenu />
      <div className="grid-container w-full">
        <div className="header">
          <h1>Budget App</h1>
          {/* <Link to="/income">Income</Link>
          <Link to="/expense">Expenses</Link> */}
        </div>

        <div className="card-box">
          <div className="income">
            <IncomeWrapper
              incomes={incomes}
              setState={setState}
              handleDelete={(id) => handleDeleteItems(id, 'income')}
            />
          </div>

          <div className="expense">
            <ExpenseWrapper
              expenses={expenses}
              setState={setState}
              handleDelete={(id) => handleDeleteItems(id, 'expense')}
            />
          </div>

          <div className="saving">
            <SavingWrapper
              setSavingsTarget={setSavingsTarget}
              currentSaving={currentSaving}
              savingsTarget={savingsTarget}
              progress={progress}
            ></SavingWrapper>
          </div>
        </div>
        <div className="incomeList">
          <IncomeList
            incomes={incomes.filter((income) =>
              income.source.startsWith(searchBy),
            )}
            handleDelete={(id) => handleDeleteItems(id, 'income')}
          />
        </div>

        <div className="ExpenseList">
          <ExpenseList
            expenses={expenses.filter((expense) =>
              expense.source.startsWith(searchBy),
            )}
            handleDelete={(id) => handleDeleteItems(id, 'expense')}
          />
        </div>

        <div className="transfer">
          <h3>Balance: SAR {balance}</h3>
          {transferError && <p className="error">{transferError}</p>}

          <TransferAccountWrapper
            setSavingAccount={setSavingAccount}
            handleSubmit={handleSubmit}
            savingAccount={savingAccount}
          />
        </div>

        <div className="transcation">
          <input
            type="search"
            id="searchBy"
            name="searchBy"
            placeholder="Search by Source"
            onChange={handleChange}
          />
          <Table AllTransctions={filteredTranscations} />
        </div>
      </div>
    </>
  );
}

export default App;
