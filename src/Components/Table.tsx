import { IncomeWrapperProps } from './IncomeWrapper';
import { ExpenseWrapperProps } from './ExpenseWrapper'; //01. Import two packages/Props
import { AllTranscationTypes } from '../App';

//02. Declare a new prop
type TableProps = {
  incomes?: IncomeWrapperProps['incomes'];
  expenses?: ExpenseWrapperProps['expenses'];
  AllTransctions?: AllTranscationTypes[];
};

//03. Pass multiple parameters using the prop
export function Table({
  incomes = [],
  expenses = [],
  AllTransctions = [],
}: TableProps) {
  return (
    <>
      {incomes.length > 0 && (
        <>
          <h2 className="form-title">Income Table</h2>

          <div className="table-container">
            <table className="app-table">
              <thead>
                <tr>
                  {Object.keys(incomes[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {incomes.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {expenses.length > 0 && (
        <>
          <h2 className="form-title">Expense Table</h2>

          <div className="table-container">
            <table className="app-table">
              <thead>
                <tr>
                  {Object.keys(expenses[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {expenses.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {AllTransctions.length > 0 && (
        <>
          <h2 className="form-title">All Transactions Table</h2>

          <div className="table-container">
            <table className="app-table">
              <thead>
                <tr>
                  {Object.keys(AllTransctions[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {AllTransctions.map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
}
