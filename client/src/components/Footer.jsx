import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-6  relative">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Info */}
                <div className="mb-6 md:mb-0 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-pink-500 mb-2">DepCheck</h2>
                    <p className="max-w-sm text-sm text-gray-400">
                        Secure your projects by detecting vulnerabilities and staying ahead of threats.
                    </p>
                </div>

                {/* Links */}
                <nav className="flex gap-8 text-gray-400 text-sm font-medium mb-6 md:mb-0">
                    <a href="#features" className="hover:text-pink-500 transition">Features</a>
                    <a href="/login" className="hover:text-pink-500 transition">Login</a>
                    <a href="/about" className="hover:text-pink-500 transition">About</a>
                    <a href="/contact" className="hover:text-pink-500 transition">Contact</a>
                </nav>

                {/* Social Icons */}
                <div className="flex gap-6 text-gray-400">
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-pink-500 transition text-2xl">
                        <FaGithub />
                    </a>
                    <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-pink-500 transition text-2xl">
                        <FaTwitter />
                    </a>
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-pink-500 transition text-2xl">
                        <FaLinkedin />
                    </a>
                </div>
            </div>

            <div className="mt-10 text-center text-gray-500 text-xs">
                &copy; {new Date().getFullYear()} DepCheck. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
