import { useContext } from "react"
import { BudgetContext } from "../Components/Router";

export function ExpensePage(){
    const context = useContext(BudgetContext)
    console.log("Context: ", context);
    
    return(
       <div>
         <p>Expense</p>
         <div>
            <ul>{context?.state.expenses.map(exp =>(
                <>
                <li>{exp.source}</li>
                <li>{exp.amount}</li>
                <li>{exp.date}</li>
                </>


            ))}
            </ul>
         </div>
       </div>
    )

}