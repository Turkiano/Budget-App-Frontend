import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

export function PrivateRouter({ children }: { children: ReactElement }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodeJwt = (t: string): Record<string, unknown> | null => {
      try {
        const payload = t.split('.')[1];
        const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
        return JSON.parse(decoded) as Record<string, unknown>;
      } catch {
        return null;
      }
    };

    const decodedToken = decodeJwt(token);
    if (!decodedToken) {
      throw new Error('Invalid token payload');
    }

    return children;
  } catch (error) {
    console.error('Invalid Token:', error);
    return <Navigate to="/login" />;
  }
}
