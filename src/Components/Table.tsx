import { useContext } from "react"
import { BudgetContext } from "./Router"

export function Table(){

    const context = useContext(BudgetContext)
    if (!context) throw Error("Budget Context should be provided");

    const incomes = context.state.incomes;

    return (
        <>
    
   <h1>Income Table</h1>
   <table border = '1'>
    <thead> 
        <tr>
            {incomes.length > 0 &&
            object.keys (incomes[0]).map((key)=>(
                <th key = {incomes.id}></th>

            ))}
        </tr>
    </thead>



    <tbody>
        {incomes.map((row, index)=>(
            <tr key={index}>
                {object.values(row).map((value, i)=>(
                    <td key = {i}>{value}</td>
                ))}
            </tr>
        ))}
    </tbody>

   </table>
                </>
          
        )
}