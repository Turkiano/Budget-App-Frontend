import { ChangeEvent, FormEvent } from 'react';
import type {
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from 'react-hook-form';

import { Button } from './Button';

type Input<T extends FieldValues> = {
  name: Path<T>;
  id: string;
  placeholder: string;
};

type SelectInput<T extends FieldValues> = {
  name: Path<T>;
  id: string;
  label: string;
  options: string[];
};

type FormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  handleChangeDate: (e: ChangeEvent<HTMLInputElement>) => void;
  inputs: Input<T>[];
  selects?: SelectInput<T>[];
  buttonLabel: string;
  titleLabel: string;
};

export function Form<T extends FieldValues>({
  register,
  onSubmit,
  handleSubmit,
  handleChangeDate,
  inputs,
  selects,
  buttonLabel,
  titleLabel,
}: FormProps<T>) {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <h2 className="text-xl font-semibold text-white">{titleLabel}</h2>
      {inputs.map((input) => (
        <div key={input.id} className="space-y-2">
          <input
            type={input.name === 'amount' ? 'number' : 'text'}
            id={input.id}
            name={input.name}
            placeholder={input.placeholder}
            {...register(input.name)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          />
        </div>
      ))}
      {selects?.map((select) => (
        <div key={select.id} className="space-y-2">
          <label
            htmlFor={select.id}
            className="block text-sm font-medium text-slate-300"
          >
            {select.label}
          </label>
          <select
            id={select.id}
            {...register(select.name)}
            className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
          >
            {select.options.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-slate-950 text-slate-100"
              >
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
      <div className="space-y-2">
        <input
          type="date"
          id="date"
          name="date"
          title="date"
          onChange={handleChangeDate}
          {...register('date')}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </div>
      <Button label={buttonLabel} />
    </form>
  );
}
