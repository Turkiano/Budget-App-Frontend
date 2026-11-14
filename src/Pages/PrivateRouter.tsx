import { ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { clearToken, getToken, isTokenValid } from '@/api/authToken';

export function PrivateRouter({ children }: { children: ReactElement }) {
  const token = getToken();

  if (!isTokenValid(token)) {
    clearToken();
    return <Navigate to="/login" replace />;
  }

  return children;
}
