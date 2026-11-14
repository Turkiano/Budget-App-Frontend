import { useState } from 'react';

import { ErrorBanner } from '@/Components/ErrorBanner';
import { GroupsPanel } from '@/Components/GroupsPanel';
import { ProfileChart } from '@/Components/UserProfileChart';
import { TransactionWrapper } from '@/Components/TransactionWrapper';
import { NavigationMenu } from '@/Components/NavigationMenu';
import { getApiError, type ApiError } from '@/api/problemDetails';
import { useCategories } from '@/hooks/useCategories';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useTransactions } from '@/hooks/useTransactions';
import type { TransactionReadDto } from '@/Types/api';
import { transactionConfigs } from '@/Types/transactionConfigs';

export function UserProfile() {
  const { data: user, error, isLoading } = useCurrentUser();
  const { transactions, deleteTransaction } = useTransactions();
  const { categories } = useCategories();
  const [deleteError, setDeleteError] = useState<ApiError | null>(null);

  if (isLoading)
    return (
      <p className="text-center text-slate-300">Loading your profile...</p>
    );

  if (error)
    return (
      <p className="text-center text-rose-400">{getApiError(error).message}</p>
    );

  if (!user) {
    return <p className="text-center text-slate-300">User not found.</p>;
  }

  const isTransactionForUser = (
    transaction: TransactionReadDto,
    expectedType: string,
  ) => {
    const type = transaction.transcation_type.toLowerCase();

    return transaction.userId === user.user_id && type.includes(expectedType);
  };

  const categoryName = (categoryId?: string | null) => {
    if (!categoryId) return '';

    return (
      categories.find((category) => category.category_id === categoryId)?.name ??
      ''
    );
  };

  const getChartData = (items: TransactionReadDto[]) => {
    const totals = items.reduce<Record<string, number>>((acc, item) => {
      const label = categoryName(item.categoryId) || 'Uncategorized';
      const value = Number(item.amount ?? 0);

      if (!Number.isFinite(value) || value <= 0) {
        return acc;
      }

      acc[label] = (acc[label] ?? 0) + value;

      return acc;
    }, {});

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
      percent: maxValue ? (entry.value / maxValue) * 100 : 0,
    }));
  };

  const getTotalAmount = (items: TransactionReadDto[]) =>
    items.reduce((sum, item) => sum + Number(item.amount ?? 0), 0);

  const formatTransactionDate = (transaction: TransactionReadDto) => {
    const parsedDate = new Date(transaction.date);

    return Number.isNaN(parsedDate.getTime())
      ? '—'
      : parsedDate.toLocaleDateString();
  };

  const transactionData = transactionConfigs.map((config) => {
    const items = transactions.filter((transaction) =>
      isTransactionForUser(transaction, config.key),
    );

    return {
      ...config,
      items,
      chartData: getChartData(items),
      total: getTotalAmount(items),
    };
  });

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!window.confirm('Delete this transaction?')) return;

    setDeleteError(null);

    try {
      await deleteTransaction.mutateAsync(transactionId);
    } catch (err) {
      setDeleteError(getApiError(err));
    }
  };

  return (
    <div className="page-container px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full">
        <NavigationMenu />
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        <div className="card-container">
          <div className="text-center">
            <h1 className="page-title">Mastering Yourself IS A True Power!</h1>

            <p className="stats-text mx-auto mt-3 max-w-2xl">
              Manage expenses and keep spending organized. Welcome back,
              {` ${user.firstName ?? ''} ${user.lastName ?? ''}!`}
            </p>
          </div>

          {/* Graph Cards */}

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {transactionData.map((item) => (
              <div key={item.key} className="section-card space-y-4">
                <div className="space-y-2">
                  <h2 className="balance-title">{item.title} Graph</h2>

                  <p className="stats-text">Total {item.title.toLowerCase()}</p>

                  <p
                    className="text-2xl font-semibold"
                    style={{ color: item.color }}
                  >
                    SAR {item.total.toLocaleString()}
                  </p>
                </div>
                {item.chartData.length > 0 ? (
                  <ProfileChart data={item.chartData} color={item.color} />
                ) : (
                  <p className="stats-text">
                    No {item.title.toLowerCase()} data yet.
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        <GroupsPanel />

        <div className="grid gap-6 lg:grid-cols-3">
          <TransactionWrapper
            defaultType="Expenses"
            buttonLabel="Add Transaction"
          />
        </div>

        <ErrorBanner
          message={deleteError?.message}
          fieldErrors={deleteError?.fieldErrors}
        />

        {/* Transaction Lists */}

        <div className="grid gap-6 lg:grid-cols-3">
          {transactionData.map((item) => (
            <div key={item.key} className="card-container">
              <h3 className="balance-title">{item.title} Transactions</h3>

              <ul className="mt-5 space-y-4">
                {item.items.map((t) => (
                  <li
                    key={t.transcation_Id}
                    className="grid gap-3 rounded-xl border p-4 text-sm sm:grid-cols-[1.5fr_1fr_1fr_1fr_auto]"
                    style={{
                      borderColor: 'var(--card-border)',
                      background: 'var(--input-bg)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <span>{t.description ?? ''}</span>

                    <span
                      style={{
                        color: item.color,
                        fontWeight: 600,
                      }}
                    >
                      SAR {t.amount}
                    </span>

                    <span>{formatTransactionDate(t)}</span>

                    <span className="stats-text truncate">
                      {categoryName(t.categoryId)}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        void handleDeleteTransaction(t.transcation_Id)
                      }
                      disabled={
                        deleteTransaction.isPending &&
                        deleteTransaction.variables === t.transcation_Id
                      }
                      className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-rose-500 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
