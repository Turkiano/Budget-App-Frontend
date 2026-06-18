import api from '@/api/api';
import {
  CategoryRecord,
  TransactionRecord,
  UserResponse,
} from '@/Types/ApiTypes';
import { useQuery } from '@tanstack/react-query';

import { TransactionWrapper } from '@/Components/TransactionWrapper';
import { NavigationMenu } from '@/Components/NavigationMenu';
import { transactionConfigs } from '@/Types/transactionConfigs';

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
const userIdVal = normalizeId(
  getField(user, 'User_id', 'id', 'user_id'),
);

const isTransactionForUser = (
  transaction: TransactionRecord,
  expectedType: string,
) => {
  const tUser = normalizeId(
    getField(
      transaction,
      'userId',
      'UserId',
      'user_id',
      'User_id',
    ),
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

  return matchingCategory?.name || matchingCategory?.name || '';
};

const getChartData = (items: TransactionRecord[]) => {
  const totals = items.reduce<Record<string, number>>(
    (acc, item) => {
      const label =
        categoryName(
          item.categoryId ||
            item.CategoryId ||
            item.category_id ||
            item.Category_id,
        ) || 'Uncategorized';

      const value = Number(
        item.amount ?? item.Amount ?? 0,
      );

      if (!Number.isFinite(value) || value <= 0) {
        return acc;
      }

      acc[label] = (acc[label] ?? 0) + value;

      return acc;
    },
    {},
  );

  const sorted = Object.entries(totals)
    .map(([label, value]) => ({
      label,
      value,
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  const maxValue = sorted[0]?.value ?? 0;

  return sorted.map((entry) => ({
    ...entry,
    percent: maxValue
      ? (entry.value / maxValue) * 100
      : 0,
  }));
};

const getTotalAmount = (
  items: TransactionRecord[],
) =>
  items.reduce(
    (sum, item) =>
      sum +
      Number(item.amount ?? item.Amount ?? 0),
    0,
  );

const formatTransactionDate = (
  transaction: TransactionRecord,
) => {
  const rawDate = normalizeId(
    getField(transaction, 'date', 'Date'),
  );

  if (!rawDate) return '—';

  const parsedDate = new Date(rawDate);

  return Number.isNaN(parsedDate.getTime())
    ? '—'
    : parsedDate.toLocaleDateString();
};

const transactionData = transactionConfigs.map(
  (config) => {
    const items = transcations.filter(
      (transaction) =>
        isTransactionForUser(
          transaction,
          config.key,
        ),
    );

    return {
      ...config,
      items,
      chartData: getChartData(items),
      total: getTotalAmount(items),
    };
  },
);

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
            Manage expenses and keep spending organized.
            Welcome back,
            {` ${user?.firstName} ${user?.lastName}!`}
          </p>
        </div>

        {/* Graph Cards */}

        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {transactionData.map((item) => (
            <div
              key={item.key}
              className="section-card space-y-4"
            >
              <div className="space-y-2">
                <h2 className="balance-title">
                  {item.title} Graph
                </h2>

                <p className="stats-text">
                  Total {item.title.toLowerCase()}
                </p>

                <p
                  className="text-2xl font-semibold"
                  style={{ color: item.color }}
                >
                  SAR {item.total.toLocaleString()}
                </p>
              </div>

              <div className="flex items-end gap-3 h-36">
                {item.chartData.length > 0 ? (
                  item.chartData.map((entry) => (
                    <div
                      key={entry.label}
                      className="flex flex-1 flex-col justify-end"
                    >
                      <div
                        className="mx-auto w-full rounded-3xl"
                        style={{
                          height: `${Math.max(
                            entry.percent,
                            10,
                          )}%`,
                          background: item.color,
                        }}
                      />

                      <p className="stats-text mt-2 text-center truncate">
                        {entry.label}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="stats-text">
                    No {item.title.toLowerCase()} data yet.
                  </p>
                )}
              </div>
            </div>
          ))}
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
        {transactionData.map((item) => (
          <div
            key={item.key}
            className="card-container"
          >
            <h3 className="balance-title">
              {item.title} Transactions
            </h3>

            <ul className="mt-5 space-y-4">
              {item.items.map((t) => (
                <li
                  key={
                    t.transcation_Id ||
                    t.Transcation_Id ||
                    t.transcationId
                  }
                  className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr]"
                  style={{
                    borderColor: 'var(--card-border)',
                    background: 'var(--input-bg)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>
                    {t.description || t.Description}
                  </span>

                  <span
                    style={{
                      color: item.color,
                      fontWeight: 600,
                    }}
                  >
                    SAR {t.amount || t.Amount}
                  </span>

                  <span>
                    {formatTransactionDate(t)}
                  </span>

                  <span className="stats-text truncate">
                    {categoryName(
                      t.categoryId ||
                        t.CategoryId ||
                        t.category_id ||
                        t.Category_id,
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </div>
  </div>
);}
