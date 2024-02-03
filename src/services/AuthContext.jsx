/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  const isSessionStorageAvailable =
    typeof window !== "undefined" && window.sessionStorage;

  const storedAuth = isLocalStorageAvailable
    ? localStorage.getItem("auth")
    : null;
  const storedUserType = isLocalStorageAvailable
    ? localStorage.getItem("userType")
    : null;
  const storedToken = isLocalStorageAvailable
    ? localStorage.getItem("token")
    : null;

  const [isLoggedIn, setLoggedIn] = useState(storedAuth === "true");
  const [userType, setUserType] = useState(storedUserType);
  const [token, setToken] = useState(storedToken);

  const login = (userType, token, rememberMe) => {
    setLoggedIn(true);
    setUserType(userType);
    setToken(token);

    if (isLocalStorageAvailable && rememberMe) {
      localStorage.setItem("auth", "true");
      localStorage.setItem("userType", userType);
      localStorage.setItem("token", token);
    } else if (isSessionStorageAvailable) {
      sessionStorage.setItem("auth", "true");
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setLoggedIn(false);
    setUserType("applicant");
    setToken(null);

    if (isLocalStorageAvailable) {
      localStorage.removeItem("auth");
      localStorage.removeItem("userType");
      localStorage.removeItem("token");
    }

    if (isSessionStorageAvailable) {
      sessionStorage.removeItem("auth");
      sessionStorage.removeItem("userType");
      sessionStorage.removeItem("token");
    }
  };

  useEffect(() => {
    // Additional logic you might need on authentication state change
  }, [isLoggedIn, userType, token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userType,
        token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

// eslint-disable-next-line react-refresh/only-export-components
export { AuthProvider, useAuth };
