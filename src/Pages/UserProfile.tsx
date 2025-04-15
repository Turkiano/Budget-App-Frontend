import api from '@/api/api';
import { UserTypes } from '@/Types/User';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export function UserProfile() {
  const { userId } = useParams();

  const getUser = async () => {
    try {
      if (userId) {
        const res = await api.get(`/users/${userId}`);

        return res.data;
      }
    } catch (error) {
      console.error(error);
      return Promise.reject(new Error('Something went wrong'));
    }
  };

  const { data: user, error, isLoading } = useQuery<UserTypes>({
    queryKey: ['userDetails', userId],
    queryFn: getUser,
    enabled: !!userId,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>{(error as Error).message}</p>;

  if (!user) return <p>User was not found</p>;

  return (
    <div>
      <h1>User Details</h1>
      <p>{user.firstName} Details</p>
    </div>
  );
}
