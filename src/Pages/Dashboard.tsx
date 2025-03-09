import { useQuery } from '@tanstack/react-query';
import { User } from '../Types/User';
import api from '../api/api';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Role } from '../Types/Role';

export function Dashboard() {

    const navigator = useNavigate()
  const token = localStorage.getItem('token') || '';

  //02.Decode the token
  const decodedToken = jwtDecode(token);
  const decodedUser: any = {};

  //02.01. To manipulate the decodedToken
  if (decodedToken) {
    for (const [key, value] of Object.entries(decodedToken)) {
      //02.02. resphare the decodedToken
      let cleanKey = '';
      if (key.startsWith('http')) {
        cleanKey = key.split('identity/claims')[1];
      } else {
        cleanKey = key;
      }

      decodedUser[cleanKey] = value;
    }
  }

  if (Role === Role.Customer) {
    return navigator("/")
  }
  console.log('decodedToken', decodedToken);
  console.log('decodedUser', decodedUser);

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get('/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error('Something went wrong'));
    }
  };

  const { data, error, isLoading } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  if (isLoading) return <p>Users Data is Loading . . . </p>;
  return (
    <>
      <div>
        <h1>Users Details</h1>
        <ul>
          {data?.map((users) => (
            <li key={users.id}>
              {users.firstName}
              {users.lastName}
              {users.email}
            </li>
          ))}
        </ul>
        {error && <p className="error">{error.message}</p>}
      </div>
    </>
  );
}
