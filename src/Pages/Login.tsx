import { Link } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Label } from '@/shadcn/ui/label';
import { Input } from '@/shadcn/ui/input';
import { Button } from '@/shadcn/ui/button';

import { ErrorBanner } from '@/Components/ErrorBanner';
import { useAuth } from '@/hooks/useAuth';
import { getApiError, type ApiError } from '@/api/problemDetails';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState<ApiError | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const result = await login.mutateAsync(user);

      if (!result?.token) {
        throw new Error('Login did not return a valid token.');
      }

      navigate('/UserProfile');
    } catch (err) {
      setError(getApiError(err));
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

          <ErrorBanner
            className="mb-4"
            message={error?.message}
            fieldErrors={error?.fieldErrors}
          />

          <Button type="submit" disabled={login.isPending}>
            {login.isPending ? 'Logging in...' : 'Login'}
          </Button>
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
