import { ChangeEvent, FormEvent } from 'react';

type Input = {
  name: string;
  id: string;
  placeholder: string;
};

type IncomeFormProps = {
  handelChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handelSubmit: (e: FormEvent) => void;
  handelChangeDate: (e: { target: Date }) => void;
  inputs: Input[];
};

export function IncomeForm({
  handelChange,
  handelSubmit,
  handelChangeDate,
  inputs,
}: IncomeFormProps) {
  return (
    <form onSubmit={handelSubmit}>
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>{input.placeholder}</label>
          <input
            type={input.name === "amount" ? "number" : "text"} // Use "number" for amount
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={handelChange}
          />
        </div>
      ))}
      <div>
        <label htmlFor="date">Income Date</label>
        <input
          type="date"
          id="date"
          name="date"
          title="date"
          onChange={handelChangeDate}
        />
      </div>
      <button type="submit">Add Income</button>
    </form>
  );
}
