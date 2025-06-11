"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // On initial load, check if a token exists in localStorage
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setUser({}); // Dummy user object (can be extended later with actual user data)
    }
  }, []);

  // Login function: Save token and set user state
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser({});
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    // Provide auth values (token, user, login, logout) to the entire app
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
