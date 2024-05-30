/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const isLocalStorageAvailable =
    typeof window !== "undefined" && window.localStorage;
  const isSessionStorageAvailable =
    typeof window !== "undefined" && window.sessionStorage;

  const storedAuth =
    (isLocalStorageAvailable && localStorage.getItem("auth")) ||
    (isSessionStorageAvailable && sessionStorage.getItem("auth"));
  const storedUserType =
    (isLocalStorageAvailable && localStorage.getItem("userType")) ||
    (isSessionStorageAvailable && sessionStorage.getItem("userType"));
  const storedToken =
    (isLocalStorageAvailable && localStorage.getItem("token")) ||
    (isSessionStorageAvailable && sessionStorage.getItem("token"));

  const [isLoggedIn, setLoggedIn] = useState(storedAuth === "true");
  const [userType, setUserType] = useState(storedUserType);
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (isLoggedIn) {
      if (isLocalStorageAvailable && localStorage.getItem("auth")) {
        setLoggedIn(true);
        setUserType(localStorage.getItem("userType"));
        setToken(localStorage.getItem("token"));
      } else if (isSessionStorageAvailable && sessionStorage.getItem("auth")) {
        setLoggedIn(true);
        setUserType(sessionStorage.getItem("userType"));
        setToken(sessionStorage.getItem("token"));
      }
    }
  }, [isLoggedIn, isLocalStorageAvailable, isSessionStorageAvailable]);

  const login = (userType, token, rememberMe) => {
    setLoggedIn(true);
    setUserType(userType);
    setToken(token);

    if (rememberMe) {
      if (isLocalStorageAvailable) {
        localStorage.setItem("auth", "true");
        localStorage.setItem("userType", userType);
        localStorage.setItem("token", token);
      }
    } else {
      if (isSessionStorageAvailable) {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("userType", userType);
        sessionStorage.setItem("token", token);
      }
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
