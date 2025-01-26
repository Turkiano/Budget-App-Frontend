import { ChangeEvent } from "react";


type SavingWrapperProps = {
  setSavingsTarget: (key: number)=> void
  currentSaving: number
};

export function SavingWrapper({setSavingsTarget, currentSaving}: SavingWrapperProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>)=>{
    const {valueAsNumber} = e.target
    setSavingsTarget(valueAsNumber)

  }

  return (
      <div>
        <p>SetTarget</p>
        <form>
       
        <input
          type="number"
          id="target"
          name="target"
          title="Target"
          placeholder="SAR 00.0"
          onChange={handleChange}
        />
        <button type="button">Rest</button>
        </form>
        <p>Current saving: {currentSaving}</p>
        <p>Target: 0</p>
        <p>Progress:0%</p>
        <progress  max="100"></progress>


    </div>
  );
};



