import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';

import { ErrorBanner } from '@/Components/ErrorBanner';
import { getApiError, type ApiError } from '@/api/problemDetails';
import { useAuth } from '@/hooks/useAuth';

export function SignUp() {
  const navigator = useNavigate();
  const { signUp } = useAuth();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
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
      await signUp.mutateAsync(user);
      navigator('/login');
    } catch (err) {
      setError(getApiError(err));
    }
  };

  return (
    <div className="SignUpContainer">
      <h1>Sign Up Page</h1>
      <div className="SignUpForm">
        <form action="POST" onSubmit={handleSubmit}>
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={user.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={user.lastName}
              onChange={handleChange}
              required
            />
            <input
              name="phone"
              type="text"
              placeholder="Phone"
              value={user.phone}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>

          <ErrorBanner
            className="mb-4"
            message={error?.message}
            fieldErrors={error?.fieldErrors}
          />

          <button type="submit" disabled={signUp.isPending}>
            {signUp.isPending ? 'Creating account...' : 'Sign Up'}
          </button>
          <p>
            Have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
