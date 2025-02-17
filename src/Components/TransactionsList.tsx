import { AllTranscationTypes } from "../App"
import { ListItems } from "./ListItems";

type TransactionsListProps = {
    items: AllTranscationTypes[];
    handleDelete: (id: string, type: "income" | "expense") => void;
}

export function TransactionList( {items, handleDelete}: TransactionsListProps)  {

    return (
        <div>
      <h3>All Transactions</h3>
      <ListItems 
        items={items} 
        handleDelete={(id) => {
          const itemType = items.find(item => item.id === id)?.type.toLowerCase();
          if (itemType) handleDelete(id, itemType as "income" | "expense");
        }} 
      />
    </div>
    )

}