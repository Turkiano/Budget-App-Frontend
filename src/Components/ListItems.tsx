import { AllTranscationTypes } from "../App";



type ListItemProps = {

    items: AllTranscationTypes []
    handleDelete: (key: string)=> void
}


export function ListItems ({items, handleDelete}: ListItemProps){
    return(
        <ul className="details">
        {items.map((item) => {
          if (!item.id) {
            console.warn("Missing ID for item:", item);
          }
          return (
            <li className="detail-item" key={item.id}>
              <span className="item-source">{item.source} </span>
              <span className="item-amount">SAR {item.amount}</span>
              <span className="item-date">{item.date}</span>
              <button onClick={()=>handleDelete(item.id)}>Delete</button>
            </li>
          );
        })}
      </ul>
    )
}


