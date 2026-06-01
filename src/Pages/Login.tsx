import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';

export function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  // const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', user);
      return res.data;
    } catch (error) {
      // Log axios error details (status, body) for debugging
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      console.error('Login error:', err);
      if (err.response) {
        console.error('Login error response data:', err.response.data);
        console.error('Login error response status:', err.response.status);
      }
      // setError("It's either wrong email or password, Please try again.");
      return Promise.reject(new Error('Something went wrong!!'));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // setError(null); // Reset error state
    try {
      const token = await handleLogin();

      if (!token || typeof token !== 'string') {
        throw new Error('Login did not return a valid token.');
      }

      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login submit error:', err);
    }
  };

  return (
    <div className="m-0 w-full">
      <div className=" ">
        <h1>Login Page</h1>
      </div>
      <div className="flex justify-center w-full m-auto mt-10">
        <form action="POST" onSubmit={handleSubmit}>
          <div>
            <div className="mb-4">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <Button type="submit">Login</Button>
          <p>
            Create an Account{' '}
            <Link to="/signUp" className="text-blue-600">
              {' '}
              here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
