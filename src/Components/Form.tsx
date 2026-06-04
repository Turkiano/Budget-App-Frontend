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
