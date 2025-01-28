import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

import { ExpenseTypes } from './ExpenseWrapper';
import { IncomeTypes } from './IncomeWrapper';

import { About } from '../Pages/About';
import { Income } from '../Pages/IncomePage';
import App from '../App';

//declare the data type later
export const BudgetContext = createContext<any>(null);
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/income/:incomeId',
    element: <Income />,
  },
]);

export function Router() {
  
  const [incomes, setIncomes] = useState<IncomeTypes[]>([]);
  const [expenses, setExpenses] = useState<ExpenseTypes[]>([]);

  const [state, setState] = useState({
    incomes,
    expenses
  });
  return (
    <BudgetContext.Provider value={{state, setIncomes, setExpenses}}>
      <RouterProvider router={router} />
    </BudgetContext.Provider>
  );
}
