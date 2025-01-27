import { createBrowserRouter, RouterProvider } from "react-router-dom";
import  {createContext, useContext} from 'react'
import App from "../App";
import { About } from "../Pages/About";
import { Income } from "../Pages/Income";


const BudgetContext = createContext<null || string>(null)
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

  export function Router(){
    console.log("======Global Router=====");
    
    return(
        <BudgetContext.Provider value = 'Dark'>
            
        <RouterProvider router={router}/>
        </BudgetContext.Provider>
    ) 
  }