const TOKEN_KEY = "adminToken";

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function authFetch(url, options = {}) {
  const token = getToken();
  const headers = {
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return fetch(url, { ...options, headers });
}
