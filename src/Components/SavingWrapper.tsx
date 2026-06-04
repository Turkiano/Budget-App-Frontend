import { ChangeEvent } from "react";
import { useQuery } from '@tanstack/react-query';
import api from '@/api/api';
import { UserTypes } from '@/Types/User';

type SavingWrapperProps = {
  setSavingsTarget: (key: number) => void;
  savingsTarget: number;
  user: UserTypes;
};

export function SavingWrapper({ setSavingsTarget, savingsTarget, user }: SavingWrapperProps) {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { valueAsNumber } = e.target;
    setSavingsTarget(valueAsNumber);
  };

  const fetchTranscations = async () => {
    const res = await api.get('/transcations');
    return res.data as any[];
  };

  const { data: transcations = [] } = useQuery({ queryKey: ['transcations'], queryFn: fetchTranscations });

  const getField = (obj: any, ...keys: string[]) => keys.map(k => obj[k]).find(v => v !== undefined);
  const userIdVal = (user as any)?.User_id || (user as any)?.id || (user as any)?.user_id;

  const savingsForUser = (transcations || []).filter((t: any) => {
    const tType = getField(t, 'transcationType', 'transcation_type', 'Transcation_type', 'TranscationType');
    const tUserId = getField(t, 'userId', 'UserId', 'user_id', 'User_id');
    const isSavings = String(tType).toLowerCase().includes('saving') || String(tType).toLowerCase().includes('savings');
    return isSavings && String(tUserId) === String(userIdVal);
  });

  const currentSaving = savingsForUser.reduce((acc: number, item: any) => acc + Number(item.amount || item.Amount || 0), 0);
  const progress = savingsTarget > 0 ? Math.round((currentSaving / savingsTarget) * 100) : 0;

  return (
    <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
      <h2 className="text-xl font-semibold text-white">Set Target</h2>
      <form className="mt-5 space-y-4">
        <input
          type="number"
          id="target"
          name="target"
          title="Target"
          placeholder="SAR 00.0"
          onChange={handleChange}
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/20"
        />
      </form>
      <div className="mt-6 space-y-2 text-sm text-slate-300">
        <p className="text-slate-200">Current Saving: {currentSaving}</p>
        <p>Target: {savingsTarget}</p>
        <p>Progress: {progress}%</p>
      </div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-sky-500" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
};



