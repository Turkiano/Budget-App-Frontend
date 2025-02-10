import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

import { ExpenseTypes } from './ExpenseWrapper';

import { About } from '../Pages/About';
import { Income } from '../Pages/IncomePage';
import { ExpensePage } from '../Pages/ExpensePage';
import App from '../App';

type BudgetState = {
  expenses: ExpenseTypes[];
};




export const BudgetContext = createContext<
  { state: BudgetState; setState: React.Dispatch<React.SetStateAction<BudgetState>> } | null
>(null);

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
    path: '/income/',
    element: <Income />,
  },
  {
    path: '/expense/',
    element: <ExpensePage />,
  },
]);

export function Router() {
  const [state, setState] = useState<BudgetState>({
    expenses: [],
  });

 

  return (
    <BudgetContext.Provider value={{ state, setState }}>
      <RouterProvider router={router} />
    </BudgetContext.Provider>
  );
}

