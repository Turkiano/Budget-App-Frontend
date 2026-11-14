import { type FormEvent, useState } from 'react';

import { ErrorBanner } from '@/Components/ErrorBanner';
import { getApiError, type ApiError } from '@/api/problemDetails';
import { useGroups } from '@/hooks/useGroups';

export function GroupsPanel() {
  const { groups, isLoading, error, createGroup } = useGroups();
  const [name, setName] = useState('');
  const [formError, setFormError] = useState<ApiError | null>(null);

  const queryError = error ? getApiError(error) : null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);

    const trimmedName = name.trim();

    if (!trimmedName) return;

    try {
      await createGroup.mutateAsync({ name: trimmedName });
      setName('');
    } catch (err) {
      setFormError(getApiError(err));
    }
  };

  return (
    <section className="card-container space-y-4">
      <div>
        <h2 className="balance-title">Groups</h2>
        <p className="stats-text">
          Shared spaces for categories and transactions.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 sm:flex-row"
      >
        <input
          className="form-input"
          name="groupName"
          placeholder="New group name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button
          type="submit"
          disabled={createGroup.isPending}
          className="rounded-xl bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-400 disabled:pointer-events-none disabled:opacity-50"
        >
          {createGroup.isPending ? 'Adding...' : 'Add Group'}
        </button>
      </form>

      <ErrorBanner
        message={formError?.message ?? queryError?.message}
        fieldErrors={formError?.fieldErrors ?? queryError?.fieldErrors}
      />

      {isLoading ? (
        <p className="stats-text">Loading groups...</p>
      ) : groups.length === 0 ? (
        <p className="stats-text">No groups yet. Create the first one above.</p>
      ) : (
        <ul className="space-y-2">
          {groups.map((group, index) => (
            <li
              key={group.group_id ?? `group-${index}`}
              className="rounded-xl border px-4 py-3"
              style={{
                borderColor: 'var(--card-border)',
                background: 'var(--input-bg)',
                color: 'var(--text-primary)',
              }}
            >
              <span className="font-medium">{group.name ?? 'Untitled group'}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
