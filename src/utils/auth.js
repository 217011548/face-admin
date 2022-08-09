const TokenKey = 'Authorization-Token';

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function clearToken() {
  return localStorage.removeItem(TokenKey);
}

export function setToken(token) {
  localStorage.setItem(TokenKey,token);
}

export function set(key, value) {
  if (key === undefined || key === '') {
    return;
  }
  localStorage.setItem(key, JSON.stringify(value))
}

export function get(key) {
  return localStorage.getItem(key)
}
