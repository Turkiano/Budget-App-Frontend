type ButtonProps = {
    label: string;
  };


export function Button({ label }: ButtonProps) {
  return (
    <button
      type="submit"
      className="inline-flex w-full items-center justify-center rounded-2xl bg-sky-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
    >
      {label}
    </button>
  );
}