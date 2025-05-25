import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBug, FaLock, FaShieldAlt, FaChartLine, FaCogs, FaCloudUploadAlt } from "react-icons/fa";
import { SiDependabot } from "react-icons/si";

const Hero = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-start overflow-auto relative px-6 pt-30 pb-20">
            {/* Gradient Background Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-20 h-80 w-80 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
                <div className="absolute -bottom-24 -right-20 h-80 w-80 bg-gradient-to-r from-pink-500 via-red-600 to-yellow-500 rounded-full blur-3xl opacity-30 animate-pulse-slow-reverse"></div>
            </div>

            {/* Hero Content */}
            <div className="text-center z-10 animate-fade-in max-w-4xl w-full">
                <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                    Secure Your Code with <span className="text-pink-500">DepCheck</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10">
                    Automatically scan your project dependencies to identify known vulnerabilities, outdated packages, and potential security threats.
                </p>

                {/* Icons Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-white text-center mb-12">
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
                        <FaBug className="text-4xl text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Detect Vulnerabilities</h3>
                        <p className="text-gray-400">Identify known bugs and CVEs in third-party packages.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
                        <FaLock className="text-4xl text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Ensure Compliance</h3>
                        <p className="text-gray-400">Stay compliant with the latest security standards and avoid risky licenses.</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300">
                        <FaShieldAlt className="text-4xl text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Protect Your App</h3>
                        <p className="text-gray-400">Mitigate threats early before they impact your system or users.</p>
                    </div>
                </div>

                {/* Additional Features List */}
                <div className="text-left text-gray-300 mb-12 max-w-3xl mx-auto">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">More Powerful Features</h2>
                    <ul className="list-disc list-inside space-y-4 text-base sm:text-lg">
                        <li className="flex items-start gap-3">
                            <FaChartLine className="text-pink-500 text-xl sm:text-2xl mt-1" />
                            <span>Advanced Analytics and Reporting to monitor vulnerability trends.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCogs className="text-pink-500 text-xl sm:text-2xl mt-1" />
                            <span>Customizable Alerts and automated fixes via pull requests.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <FaCloudUploadAlt className="text-pink-500 text-xl sm:text-2xl mt-1" />
                            <span>Seamless Integration with CI/CD pipelines for continuous security.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <SiDependabot className="text-pink-500 text-xl sm:text-2xl mt-1" />
                            <span>Dependabot support for easy dependency updates.</span>
                        </li>
                    </ul>
                </div>


                {/* Call to Action */}
                <button
                    onClick={() => navigate("/login")}
                    className="btn-grad">
                    Get Started
                </button>
            </div>
        </section>
    );
};

export default Hero;
