import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useState } from 'react';
import api from '../api/api';

export function Login() {

  const navigator = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      const res = await api.post('/users/login', user);
      return res.data;
    } catch (error) {
      console.error('Login error:', error);
      setError("It's either wrong email or password, Please try again.");
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
    await handleLogin(); 

    const token = await handleLogin()
    if (token) {
      localStorage.setItem("token", token)
      navigator('/')
    }
  };

  

  return (
    <div className="loginContainer">
      <h1>Login Page</h1>
      <div className="loginForm">
        <form action = "POST" onSubmit={handleSubmit}>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
          <p>
            Create an Account <Link to="/signUp"> here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
