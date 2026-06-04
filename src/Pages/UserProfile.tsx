import api from '@/api/api';
import { CategoryRecord, TransactionRecord, UserResponse } from '@/Types/ApiTypes';
import { useQuery } from '@tanstack/react-query';
import { IncomeWrapper } from '@/Components/IncomeWrapper';
import { ExpenseWrapper } from '@/Components/ExpenseWrapper';
import { SavingWrapper } from '@/Components/SavingWrapper';

const normalizeId = (value: unknown) => {
  if (value === undefined || value === null) return undefined;
  return String(value);
};

const getField = (obj: unknown, ...keys: string[]) => {
  if (!obj || typeof obj !== 'object') return undefined;
  return keys.map((key) => (obj as Record<string, unknown>)[key]).find((value) => value !== undefined);
};

export function UserProfile() {
 const getCurrentUser = async () => {
    try {
      const res = await api.get('/users/me');
      return res.data as UserResponse;
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Something went wrong'));
    }
  };

  const { data: user, error, isLoading } = useQuery<UserResponse>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  // Fetch all transactions and categories so we can show per-user grouped lists
  const fetchTranscations = async (): Promise<TransactionRecord[]> => {
    const res = await api.get('/transcations');
    return res.data as TransactionRecord[];
  };

  const fetchCategories = async (): Promise<CategoryRecord[]> => {
    const res = await api.get('/categorys');
    return res.data as CategoryRecord[];
  };

  const { data: transcations = [] } = useQuery<TransactionRecord[]>({ queryKey: ['transcations'], queryFn: fetchTranscations });
  const { data: categories = [] } = useQuery<CategoryRecord[]>({ queryKey: ['categories'], queryFn: fetchCategories });

  if (isLoading) return <p className="text-center text-slate-300">Loading your profile...</p>;

  if (error) return <p className="text-center text-rose-400">{(error as Error).message}</p>;

  if (!user) {
    return <p className="text-center text-slate-300">User not found.</p>;
  }

  const userIdVal = normalizeId(getField(user, 'User_id', 'id', 'user_id'));

  const isTransactionForUser = (transaction: TransactionRecord, expectedType: string) => {
    const tUser = normalizeId(getField(transaction, 'userId', 'UserId', 'user_id', 'User_id'));
    const tType = normalizeId(
      getField(transaction, 'transcation_type', 'Transcation_type', 'transcationType', 'TranscationType'),
    )?.toLowerCase();

    return Boolean(tUser && userIdVal && tUser === userIdVal && tType?.includes(expectedType));
  };

  const incomesList = transcations.filter((transaction) => isTransactionForUser(transaction, 'income'));

  const expensesList = transcations.filter((transaction) => isTransactionForUser(transaction, 'expense'));

  const savingsList = transcations.filter((transaction) => isTransactionForUser(transaction, 'saving'));

  const categoryName = (catId?: string | number) => {
    const normalizedCatId = normalizeId(catId);
    if (!normalizedCatId) return '';

    const matchingCategory = categories.find((category) =>
      normalizeId(getField(category, 'Category_id', 'category_id', 'CategoryId', 'categoryId')) === normalizedCatId,
    );

    return matchingCategory?.Name || matchingCategory?.name || '';
  };

  const formatTransactionDate = (transaction: TransactionRecord) => {
    const rawDate = normalizeId(getField(transaction, 'date', 'Date'));
    if (!rawDate) return '—';

    const parsedDate = new Date(rawDate);
    return Number.isNaN(parsedDate.getTime()) ? '—' : parsedDate.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-[2rem] bg-slate-900/90 border border-white/10 p-8 shadow-2xl shadow-slate-950/40 backdrop-blur-xl">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Dashboard</h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-300 sm:text-base">
              Welcome back, {user?.firstName} {user?.lastName}!
            </p>
          </div>

          <div className="mt-8 grid gap-6 rounded-[2rem] bg-slate-950/50 p-6 shadow-inner shadow-black/10 sm:grid-cols-3">
            <div className="space-y-2 rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <h2 className="text-lg font-semibold">Your Profile</h2>
              <p className="text-sm text-slate-400">Email: <span className="text-slate-100">{user?.email}</span></p>
              <p className="text-sm text-slate-400">Phone: <span className="text-slate-100">{user?.phone || '—'}</span></p>
              <p className="text-sm text-slate-400">Role: <span className="text-slate-100">{user?.role || '—'}</span></p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <div className="text-lg font-semibold">Income</div>
              <p className="mt-2 text-sm text-slate-400">Track your incoming amounts and add new income entries.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <div className="text-lg font-semibold">Expenses</div>
              <p className="mt-2 text-sm text-slate-400">Manage expenses and keep spending organized.</p>
            </div>
          </div>
          <div>
            <div className="space-y-2 rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <h2 className="text-lg font-semibold">Your Profile</h2>
              <p className="text-sm text-slate-400">Email: <span className="text-slate-100">{user?.email}</span></p>
              <p className="text-sm text-slate-400">Phone: <span className="text-slate-100">{user?.phone || '—'}</span></p>
              <p className="text-sm text-slate-400">Role: <span className="text-slate-100">{user?.role || '—'}</span></p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <div className="text-lg font-semibold">Income</div>
              <p className="mt-2 text-sm text-slate-400">Track your incoming amounts and add new income entries.</p>
            </div>
            <div className="rounded-3xl bg-slate-900/80 p-5 text-slate-200">
              <div className="text-lg font-semibold">Expenses</div>
              <p className="mt-2 text-sm text-slate-400">Manage expenses and keep spending organized.</p>
            </div>
          </div>
          
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <IncomeWrapper user={user} />
          <ExpenseWrapper user={user} />
          <SavingWrapper user={user} savingsTarget={5000} setSavingsTarget={() => null} />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white">Income Transactions</h3>
            <ul className="mt-5 space-y-4">
              {incomesList.map((t) => (
                <li key={t.transcation_Id || t.Transcation_Id || t.transcationId} className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <span>{t.description || t.Description}</span>
                  <span className="font-semibold text-emerald-300">SAR {t.amount || t.Amount}</span>
                  <span>{formatTransactionDate(t)}</span>
                  <span className="truncate text-slate-400">{categoryName(t.categoryId || t.CategoryId || t.category_id || t.Category_id)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white">Expense Transactions</h3>
            <ul className="mt-5 space-y-4">
              {expensesList.map((t) => (
                <li key={t.transcation_Id || t.Transcation_Id || t.transcationId} className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <span>{t.description || t.Description}</span>
                  <span className="font-semibold text-orange-400">SAR {t.amount || t.Amount}</span>
                  <span>{formatTransactionDate(t)}</span>
                  <span className="truncate text-slate-400">{categoryName(t.categoryId || t.CategoryId || t.category_id || t.Category_id)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-slate-900/90 border border-white/10 p-6 shadow-2xl shadow-slate-950/40">
            <h3 className="text-lg font-semibold text-white">Saving Transactions</h3>
            <ul className="mt-5 space-y-4">
              {savingsList.map((t) => (
                <li key={t.transcation_Id || t.Transcation_Id || t.transcationId} className="grid gap-3 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300 sm:grid-cols-[1.5fr_1fr_1fr_1fr]">
                  <span>{t.description || t.Description}</span>
                  <span className="font-semibold text-emerald-300">SAR {t.amount || t.Amount}</span>
                  <span>{formatTransactionDate(t)}</span>
                  <span className="truncate text-slate-400">{categoryName(t.categoryId || t.CategoryId || t.category_id || t.Category_id)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
