const TOKEN_KEY = 'token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

type JwtPayload = Record<string, unknown> & {
  exp?: number;
};

function decodeBase64Url(value: string): JwtPayload | null {
  try {
    const normalized = value.replace(/-/g, '+').replace(/_/g, '/');
    const padding = '='.repeat((4 - (normalized.length % 4)) % 4);
    return JSON.parse(atob(normalized + padding)) as JwtPayload;
  } catch {
    return null;
  }
}

export function decodeToken(token: string): JwtPayload | null {
  const payload = token.split('.')[1];

  if (!payload) return null;

  return decodeBase64Url(payload);
}

/**
 * The API issues a 7-day JWT. Treat a missing/invalid payload or an expired
 * `exp` as logged out so private routes do not render with a dead token.
 */
export function isTokenValid(token: string | null): token is string {
  if (!token) return false;

  const payload = decodeToken(token);

  if (!payload) return false;

  if (typeof payload.exp === 'number') {
    return payload.exp * 1000 > Date.now();
  }

  return true;
}
