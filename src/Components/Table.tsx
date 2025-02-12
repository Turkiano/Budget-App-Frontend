import { IncomeWrapperProps } from "./IncomeWrapper";

export function Table({ incomes }: IncomeWrapperProps) {
    console.log("testing table: ", incomes);
    
    return (
      <>
        <h2>Income Table</h2>
        <table border="1">
          <thead>
            <tr>
              {incomes.length > 0 &&
                Object.keys(incomes[0]).map((key) => (
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
      </>
    );
  }
  