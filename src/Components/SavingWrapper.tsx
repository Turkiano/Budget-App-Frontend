import { ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/api';
import { UserTypes } from '@/Types/User';

type SavingWrapperProps = {
  setSavingsTarget: (key: number) => void;
  savingsTarget: number;
  user: UserTypes;
};

export function SavingWrapper({
  setSavingsTarget,
  savingsTarget,
  user,
}: SavingWrapperProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    setSavingsTarget(valueAsNumber);
  };

  const fetchTranscations = async () => {
    const res = await api.get('/transcations');
    return res.data as any[];
  };

  const { data: transcations = [] } = useQuery({
    queryKey: ['transcations'],
    queryFn: fetchTranscations,
  });

  const getField = (obj: any, ...keys: string[]) =>
    keys.map((k) => obj[k]).find((v) => v !== undefined);
  const userIdVal =
    (user as any)?.User_id || (user as any)?.id || (user as any)?.user_id;

  const savingsForUser = (transcations || []).filter((t: any) => {
    const tType = getField(
      t,
      'transcationType',
      'transcation_type',
      'Transcation_type',
      'TranscationType',
    );
    const tUserId = getField(t, 'userId', 'UserId', 'user_id', 'User_id');
    const isSavings =
      String(tType).toLowerCase().includes('saving') ||
      String(tType).toLowerCase().includes('savings');
    return isSavings && String(tUserId) === String(userIdVal);
  });

  const currentSaving = savingsForUser.reduce(
    (acc: number, item: any) => acc + Number(item.amount || item.Amount || 0),
    0,
  );
  const progress =
    savingsTarget > 0 ? Math.round((currentSaving / savingsTarget) * 100) : 0;

  return (
    <div className="card-container">
      <h2 className="form-title">Set Target</h2>

      <form className="mt-5 space-y-4">
        <input
          type="number"
          id="target"
          name="target"
          title="Target"
          placeholder="SAR 00.0"
          onChange={handleChange}
          className="form-input"
        />
      </form>

      <div className="mt-6 space-y-2">
        <p className="text-primary">Current Saving: {currentSaving}</p>

        <p className="text-secondary">Target: {savingsTarget}</p>

        <p className="text-secondary">Progress: {progress}%</p>
      </div>

      <div className="progress-bar mt-4">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(progress, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}
