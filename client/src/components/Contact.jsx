import React from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
    return (
        <section className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex flex-col items-center justify-center px-6 py-30 relative overflow-auto">
            {/* Background Gradient Circles */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-28 -left-24 h-96 w-96 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-400 rounded-full blur-3xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute -bottom-28 -right-24 h-96 w-96 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse-slow-reverse"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl w-full text-center flex flex-col items-center">
                <h1 className="text-5xl font-extrabold mb-6 text-pink-500 tracking-tight">
                    Contact <span className="text-white">Us</span>
                </h1>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-14">
                    We’d love to hear from you! Whether you have questions, feedback, or want to collaborate, get in touch using the info below or send us a message directly.
                </p>

                {/* Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-16 w-full max-w-3xl">
                    <ContactCard
                        icon={<FaEnvelope />}
                        title="Email"
                        info="support@depcheck.io"
                    />
                    <ContactCard
                        icon={<FaPhone />}
                        title="Phone"
                        info="+1 (555) 123-4567"
                    />
                    <ContactCard
                        icon={<FaMapMarkerAlt />}
                        title="Location"
                        info="San Francisco, CA"
                    />
                </div>

                {/* Contact Form */}
                <form className="w-full max-w-xl bg-gray-800 rounded-xl p-8 shadow-lg flex flex-col gap-6">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="bg-gray-900 text-white rounded-md px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <input
                        type="email"
                        placeholder="Your Email"
                        className="bg-gray-900 text-white rounded-md px-4 py-3 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="bg-gray-900 text-white rounded-md px-4 py-3 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                        type="submit"
                        className="self-center mt-4 inline-flex items-center gap-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-lg px-8 py-3 rounded-lg shadow-md transition-all"
                    >
                        <FaPaperPlane className="animate-bounce" />
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

const ContactCard = ({ icon, title, info }) => (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg flex flex-col items-center gap-4 hover:scale-105 transition-transform duration-300">
        <div className="text-pink-500 text-4xl animate-bounce">{icon}</div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-400">{info}</p>
    </div>
);

export default ContactUs;
