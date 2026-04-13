import { apiUrl } from './api';

const TOKEN_KEY = 'nenaapic_token';

export const getToken = () => sessionStorage.getItem(TOKEN_KEY);

export const setToken = (token) => sessionStorage.setItem(TOKEN_KEY, token);

export const removeToken = () => sessionStorage.removeItem(TOKEN_KEY);

export const isAuthenticated = () => !!getToken();

// Authenticated fetch wrapper — adds Bearer token automatically
export const authFetch = async (path, options = {}) => {
  const token = getToken();
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  return fetch(apiUrl(path), { ...options, headers });
};

// Login — returns { success, token } or { error }
export const login = async (username, password) => {
  try {
    const res = await fetch(apiUrl('/api/auth/login'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (data.success && data.token) {
      setToken(data.token);
    }
    return data;
  } catch (err) {
    return { error: err.message };
  }
};

// Verify token validity
export const verifyToken = async () => {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch(apiUrl('/api/auth/verify'), {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
};

export const logout = () => {
  removeToken();
  window.location.href = '/login';
};
