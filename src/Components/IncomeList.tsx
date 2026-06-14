import { ListItems } from "./ListItems";
import { AllTranscationTypes } from "../App";

type IncomeListProps = {
  incomes: AllTranscationTypes[];
  handleDelete: (id: string) => void;
};

export function IncomeList({ incomes, handleDelete }: IncomeListProps) {
 return (
  <div className="list-container">
    <h3 className="form-title">Income Transactions</h3>

    <ListItems
      items={incomes}
      handleDelete={handleDelete}
    />
  </div>
);
}
