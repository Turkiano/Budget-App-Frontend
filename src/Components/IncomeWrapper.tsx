
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import '../Styling/IncomeWrapper.css';
import { ListItems } from './ListItems';
import { Form } from './Form';
import { BudgetContextState } from './Router';
import { AllTranscationTypes } from '../App';

const IncomeSchema = z.object({
  source: z.string().min(3),
  amount: z.string().min(1),
  date: z.string(),
});

export type IncomeSchemaType = z.infer<typeof IncomeSchema>;

export type titleLable = {
  label: string;
};



const INCOME_INPUTS = [
  {
    name: 'source',
    id: 'source',
    placeholder: 'Income source ',
  },
  {
    name: 'amount',
    id: 'amount',
    placeholder: 'Income amount ',
  },
];

export type IncomeWrapperProps = {
  incomes: AllTranscationTypes[];
  setState: (key: BudgetContextState[]) => void;
  handleDelete: (key: string) => void;
};

export function IncomeWrapper({
  incomes,
  setState,
  handleDelete, 
}: IncomeWrapperProps) {
  



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncomeSchemaType>({ resolver: zodResolver(IncomeSchema) });
  console.log('Errors: ', errors);

  const onSubmit = (data: AllTranscationTypes) => {
    const newIncome: AllTranscationTypes = {
      id: crypto.randomUUID(), // Ensure a unique ID
      source: data.source,
      amount: Number(data.amount),
      date: data.date,
      
    };

    const withType = {
      ...newIncome,
      type: "Income"
    }

    setState((prevData) =>{

      return {
          ...prevData,
      incomes: [...prevData.incomes, withType]

      }
    
    }); // to up)date the income state
  };

  return (
    <>
     

     <Form  
      handleChangeDate={()=>null}
      register={register}
      handleSubmit={handleSubmit}
      inputs={INCOME_INPUTS}
      onSubmit={onSubmit}
      buttonLabel='Add Income'
      titleLabel = "Income Input"
      />
      {errors.source && <span className='errors'> Source: {errors.source.message}</span>}
            {errors.amount && <span className='errors'>Amount: {errors.amount.message}</span>}
    </>
  );
}
