import { ChangeEvent } from "react";


type SavingWrapperProps = {
  setSavingsTarget: (key: number)=> void
  currentSaving: number
  savingsTarget: number
  progress: number 
};

export function SavingWrapper({setSavingsTarget, currentSaving, savingsTarget, progress}: SavingWrapperProps) { 

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
        <button type="reset">Rest</button>
        </form>
        <h3>Current Saving: {currentSaving}</h3>
        <p>Target: {savingsTarget}</p>
        <p>Progress: {progress}%</p> 
        <progress  max="100" value={progress}></progress> 


    </div>
  );
};



