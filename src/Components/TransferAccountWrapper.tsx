import { ChangeEvent } from 'react';

type SavingAccountProps = {
  setSavingAccount: (key: number) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

export function TransferAccountWrapper({
  setSavingAccount,
}: SavingAccountProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    setSavingAccount(valueAsNumber);
  };

  return (
    <div>
      <p>Transfer to saving account</p>
      <form>
        <input
          type="number"
          id="target"
          name="target"
          title="Target"
          placeholder="SAR 00.0"
          onChange={handleChange}
        />
        <button type="button">Transfer</button>
      </form>
    </div>
  );
}
