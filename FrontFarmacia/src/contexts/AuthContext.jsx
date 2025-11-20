import React, { createContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      // Attempt to decode basic user info from token payload if needed
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, firstname: payload.firstname, lastname: payload.lastname, email: payload.email, role: payload.role });
      } catch (e) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [token]);

  async function register(data) {
    setLoading(true);
    try {
      const res = await authService.register(data);
      if (res.token) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
      }
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  async function login(credentials) {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      if (res.token) {
        localStorage.setItem('token', res.token);
        setToken(res.token);
      }
      setLoading(false);
      return res;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
