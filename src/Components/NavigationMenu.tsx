import { Link } from 'react-router-dom';
import '../Styling/NavigationMenu.css';
import { jwtDecode } from 'jwt-decode';
import { Role } from '../Types/Role';

export function NavigationMenu() {
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
        {/* Show Dashboard only if user is Admin */}
        {userRole === Role.Admin && <Link to="/dashboard">Dashboard</Link>}{' '}
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
    </nav>
  );
}
