import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SiParrotsecurity } from "react-icons/si";



const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        setError("");
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password
            });

            const token = res.data.token;
            localStorage.setItem("token", token); // Save JWT for future requests

            navigate("/add-project");
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center overflow-hidden relative">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-20 h-72 w-72 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute -bottom-24 -right-20 h-72 w-72 bg-gradient-to-r from-pink-500 via-red-600 to-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse-slow-reverse"></div>
            </div>

            {/* Content Section */}
            <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-4xl font-bold mb-2">Welcome to <span className="text-pink-500"> DepCheck</span></h1>
                <p className="text-gray-400">
                    Scan your project dependencies to detect known vulnerabilities and improve software security.
                </p>
            </div>


            {/* Form Section */}
            <div className="w-full max-w-sm space-y-4 px-4 animate-fade-in">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                    onClick={handleLogin}
                    className="flex items-center justify-center w-full px-6 py-3 my-3 bg-gray-800 rounded-lg text-lg font-medium hover:bg-gray-700 transition animate-bounce"
                >
                    <SiParrotsecurity className="mr-4 text-pink-500" />
                    Login
                </button>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
        </div>
    );
};

export default Login;
