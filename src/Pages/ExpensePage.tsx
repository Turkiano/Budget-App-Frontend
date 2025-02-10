import { useContext } from "react"
import { BudgetContext } from "../Components/Router";

export function ExpensePage(){
    const context = useContext(BudgetContext)
    console.log("Context: ", context);
    
    return(
        <p>Expense</p>
    )

}