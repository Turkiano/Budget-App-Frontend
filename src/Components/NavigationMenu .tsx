import { Link } from 'react-router-dom';
import '../Styling/NavigationMenu .css';


export function NavigationMenu() {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/" className="navbar-logo">
          Logo
        </Link>{' '}
      </div>

      {/* Menu Links */}
      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>

      {/* SignUp/Login Section */}
      <div className="navbar-auth">
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
