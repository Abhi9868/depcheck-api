import React from "react";
import {
    FaUsers,
    FaLightbulb,
    FaHandsHelping,
    FaRocket,
} from "react-icons/fa";

const AboutUs = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-30 relative overflow-auto">
            {/* Background Gradient Circles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-28 -left-24 h-96 w-96 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-28 -right-24 h-96 w-96 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-slow-reverse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center">
                <h1 className="text-5xl font-extrabold mb-6 text-pink-500 tracking-tight">
                    About <span className="text-white">DepCheck</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-14">
                    At DepCheck, we are passionate about helping developers secure their projects by making dependency vulnerability management simple and automated. Our mission is to empower you with the best tools to protect your apps and stay compliant.
                </p>

                {/* Features with animated icons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto text-center">
                    <FeatureCard
                        icon={<FaUsers />}
                        title="Community Driven"
                        description="Built with feedback and contributions from thousands of developers worldwide."
                    />
                    <FeatureCard
                        icon={<FaLightbulb />}
                        title="Innovative"
                        description="Cutting-edge scanning techniques and smart analytics to detect threats."
                    />
                    <FeatureCard
                        icon={<FaHandsHelping />}
                        title="Supportive"
                        description="Committed to assisting you with integrations, fixes, and best practices."
                    />
                    <FeatureCard
                        icon={<FaRocket />}
                        title="Fast & Reliable"
                        description="Rapid scans with minimal performance impact, so you can move fast and stay secure."
                    />
                </div>
            </div>
        </section>
    );
};

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
            <div className="text-pink-500 text-5xl animate-bounce">{icon}</div>
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-gray-400 text-center">{description}</p>
        </div>
    );
};

export default AboutUs;
