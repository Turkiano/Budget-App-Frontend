import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';
import { Role } from '../Types/Role';

export function PrivateRouter({ children }: { children: ReactElement }) {
  const token = localStorage.getItem('token');

  // If there's no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Decode the token payload without external lib
    const decodeJwt = (t: string) => {
      try {
        const payload = t.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded);
      } catch (e) {
        return null;
      }
    };

    const decodedToken: any = decodeJwt(token!);

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
