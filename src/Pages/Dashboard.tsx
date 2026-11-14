import { GroupsPanel } from '@/Components/GroupsPanel';
import { getApiError } from '@/api/problemDetails';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function Dashboard() {
  const { data: user, error, isLoading } = useCurrentUser();

  if (isLoading) return <p>Loading your dashboard...</p>;

  if (error) return <p className="error">{getApiError(error).message}</p>;

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div className="page-container space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div>
        <h1>Dashboard</h1>
        <p>
          Welcome back, {user.firstName ?? ''} {user.lastName ?? ''}!
        </p>
      </div>

      <div>
        <h2>Your profile</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Role: {user.role}</p>
      </div>

      <GroupsPanel />
    </div>
  );
}
