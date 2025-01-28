import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

import { ExpenseTypes } from './ExpenseWrapper';
import { IncomeTypes } from './IncomeWrapper';

import { About } from '../Pages/About';
import { Income } from '../Pages/IncomePage';
import App from '../App';


export const BudgetContext = createContext<null | string>(null);
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
  const [state, setState] = useState();

  const [incomes, setIncomes] = useState<IncomeTypes[]>([]);
  const [expenses, setExpenses] = useState<ExpenseTypes[]>([]);
  return (
    <BudgetContext.Provider value="Dark">
      <RouterProvider router={router} />
    </BudgetContext.Provider>
  );
}
