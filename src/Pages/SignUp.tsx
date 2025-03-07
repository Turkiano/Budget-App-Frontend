import { Link } from 'react-router-dom';
import api from '../api/api';
import { ChangeEvent, FormEvent, useState } from 'react';

export function SignUp() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  console.log('user inputs:', user);

  const handleSignUp = async () => {
    try {
      const res = await api.post('/users/signup', user);
      return res.data;
    } catch (error) {
      console.error('Sign-up error:', error);
      setError('Something went wrong! Please try again.');
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
    setError(null); // Reset error state
    await handleSignUp();
  };

  return (
    <div className="SignUpContainer">
      <h1>SignUp Page</h1>
      <div className="SignUpForm">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="firstName"
              value={user.firstName}
              onChange={handleChange}
            />
            <input
              name="lastName"
              type="text"
              placeholder="lastName"
              value={user.lastName}
              onChange={handleChange}
            />
            <input
              name="phone"
              type="text"
              placeholder="phone"
              value={user.phone}
              onChange={handleChange}
            />
            <input
              name="email"
              type="email"
              placeholder="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="password"
              value={user.password}
              onChange={handleChange}
            />
          </div>
          {error && <p className="error-message">{error}</p>}

          <button type="submit">SignUp</button>
          <p>
            Have an Account <Link to="/login"> Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
