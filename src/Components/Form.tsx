import { useState } from 'react';

import type {
  FieldPathValue,
  FieldValues,
  Path,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { FaTrashAlt, FaEdit, FaPlus } from 'react-icons/fa';

import { Button } from './Button';



type InputField<T extends FieldValues> = {
  type: 'input';
  name: Path<T>;
  id: string;
  placeholder: string;
  inputType?: string;
};

type SelectField<T extends FieldValues> = {
  type: 'select';
  name: Path<T>;
  id: string;
  label: string;
  options: string[];
};

type DateField<T extends FieldValues> = {
  type: 'date';
  name: Path<T>;
  id: string;
  label?: string;
};

type FormField<T extends FieldValues> =
  | InputField<T>
  | SelectField<T>
  | DateField<T>;

type FormProps<T extends FieldValues> = {
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  watch?: UseFormWatch<T>;
  onSubmit: SubmitHandler<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  fields: FormField<T>[];
  buttonLabel: string;
  titleLabel: string;
  onDeleteOption?: (fieldName: string, option: string) => void;
  onEditOptions?: (fieldName: string) => void;
};

export function Form<T extends FieldValues>({
  register,
  setValue,
  watch,
  onSubmit,
  handleSubmit,
  fields,
  buttonLabel,
  titleLabel,
  onDeleteOption,
  onEditOptions,
}: FormProps<T>) {
  function DropdownField({ field }: { field: SelectField<T> }) {
    const [isOpen, setIsOpen] = useState(false);

    const selectedValue =
      (watch?.(field.name) as string) ?? field.options?.[0] ?? '';

    const handleSelect = (option: string) => {
      setValue?.(
        field.name,
        option as unknown as FieldPathValue<T, typeof field.name>,
      );
      setIsOpen(false);
    };

    return (
      <div key={field.id} className="relative space-y-2">
        <label htmlFor={field.id} className="form-label">
          {field.label}
        </label>

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="form-select"
        >
          <span className="inline-flex w-full items-center justify-between">
            <span>{selectedValue || 'Select an option'}</span>
            <span>▾</span>
          </span>
        </button>

        <input type="hidden" {...register(field.name)} />

        <div
          className={`dropdown-menu transition-all duration-150 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="max-h-64 overflow-y-auto">
            {(field.options ?? []).map((option) => (
              <div key={option} className="dropdown-item">
                <button
                  type="button"
                  onClick={() => handleSelect(option)}
                  className="text-left"
                >
                  {option}
                </button>

                {onDeleteOption || onEditOptions ? (
                  <div className="flex items-center gap-2">
                    {onEditOptions ? (
                      <button
                        type="button"
                        onClick={() => onEditOptions(field.name as string)}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm transition-colors hover:bg-blue-500"
                        aria-label={`Edit ${option}`}
                        title="Edit"
                      >
                        <FaEdit size={18} />
                      </button>
                    ) : null}

                    {onDeleteOption ? (
                      <button
                        type="button"
                        onClick={() =>
                          onDeleteOption(field.name as string, option)
                        }
                        className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shadow-sm transition-colors hover:bg-red-500"
                        aria-label={`Delete ${option}`}
                        title="Delete"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {onEditOptions ? (
            <div className="border-t border-slate-800 p-3">
              <button
                type="button"
                onClick={() => onEditOptions(field.name as string)}
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-700 px-3 py-2 text-sm font-medium text-slate-100 transition hover:bg-slate-600"
              >
                <FaPlus className="h-5 w-5" />
                Add New
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-left">
      <h2 className="form-title">{titleLabel}</h2>

      {fields.map((field) => {
        if (field.type === 'date') {
          return (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="form-label">
                {field.label || 'Date'}
              </label>

              <input
                type="date"
                id={field.id}
                {...register(field.name)}
                className="form-input"
              />
            </div>
          );
        }

        if (field.type === 'select') {
          if (onDeleteOption || onEditOptions) {
            return <DropdownField key={field.id} field={field} />;
          }

          return (
            <div key={field.id} className="space-y-2">
              <label htmlFor={field.id} className="form-label">
                {field.label}
              </label>

              <select
                id={field.id}
                {...register(field.name)}
                className="form-select-native"
              >
                {(field.options ?? []).map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        return (
          <div key={field.id} className="space-y-2">
            <input
              type={
                field.inputType ?? (field.name === 'amount' ? 'number' : 'text')
              }
              id={field.id}
              placeholder={field.placeholder}
              {...register(field.name)}
              className="form-input"
            />
          </div>
        );
      })}

      <Button label={buttonLabel} />
    </form>
  );
}
