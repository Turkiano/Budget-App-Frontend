import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createContext, useState } from 'react';

import { About } from '../Pages/About';
import { IncomePage } from '../Pages/IncomePage';
import { ExpensePage } from '../Pages/ExpensePage';
import App, { AllTranscationTypes } from '../App';

export type BudgetContextState = {
  expenses: AllTranscationTypes[];
  incomes: AllTranscationTypes [];
};


export type BudgetContextValue = {
  state: BudgetContextState
  setState: (key: BudgetContextState) => void
}


export const BudgetContext = createContext<BudgetContextValue | null> (null);

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
    element: <IncomePage />,
  },
  {
    path: '/expense/',
    element: <ExpensePage />,
  },
]);

export function Router() {
  const [state, setState] = useState<BudgetContextState>({
    expenses: [],
    incomes: []
  });

 

  return (
    <BudgetContext.Provider value={{ state, setState }}>
      <RouterProvider router={router} />
    </BudgetContext.Provider>
  );
}

