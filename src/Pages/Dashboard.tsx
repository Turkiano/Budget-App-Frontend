import { useQuery } from '@tanstack/react-query';
import { UserTypes } from '../Types/User';
import api from '../api/api';

export function Dashboard() {
  const getCurrentUser = async () => {
    try {
      const res = await api.get('/users/me');
      return res.data as UserTypes;
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Something went wrong'));
    }
  };

  const { data: user, error, isLoading } = useQuery<UserTypes>({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });

  if (isLoading) return <p>Loading your dashboard...</p>;

  if (error) return <p className="error">{(error as Error).message}</p>;

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.firstName} {user?.lastName}!</p>
      <div>
        <h2>Your profile</h2>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        <p>Role: {user?.role}</p>
      </div>
    </div>
  );
}
