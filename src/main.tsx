import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { About } from './Pages/About.tsx';
import { Income } from './Pages/Income.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About/>
  },
  {
    path: '/income/:incomeId',
    element: <Income/>
  },
]);
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
