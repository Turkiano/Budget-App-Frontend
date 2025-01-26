import { ChangeEvent, FormEvent } from 'react';




type SavingAccountProps = {
  setSavingAccount: (key: number) => void;
  handleSubmit: (key: FormEvent)=> void 
  savingAccount: number;
};

export function TransferAccountWrapper({
  setSavingAccount,
  handleSubmit,
  savingAccount
}: SavingAccountProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    //to restrict invalid inputs (e.g., negative or non-numeric values)
    if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {

    setSavingAccount(valueAsNumber);
    }
  };


   
  return (
    <div>
      <p>Transfer to saving account</p>
      <form onSubmit={handleSubmit}> 
        <input
          type="number"
          id="target"
          name="target"
          title="Target"
          placeholder="SAR 00.0"
          onChange={handleChange}
          value={savingAccount} 
        />
        <button type="submit">Transfer</button>
      </form>
    </div>
  );
}
