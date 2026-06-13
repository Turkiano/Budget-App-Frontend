import { Link } from 'react-router-dom';
import '../Styling/NavigationMenu.css';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../Types/Role';
import '../Styling/Light.css'
import '../Styling/Dark.css';
import { useEffect, useState } from 'react';

export function NavigationMenu() {
const [theme, setTheme] = useState(
  localStorage.getItem('theme') || 'dark'
);
   useEffect(() => {
      document.body.classList.remove('dark-theme', 'light-theme');
      document.body.classList.add(
        theme === 'dark' ? 'dark-theme' : 'light-theme',
      );
    }, [theme]);

  const token = localStorage.getItem('token');
  let userRole = null;

  // Decode the token to get the user role
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Decoded Token:', decodedToken);
      // Extract the correct role key
      userRole =
        decodedToken[
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
        ];
    } catch (error) {
      console.error('Invalid Token:', error);
    }

   
  }

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>
      </div>

      {/* Menu Links */}
      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/userProfile">Profile</Link>
        {token && <Link to="/dashboard">Dashboard</Link>}
      </div>

      {/* Authentication Links */}
      <div className="navbar-auth">
        {token ? (
          <button
            onClick={() => {
              localStorage.removeItem('token'); // Clear token
              window.location.href = '/login'; // Redirect to login
            }}
          >
            Logout
          </button>
        ) : (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="rounded-lg px-3 py-2 text-black"
      >
        <option value="dark">🌙 Dark Theme</option>
        <option value="light">☀️ Light Theme</option>
      </select>
    </nav>
  );
}
