// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../api/axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch current user on mount if token exists
    useEffect(() => {
        const fetchMe = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await api.get("/auth/me");

                setUser(res.data);
            } catch {
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        fetchMe();
    }, []);

    // Call this from your Login page after successful login
    const login = async (token) => {
        localStorage.setItem("token", token);
        // re-fetch profile
        try {
            const res = await api.get("/auth/me");
            setUser(res.data);
        } catch {
            setUser(null);
        }
    };

    // Call this from anywhere you need to log out (e.g. Navbar)
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {/*
        Don't render children until we've determined
        whether or not there is a logged in user.
      */}
            {!loading && children}
        </AuthContext.Provider>
    );
}

// Hook for easy access in components
export function useAuth() {
    return useContext(AuthContext);
}
