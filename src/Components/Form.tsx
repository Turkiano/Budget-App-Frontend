import { ChangeEvent, FormEvent } from 'react';

type Input = {
  name: string;
  id: string;
  placeholder: string;
};

type FormProps = {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: FormEvent) => void;
  handleChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  inputs: Input[];
};

export function Form({
  handleChange,
  handleSubmit,
  handleChangeDate,
  inputs,
}: FormProps) {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((input) => (
        <div key={input.id}>
          <label htmlFor={input.id}>{input.placeholder}</label>
          <input
            type={input.name === "amount" ? "number" : "text"} // Use "number" for amount
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            onChange={handleChange}
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
          onChange={handleChangeDate}
        />
      </div>
      <button type="submit">Add Income</button>
    </form>
  );
}
