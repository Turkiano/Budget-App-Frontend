import api from '@/api/api';
import {
  CategoryRecord,
  TransactionRecord,
  UserResponse,
} from '@/Types/ApiTypes';
import { useQuery } from '@tanstack/react-query';

import { TransactionWrapper } from '@/Components/TransactionWrapper';
import { NavigationMenu } from '@/Components/NavigationMenu';

const normalizeId = (value: unknown) => {
  if (value === undefined || value === null) return undefined;
  return String(value);
};

const getField = (obj: unknown, ...keys: string[]) => {
  if (!obj || typeof obj !== 'object') return undefined;
  return keys
    .map((key) => (obj as Record<string, unknown>)[key])
    .find((value) => value !== undefined);
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

  const {
    data: user,
    error,
    isLoading,
  } = useQuery<UserResponse>({
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

  const { data: transcations = [] } = useQuery<TransactionRecord[]>({
    queryKey: ['transcations'],
    queryFn: fetchTranscations,
  });
  const { data: categories = [] } = useQuery<CategoryRecord[]>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading)
    return (
      <p className="text-center text-slate-300">Loading your profile...</p>
    );

  if (error)
    return (
      <p className="text-center text-rose-400">{(error as Error).message}</p>
    );

  if (!user) {
    return <p className="text-center text-slate-300">User not found.</p>;
  }

  const userIdVal = normalizeId(getField(user, 'User_id', 'id', 'user_id'));

  const isTransactionForUser = (
    transaction: TransactionRecord,
    expectedType: string,
  ) => {
    const tUser = normalizeId(
      getField(transaction, 'userId', 'UserId', 'user_id', 'User_id'),
    );
    const tType = normalizeId(
      getField(
        transaction,
        'transcation_type',
        'Transcation_type',
        'transcationType',
        'TranscationType',
      ),
    )?.toLowerCase();

    return Boolean(
      tUser &&
        userIdVal &&
        tUser === userIdVal &&
        tType?.includes(expectedType),
    );
  };

  const incomesList = transcations.filter((transaction) =>
    isTransactionForUser(transaction, 'income'),
  );

  const expensesList = transcations.filter((transaction) =>
    isTransactionForUser(transaction, 'expense'),
  );

  const savingsList = transcations.filter((transaction) =>
    isTransactionForUser(transaction, 'saving'),
  );

  const categoryName = (catId?: string | number) => {
    const normalizedCatId = normalizeId(catId);
    if (!normalizedCatId) return '';

    const matchingCategory = categories.find(
      (category) =>
        normalizeId(
          getField(
            category,
            'Category_id',
            'category_id',
            'CategoryId',
            'categoryId',
          ),
        ) === normalizedCatId,
    );

    return matchingCategory?.Name || matchingCategory?.name || '';
  };

  const getChartData = (items: TransactionRecord[]) => {
    const totals = items.reduce<Record<string, number>>((acc, item) => {
      const label =
        categoryName(
          item.categoryId ||
            item.CategoryId ||
            item.category_id ||
            item.Category_id,
        ) || 'Uncategorized';
      const value = Number(item.amount ?? item.Amount ?? 0);
      if (!Number.isFinite(value) || value <= 0) return acc;
      acc[label] = (acc[label] ?? 0) + value;
      return acc;
    }, {});

    const sorted = Object.entries(totals)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const maxValue = sorted[0]?.value ?? 0;
    return sorted.map((entry) => ({
      ...entry,
      percent: maxValue ? (entry.value / maxValue) * 100 : 0,
    }));
  };

  const incomeChartData = getChartData(incomesList);
  const expenseChartData = getChartData(expensesList);
  const savingChartData = getChartData(savingsList);

  const getTotalAmount = (items: TransactionRecord[]) =>
    items.reduce(
      (sum, item) => sum + Number(item.amount ?? item.Amount ?? 0),
      0,
    );

  const totalIncome = getTotalAmount(incomesList);
  const totalExpense = getTotalAmount(expensesList);
  const totalSaving = getTotalAmount(savingsList);

  const formatTransactionDate = (transaction: TransactionRecord) => {
    const rawDate = normalizeId(getField(transaction, 'date', 'Date'));
    if (!rawDate) return '—';

    const parsedDate = new Date(rawDate);
    return Number.isNaN(parsedDate.getTime())
      ? '—'
      : parsedDate.toLocaleDateString();
  };

  return (
  <div className="page-container px-4 py-8 sm:px-6 lg:px-8">
    <div className="w-full">
      <NavigationMenu />
    </div>

    <div className="mx-auto max-w-7xl space-y-8">
      <div className="card-container">
        <div className="text-center">
          <h1 className="page-title">
            Mastering Yourself IS A True Power!
          </h1>

          <p className="stats-text mx-auto mt-3 max-w-2xl">
            Manage expenses and keep spending organized. Welcome back,
            {` ${user?.firstName} ${user?.lastName}!`}
          </p>
        </div>

        {/* Profile Cards */}

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          <div className="section-card space-y-2">
            <h2 className="balance-title">Your Profile</h2>

            <p className="stats-text">
              Email:{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                {user?.email}
              </span>
            </p>

            <p className="stats-text">
              Phone:{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                {user?.phone || '—'}
              </span>
            </p>

            <p className="stats-text">
              Role:{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                {user?.role || '—'}
              </span>
            </p>
          </div>

          <div className="section-card">
            <div className="balance-title">Income</div>

            <p className="stats-text mt-2">
              Track your incoming amounts and add new income entries.
            </p>
          </div>

          <div className="section-card">
            <div className="balance-title">Expenses</div>

            <p className="stats-text mt-2">
              Manage expenses and keep spending organized.
            </p>
          </div>
        </div>

        {/* Graph Cards */}

        <div className="mt-8 grid gap-6 sm:grid-cols-3">

          {/* Income */}

          <div className="section-card space-y-4">
            <div className="space-y-2">
              <h2 className="balance-title">Income Graph</h2>

              <p className="stats-text">Total income</p>

              <p
                className="text-2xl font-semibold"
                style={{ color: '#10b981' }}
              >
                SAR {totalIncome.toLocaleString()}
              </p>
            </div>

            <div className="flex items-end gap-3 h-36">
              {incomeChartData.length > 0 ? (
                incomeChartData.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full rounded-3xl"
                      style={{
                        height: `${Math.max(entry.percent, 10)}%`,
                        background: '#10b981',
                      }}
                    />

                    <p className="stats-text mt-2 text-center truncate">
                      {entry.label}
                    </p>
                  </div>
                ))
              ) : (
                <p className="stats-text">
                  No income data yet.
                </p>
              )}
            </div>
          </div>

          {/* Expense */}

          <div className="section-card space-y-4">
            <div className="space-y-2">
              <h2 className="balance-title">Expense Graph</h2>

              <p className="stats-text">Total expenses</p>

              <p
                className="text-2xl font-semibold"
                style={{ color: '#f97316' }}
              >
                SAR {totalExpense.toLocaleString()}
              </p>
            </div>

            <div className="flex items-end gap-3 h-36">
              {expenseChartData.length > 0 ? (
                expenseChartData.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full rounded-3xl"
                      style={{
                        height: `${Math.max(entry.percent, 10)}%`,
                        background: '#f97316',
                      }}
                    />

                    <p className="stats-text mt-2 text-center truncate">
                      {entry.label}
                    </p>
                  </div>
                ))
              ) : (
                <p className="stats-text">
                  No expense data yet.
                </p>
              )}
            </div>
          </div>

          {/* Saving */}

          <div className="section-card space-y-4">
            <div className="space-y-2">
              <h2 className="balance-title">Saving Graph</h2>

              <p className="stats-text">Total savings</p>

              <p
                className="text-2xl font-semibold"
                style={{ color: '#0ea5e9' }}
              >
                SAR {totalSaving.toLocaleString()}
              </p>
            </div>

            <div className="flex items-end gap-3 h-36">
              {savingChartData.length > 0 ? (
                savingChartData.map((entry) => (
                  <div
                    key={entry.label}
                    className="flex flex-1 flex-col justify-end"
                  >
                    <div
                      className="mx-auto w-full rounded-3xl"
                      style={{
                        height: `${Math.max(entry.percent, 10)}%`,
                        background: '#0ea5e9',
                      }}
                    />

                    <p className="stats-text mt-2 text-center truncate">
                      {entry.label}
                    </p>
                  </div>
                ))
              ) : (
                <p className="stats-text">
                  No saving data yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <TransactionWrapper
          defaultType="Expenses"
          buttonLabel="Add Transaction"
        />
      </div>

      {/* Transaction Lists */}

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Income Transactions */}

        <div className="card-container">
          <h3 className="balance-title">
            Income Transactions
          </h3>

          <ul className="mt-5 space-y-4">
            {incomesList.map((t) => (
              <li
                key={t.transcation_Id || t.Transcation_Id || t.transcationId}
                className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
                style={{
                  borderColor: 'var(--card-border)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{t.description || t.Description}</span>

                <span style={{ color: '#10b981', fontWeight: 600 }}>
                  SAR {t.amount || t.Amount}
                </span>

                <span>{formatTransactionDate(t)}</span>

                <span className="stats-text truncate">
                  {categoryName(
                    t.categoryId ||
                    t.CategoryId ||
                    t.category_id ||
                    t.Category_id
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expense Transactions */}

        <div className="card-container">
          <h3 className="balance-title">
            Expense Transactions
          </h3>

          <ul className="mt-5 space-y-4">
            {expensesList.map((t) => (
              <li
                key={t.transcation_Id || t.Transcation_Id || t.transcationId}
                className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
                style={{
                  borderColor: 'var(--card-border)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{t.description || t.Description}</span>

                <span style={{ color: '#f97316', fontWeight: 600 }}>
                  SAR {t.amount || t.Amount}
                </span>

                <span>{formatTransactionDate(t)}</span>

                <span className="stats-text truncate">
                  {categoryName(
                    t.categoryId ||
                    t.CategoryId ||
                    t.category_id ||
                    t.Category_id
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Saving Transactions */}

        <div className="card-container">
          <h3 className="balance-title">
            Saving Transactions
          </h3>

          <ul className="mt-5 space-y-4">
            {savingsList.map((t) => (
              <li
                key={t.transcation_Id || t.Transcation_Id || t.transcationId}
                className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
                style={{
                  borderColor: 'var(--card-border)',
                  background: 'var(--input-bg)',
                  color: 'var(--text-primary)',
                }}
              >
                <span>{t.description || t.Description}</span>

                <span style={{ color: '#0ea5e9', fontWeight: 600 }}>
                  SAR {t.amount || t.Amount}
                </span>

                <span>{formatTransactionDate(t)}</span>

                <span className="stats-text truncate">
                  {categoryName(
                    t.categoryId ||
                    t.CategoryId ||
                    t.category_id ||
                    t.Category_id
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  </div>
);
}
