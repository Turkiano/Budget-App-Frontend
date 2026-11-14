import { Fragment, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  ArrowLeftRight,
  ChevronDown,
  ChevronRight,
  Layers,
  Mail,
  Phone,
  RefreshCw,
  Search,
  Shield,
  UserRound,
  Users,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { ErrorBanner } from '@/Components/ErrorBanner';
import { NavigationMenu } from '@/Components/NavigationMenu';
import { getApiError } from '@/api/problemDetails';
import { useAdminDashboard } from '@/hooks/useAdminDashboard';
import type {
  AdminCategoryUsage,
  AdminUserSummary,
  BudgetType,
} from '@/Types/api';

const numberFormatter = new Intl.NumberFormat('en-US');
const amountFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

const metricTones = {
  sky: 'bg-sky-500/10 text-sky-500 ring-sky-500/20',
  emerald: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20',
  amber: 'bg-amber-500/10 text-amber-500 ring-amber-500/20',
} as const;

const budgetTypeBadge: Record<BudgetType, string> = {
  Incomes: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500',
  Expenses: 'border-rose-500/30 bg-rose-500/10 text-rose-500',
  Savings: 'border-sky-500/30 bg-sky-500/10 text-sky-500',
};

const budgetTypeText: Record<BudgetType, string> = {
  Incomes: 'text-emerald-500',
  Expenses: 'text-rose-500',
  Savings: 'text-sky-500',
};

const budgetTypeBar: Record<BudgetType, string> = {
  Incomes: 'bg-emerald-500',
  Expenses: 'bg-rose-500',
  Savings: 'bg-sky-500',
};

const roleBadge: Record<string, string> = {
  Admin: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  Customer: 'border-slate-500/30 bg-slate-500/10 text-slate-400',
};

function formatNumber(value: number): string {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}

function formatAmount(value: number): string {
  return `SAR ${amountFormatter.format(Number.isFinite(value) ? value : 0)}`;
}

function formatDate(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? '—' : date.toLocaleString();
}

function displayName(user: AdminUserSummary): string {
  const name = [user.firstName, user.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  return name || user.email || 'Unnamed user';
}

function initials(user: AdminUserSummary): string {
  const first = user.firstName?.trim().charAt(0) ?? '';
  const last = user.lastName?.trim().charAt(0) ?? '';
  const value = `${first}${last}`.toUpperCase();

  return value || (user.email?.charAt(0).toUpperCase() ?? '?');
}

function Pill({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}
    >
      {children}
    </span>
  );
}

function MetricCard({
  label,
  value,
  detail,
  icon: Icon,
  tone,
}: {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
  tone: keyof typeof metricTones;
}) {
  return (
    <article className="card-container flex items-start justify-between gap-4">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-secondary)]">
          {label}
        </p>
        <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          {value}
        </p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{detail}</p>
      </div>
      <span
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${metricTones[tone]}`}
      >
        <Icon className="h-6 w-6" />
      </span>
    </article>
  );
}

function PeriodCount({ value }: { value: number }) {
  const hasValue = value > 0;

  return (
    <span
      className={`inline-flex min-w-[2.25rem] items-center justify-center rounded-lg px-2 py-1 text-sm font-semibold ${
        hasValue
          ? 'bg-sky-500/10 text-sky-500'
          : 'text-[var(--text-secondary)]'
      }`}
    >
      {formatNumber(value)}
    </span>
  );
}

function DetailRow({
  icon,
  label,
  value,
  mono = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-[var(--text-secondary)]">{icon}</span>
      <div className="min-w-0">
        <dt className="text-[11px] uppercase tracking-wider text-[var(--text-secondary)]">
          {label}
        </dt>
        <dd
          className={`break-words text-sm font-medium text-[var(--text-primary)] ${
            mono ? 'font-mono text-xs' : ''
          }`}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}

function CategoryRow({
  category,
  maxAmount,
}: {
  category: AdminCategoryUsage;
  maxAmount: number;
}) {
  const width =
    maxAmount > 0
      ? Math.min(100, Math.max(3, (Math.abs(category.totalAmount) / maxAmount) * 100))
      : 0;

  return (
    <div className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] p-3">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
            {category.name ?? 'Uncategorized'}
          </p>
          {category.categoryType ? (
            <Pill className={budgetTypeBadge[category.categoryType]}>
              {category.categoryType}
            </Pill>
          ) : (
            <Pill className="border-slate-500/30 bg-slate-500/10 text-slate-400">
              Uncategorized
            </Pill>
          )}
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {formatAmount(category.totalAmount)}
          </p>
          <p className="text-[11px] text-[var(--text-secondary)]">
            {formatNumber(category.transactionCount)} tx
          </p>
        </div>
      </div>
      <div className="progress-track mt-3">
        <div
          className={`h-full rounded-full ${
            category.categoryType
              ? budgetTypeBar[category.categoryType]
              : 'bg-slate-500'
          }`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function UserDetail({
  user,
  maxCategoryAmount,
}: {
  user: AdminUserSummary;
  maxCategoryAmount: number;
}) {
  return (
    <div className="grid gap-4 border-t border-[var(--input-border)] p-4 sm:p-5 lg:grid-cols-[1.05fr_1.35fr]">
      <div className="space-y-4">
        <div className="section-card">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-semibold text-[var(--text-primary)]">
                Personal information
              </h3>
              <p className="stats-text mt-1">{displayName(user)}</p>
            </div>
            <UserRound className="h-5 w-5 shrink-0 text-sky-500" />
          </div>

          <dl className="mt-4 space-y-3">
            <DetailRow
              icon={<Mail className="h-4 w-4" />}
              label="Email"
              value={user.email ?? '—'}
            />
            <DetailRow
              icon={<Phone className="h-4 w-4" />}
              label="Phone"
              value={user.phone ?? '—'}
            />
            <DetailRow
              icon={<Shield className="h-4 w-4" />}
              label="Role"
              value={user.role ?? 'Customer'}
            />
            <DetailRow
              icon={<Wallet className="h-4 w-4" />}
              label="Total volume"
              value={formatAmount(user.transactionVolume)}
            />
            <DetailRow
              icon={<Layers className="h-4 w-4" />}
              label="Categories used"
              value={`${formatNumber(user.categoryCount)} categories`}
            />
            <DetailRow
              icon={<UserRound className="h-4 w-4" />}
              label="User ID"
              value={user.userId}
              mono
            />
          </dl>
        </div>

        <div className="section-card">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Groups &amp; accounts
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              {formatNumber(user.groupCount)} total
            </span>
          </div>

          {user.groups.length === 0 ? (
            <p className="stats-text mt-3">No group membership yet.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {user.groups.map((group) => (
                <li
                  key={group.groupId}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] px-3 py-2.5"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                      {group.name ?? 'Untitled group'}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">
                      {formatNumber(group.memberCount)} member
                      {group.memberCount === 1 ? '' : 's'} ·{' '}
                      {formatNumber(group.transactionCount)} transactions
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {group.isPersonal ? (
                      <Pill className="border-sky-500/30 bg-sky-500/10 text-sky-500">
                        Personal
                      </Pill>
                    ) : null}
                    <Pill
                      className={
                        group.groupType === 'Business'
                          ? 'border-violet-500/30 bg-violet-500/10 text-violet-500'
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                      }
                    >
                      {group.groupType}
                    </Pill>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="section-card">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-[var(--text-primary)]">
              Category utilization
            </h3>
            <p className="stats-text mt-1">
              Where this user&apos;s transaction volume is concentrated.
            </p>
          </div>
          <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
            {formatNumber(user.transactionCount)} transactions
          </p>
        </div>

        {user.typeBreakdown.length > 0 ? (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {user.typeBreakdown.map((entry) => (
              <div
                key={entry.type}
                className="rounded-xl border border-[var(--input-border)] bg-[var(--input-bg)] p-3"
              >
                <p className={`text-xs font-semibold ${budgetTypeText[entry.type]}`}>
                  {entry.type}
                </p>
                <p className="mt-1 text-lg font-bold text-[var(--text-primary)]">
                  {formatNumber(entry.transactionCount)}
                </p>
                <p className="text-[11px] text-[var(--text-secondary)]">
                  {formatAmount(entry.totalAmount)}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {user.categoryBreakdown.length === 0 ? (
          <div className="mt-4 rounded-xl border border-dashed border-[var(--input-border)] px-4 py-8 text-center">
            <p className="text-sm font-semibold text-[var(--text-primary)]">
              No categorized transactions yet
            </p>
            <p className="stats-text mt-1">
              This user has not recorded any transactions.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {user.categoryBreakdown.map((category) => (
              <CategoryRow
                key={category.categoryId}
                category={category}
                maxAmount={maxCategoryAmount}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div
      className="page-container min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{ textAlign: 'left' }}
    >
      <div className="w-full">
        <NavigationMenu />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-3">
          <div className="h-3 w-28 animate-pulse rounded-full bg-slate-500/20" />
          <div className="h-9 w-72 animate-pulse rounded-xl bg-slate-500/20" />
          <div className="h-4 w-full max-w-xl animate-pulse rounded-lg bg-slate-500/10" />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="card-container h-32 animate-pulse bg-slate-500/5"
            />
          ))}
        </div>

        <div className="table-container p-6">
          <div className="h-9 w-56 animate-pulse rounded-lg bg-slate-500/20" />
          <div className="mt-6 space-y-4">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-lg bg-slate-500/10"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function AdminDashboard() {
  const { data, error, isLoading, isFetching, refetch } = useAdminDashboard();
  const [query, setQuery] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const filteredUsers = useMemo(() => {
    if (!data) return [];

    const normalized = query.trim().toLowerCase();
    if (!normalized) return data.users;

    return data.users.filter((user) => {
      const haystack = [user.firstName, user.lastName, user.email, user.role]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();

      return haystack.includes(normalized);
    });
  }, [data, query]);

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    const apiError = getApiError(error);

    return (
      <div
        className="page-container min-h-screen px-4 py-8 sm:px-6 lg:px-8"
        style={{ textAlign: 'left' }}
      >
      <div className="w-full">
        <NavigationMenu />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="card-container space-y-4">
          <ErrorBanner
            message={apiError.message}
            fieldErrors={apiError.fieldErrors}
          />
          <button
            type="button"
            onClick={() => void refetch()}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
            style={{ backgroundColor: 'var(--button-bg)' }}
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
        </div>
      </div>
      </div>
    );
  }

  if (!data) {
    return <DashboardSkeleton />;
  }

  const { totals } = data;
  const maxGroups = Math.max(
    1,
    ...data.users.map((user) => user.groupCount),
  );
  const maxCategoryAmount = Math.max(
    1,
    ...data.users.flatMap((user) =>
      user.categoryBreakdown.map((category) => Math.abs(category.totalAmount)),
    ),
  );

  return (
    <div
      className="page-container min-h-screen px-4 py-8 sm:px-6 lg:px-8"
      style={{ textAlign: 'left' }}
    >
      <div className="w-full">
        <NavigationMenu />
      </div>

      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
              Admin overview
            </p>
            <h1 className="page-title mt-2 text-3xl sm:text-4xl">
              Platform dashboard
            </h1>
            <p className="stats-text mt-2 max-w-2xl">
              Users, account groups, transactions, and category activity across
              the whole Budget App.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="stats-text">
              Updated {formatDate(data.generatedAt)}
            </span>
            <button
              type="button"
              onClick={() => void refetch()}
              disabled={isFetching}
              className="inline-flex items-center gap-2 rounded-xl border border-[var(--card-border)] px-4 py-2 text-sm font-semibold transition hover:border-sky-500/50 hover:text-sky-500 disabled:cursor-not-allowed disabled:opacity-60"
              style={{
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-primary)',
              }}
            >
              <RefreshCw
                className={`h-4 w-4 ${isFetching ? 'animate-spin' : ''}`}
              />
              {isFetching ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </header>

        <section
          className="grid gap-4 sm:grid-cols-3"
          aria-label="Platform metrics"
        >
          <MetricCard
            label="Total users"
            value={formatNumber(totals.userCount)}
            detail="Registered accounts"
            icon={Users}
            tone="sky"
          />
          <MetricCard
            label="Active groups"
            value={formatNumber(totals.activeGroupCount)}
            detail={`${formatNumber(totals.totalGroupCount)} groups total · ${formatNumber(
              totals.categoryCount,
            )} categories`}
            icon={Layers}
            tone="emerald"
          />
          <MetricCard
            label="Transactions"
            value={formatNumber(totals.transactionCount)}
            detail={`${formatAmount(totals.transactionVolume)} total volume`}
            icon={ArrowLeftRight}
            tone="amber"
          />
        </section>

        <section className="space-y-4" aria-labelledby="users-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2
                id="users-heading"
                className="text-xl font-semibold text-[var(--text-primary)]"
              >
                Users &amp; account progress
              </h2>
              <p className="stats-text mt-1">
                Expand a row to inspect details. Transaction counts use rolling
                windows: last 7 days, last month, and last year.
              </p>
            </div>

            <label className="relative w-full sm:w-72">
              <span className="sr-only">Search users</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search name, email, or role"
                className="search-input"
                style={{ paddingLeft: '2.5rem', margin: 0 }}
              />
            </label>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-12 text-center">
              <Users className="h-10 w-10 text-[var(--text-secondary)]" />
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {data.users.length === 0 ? 'No users yet' : 'No matching users'}
              </p>
              <p className="stats-text max-w-md">
                {data.users.length === 0
                  ? 'Once someone signs up, their groups and transaction activity will appear here.'
                  : 'Try a different name, email, or role.'}
              </p>
            </div>
          ) : (
            <div className="table-container">
              <div className="overflow-x-auto">
                <table
                  className="app-table min-w-[980px]"
                  style={{ textAlign: 'left' }}
                >
                  <thead>
                    <tr>
                      <th scope="col">User</th>
                      <th scope="col">Role</th>
                      <th scope="col">Groups</th>
                      <th scope="col" style={{ textAlign: 'center' }}>
                        Weekly
                      </th>
                      <th scope="col" style={{ textAlign: 'center' }}>
                        Monthly
                      </th>
                      <th scope="col" style={{ textAlign: 'center' }}>
                        Yearly
                      </th>
                      <th scope="col" style={{ textAlign: 'right' }}>
                        Volume
                      </th>
                      <th scope="col" style={{ textAlign: 'right' }}>
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => {
                      const isExpanded = expandedUserId === user.userId;

                      return (
                        <Fragment key={user.userId}>
                          <tr
                            className="cursor-pointer transition hover:bg-sky-500/5"
                            onClick={() =>
                              setExpandedUserId(
                                isExpanded ? null : user.userId,
                              )
                            }
                          >
                            <td>
                              <div className="flex items-center gap-3">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sm font-bold text-sky-500 ring-1 ring-sky-500/20">
                                  {initials(user)}
                                </span>
                                <div className="min-w-0">
                                  <p className="truncate font-semibold text-[var(--text-primary)]">
                                    {displayName(user)}
                                  </p>
                                  <p className="truncate text-xs text-[var(--text-secondary)]">
                                    {user.email ?? 'No email'}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td>
                              <Pill
                                className={
                                  roleBadge[user.role ?? ''] ??
                                  roleBadge.Customer
                                }
                              >
                                {user.role ?? 'Customer'}
                              </Pill>
                            </td>

                            <td>
                              <div className="w-32">
                                <div className="flex items-center justify-between text-xs">
                                  <span className="font-semibold text-[var(--text-primary)]">
                                    {formatNumber(user.groupCount)}
                                  </span>
                                  <span className="text-[var(--text-secondary)]">
                                    accounts
                                  </span>
                                </div>
                                <div className="progress-track mt-1.5">
                                  <div
                                    className="progress-fill"
                                    style={{
                                      width: `${Math.min(
                                        100,
                                        (user.groupCount / maxGroups) * 100,
                                      )}%`,
                                    }}
                                  />
                                </div>
                              </div>
                            </td>

                            <td style={{ textAlign: 'center' }}>
                              <PeriodCount
                                value={user.transactionCounts.weekly}
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <PeriodCount
                                value={user.transactionCounts.monthly}
                              />
                            </td>
                            <td style={{ textAlign: 'center' }}>
                              <PeriodCount
                                value={user.transactionCounts.yearly}
                              />
                            </td>

                            <td
                              className="font-medium text-[var(--text-primary)]"
                              style={{ textAlign: 'right' }}
                            >
                              {formatAmount(user.transactionVolume)}
                            </td>

                            <td style={{ textAlign: 'right' }}>
                              <button
                                type="button"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setExpandedUserId(
                                    isExpanded ? null : user.userId,
                                  );
                                }}
                                aria-expanded={isExpanded}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--input-border)] px-2.5 py-1.5 text-xs font-semibold transition hover:border-sky-500/50 hover:text-sky-500"
                                style={{
                                  backgroundColor: 'transparent',
                                  color: 'var(--text-secondary)',
                                }}
                              >
                                {isExpanded ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                                {isExpanded ? 'Hide' : 'View'}
                              </button>
                            </td>
                          </tr>

                          {isExpanded ? (
                            <tr>
                              <td
                                colSpan={8}
                                className="bg-sky-500/5"
                                style={{ padding: 0 }}
                              >
                                <UserDetail
                                  user={user}
                                  maxCategoryAmount={maxCategoryAmount}
                                />
                              </td>
                            </tr>
                          ) : null}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
