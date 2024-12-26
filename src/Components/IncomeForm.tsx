import { Button } from "./Button";

export function IncomeForm({handelChangeSource, handelSubmit, handelChangeAmount}){




    return (
        <form onSubmit={handelSubmit}>
            <div>
            <label htmlFor="source">Income Source</label>
            <input type="text" id= "source" name="source" placeholder="Source name" onChange={handelChangeSource}/>
            </div>

            <div>
            <label htmlFor="Amount">Income Amount</label>
            <input type="text" id= "Amount" name="amount" placeholder="SAR 0.00" onChange={handelChangeAmount}/>
            </div>

            <div>
            <label htmlFor="date">Income Date</label>
            <input type="date" id= "date" name="date" title="date"/>
            </div>
            <Button label="Add Income" />

        </form>
    )
}




