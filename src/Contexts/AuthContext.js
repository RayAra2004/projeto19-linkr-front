import { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const persistedAuth = JSON.parse(localStorage.getItem("auth"));
  const persistedUser = JSON.parse(localStorage.getItem("user"));
  const [auth, setAuth] = useState(persistedAuth);
  const [user, setUser] = useState(persistedUser);

  function login(authData, userData) {
    setAuth(authData);
    setUser(userData);
    localStorage.setItem("auth", JSON.stringify(authData));
    localStorage.setItem("user", JSON.stringify(userData));
  }

  return (
    <AuthContext.Provider value={{ auth, login, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
