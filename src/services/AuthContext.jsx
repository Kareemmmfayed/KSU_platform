/* eslint-disable react/prop-types */

import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    // Check if localStorage is available
    const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;
    // Check if sessionStorage is available
    const isSessionStorageAvailable = typeof window !== 'undefined' && window.sessionStorage;

    const storedAuth = isLocalStorageAvailable ? localStorage.getItem('auth') : null;
    const [isAuthenticated, setAuthenticated] = useState(storedAuth === 'true');

    const login = (rememberMe) => {
        setAuthenticated(true);

        if (isLocalStorageAvailable && rememberMe) {
            localStorage.setItem('auth', 'true');
        } else if (isSessionStorageAvailable) {
            sessionStorage.setItem('auth', 'true');
        }
    };

    const logout = () => {
        setAuthenticated(false);

        if (isLocalStorageAvailable) {
            localStorage.removeItem('auth');
        }

        if (isSessionStorageAvailable) {
            sessionStorage.removeItem('auth');
        }
    };

    useEffect(() => {
        // Additional logic you might need on authentication state change
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
