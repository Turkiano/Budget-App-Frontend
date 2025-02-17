import { ListItems } from "./ListItems";
import { AllTranscationTypes } from "../App";

type ExpenseListProps = {
  expenses: AllTranscationTypes[];
  handleDelete: (id: string) => void;
};

export function ExpenseList({ expenses, handleDelete }: ExpenseListProps) {
  return (
    <div>
      <h3>Expense Transactions</h3>
      <ListItems items={expenses} handleDelete={handleDelete} />
    </div>
  );
}
