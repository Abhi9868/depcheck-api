import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
    console.log(loading);
    console.log(user);

    if (loading) return null;    // or spinner
    if (!user) return <Navigate to="/login" replace />;
    return children;
}
