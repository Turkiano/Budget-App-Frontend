import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import { About } from './Pages/About.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/about',
    element: <About/>
  },
]);
createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
