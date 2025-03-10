import { ReactElement } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { Role } from '../Types/Role';

export function PrivateRouter({ children }: { children: ReactElement }) {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token
    const decodedToken: any = jwtDecode(token);

    // Check if the user role is customer and restrict access
    if (decodedToken.role === Role.Customer) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error('Invalid Token:', error);
    return <Navigate to="/login" />;
  }
}
