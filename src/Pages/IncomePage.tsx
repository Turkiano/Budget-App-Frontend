import { useContext } from 'react';
import { BudgetContext } from '../Components/Router';



export function IncomePage(){
    const context = useContext(BudgetContext)
    console.log("Context: ", context);
    
    return(
       <div>
         <p>Income</p>
         <div>
            <ul>{context?.state.incomes.map(income =>(
                <>
                <li>{income.source}</li>
                <li>{income.amount}</li>
                <li>{income.date}</li>
                </>


            ))}
            </ul>
         </div>
       </div>
    )

}
