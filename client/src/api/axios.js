// src/api/axios.js
import axios from "axios";

// Create an instance
const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

// Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor to catch expired/invalid tokens
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("error", error);
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
