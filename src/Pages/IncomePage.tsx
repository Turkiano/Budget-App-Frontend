import { useParams } from 'react-router-dom';

const incomes = [
  {
    id: 1,
    source: 'Salary',
  },
  {
    id: 2,
    source: 'Business',
  },
  {
    id: 3,
    source: 'A friend',
  },
];

export function Income() {
  const params = useParams();
  console.log(params);
  
  const income = incomes.find(
    (income) => income.id === Number(params.incomeId),
  )
  if (!income) { //this is the validationn
    return(
      <div>
         <h1>Income Not found</h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Income Page</h1>
      <h3>{income.source}</h3>
      <p>This is the income source of the id {income.id}</p>
    </div>
  );
}
