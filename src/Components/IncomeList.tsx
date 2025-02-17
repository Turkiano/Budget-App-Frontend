import { ListItems } from "./ListItems";
import { AllTranscationTypes } from "../App";

type IncomeListProps = {
  incomes: AllTranscationTypes[];
  handleDelete: (id: string) => void;
};

export function IncomeList({ incomes, handleDelete }: IncomeListProps) {
  return (
    <div>
      <h3>Income Transactions</h3>
      <ListItems items={incomes} handleDelete={handleDelete} />
    </div>
  );
}
