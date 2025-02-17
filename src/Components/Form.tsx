import { ChangeEvent, FormEvent,  } from 'react';

import { Button } from './Button';

type Input = {
  name: string;
  id: string;
  placeholder: string;
};


type FormProps = {
  register: any
  onSubmit: (data: any) => void;
  handleSubmit: (callback: (data: any) => void) => (event: FormEvent<HTMLFormElement>) => void;
  handleChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  inputs: Input[];
  buttonLabel: string;
  titleLabel: string;
};

export function Form({
  register,
  onSubmit,
  handleSubmit,
  handleChangeDate,
  inputs,
  buttonLabel,
  titleLabel,
}: FormProps) {
  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <h2>{titleLabel}</h2>
      {inputs.map((input) => (
        <div key={input.id}>
         
          {/* <label htmlFor={input.id}>{input.placeholder}</label> */}
          <input
            type={input.name === "amount" ? "number" : "text"} // Use "number" for amount
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            {...register(input.name)}
          />
        </div>
      ))}
      <div>
       
        {/* <label htmlFor="date">Income Date</label> */}
        <input
          type="date"
          id="date"
          name="date"
          title="date"
          onChange={handleChangeDate}
          {...register("date")}
          />
        
      </div>
      <Button label={buttonLabel} /> {/* Dynamic button label */}
    </form>
  );
}
