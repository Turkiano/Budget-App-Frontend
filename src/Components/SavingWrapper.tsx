



export function SavingWrapper({handleChange}) {
  return (
      <div>
        <p>SetTarget</p>
        <form>
        <input
          type="number"
          id="saving"
          name="saving"
          title="Target"
          onChange={handleChange}
        />
        <button>Rest</button>
        </form>
        <p>Current saving: 0</p>
        <p>Target: 0</p>
        <p>Progress: 0</p>
    </div>
  );
};



