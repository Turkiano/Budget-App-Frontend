import { Expense } from "./ExpenseWrapper";
import { Income } from "./IncomeWrapper";


type ListItemProps = {

    items: Income[] | Expense []
}


export function ListItems ({items}: ListItemProps){
    return(
        <ul className="details">
        {items.map((item) => {
          return (
            <li className="detail-item" key={item.id}>
              <span className="item-source">{item.source} </span>
              <span className="item-amount">SAR {item.amount}</span>
              <span className="item-date">{item.date}</span>
            </li>
          );
        })}
      </ul>
    )
}