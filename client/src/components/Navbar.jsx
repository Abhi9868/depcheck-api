import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SiParrotsecurity } from "react-icons/si";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();

    // Close menu if clicked outside
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    return (
        <nav className="w-full px-6 py-4 bg-black/60 backdrop-blur-sm text-white fixed top-0 left-0 z-50 border-b border-gray-800 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2 text-pink-500 font-bold text-2xl">
                <Link to="/" className="flex items-center">
                    <SiParrotsecurity className="w-8 h-8 mr-2" />
                    DepCheck
                </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-6 text-md font-medium">
                <Link to="/" className="hover:text-pink-400 transition">Home</Link>
                <Link to="/contact" className="hover:text-pink-400 transition">Contact</Link>
                <Link to="/about" className="hover:text-pink-400 transition">About</Link>
                <Link to="/login" className="hover:text-pink-400 transition">Login</Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden relative" ref={menuRef}>
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <svg
                        className="w-6 h-6 text-pink-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {menuOpen ? (
                            // X icon when open
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            // Hamburger icon when closed
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-black/90 backdrop-blur-md rounded-md shadow-lg flex flex-col py-2 text-sm font-medium">
                        <Link
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 hover:bg-pink-600 hover:text-white transition"
                        >
                            Home
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 hover:bg-pink-600 hover:text-white transition"
                        >
                            Contact
                        </Link>
                        <Link
                            to="/about"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 hover:bg-pink-600 hover:text-white transition"
                        >
                            About
                        </Link>
                        <Link
                            to="/login"
                            onClick={() => setMenuOpen(false)}
                            className="px-4 py-2 hover:bg-pink-600 hover:text-white transition"
                        >
                            Login
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
