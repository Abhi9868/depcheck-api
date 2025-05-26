import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { MdQrCodeScanner } from "react-icons/md";
import { LuScanFace } from "react-icons/lu";
import api from "../api/axios";


export default function AddProject() {
    const [repoUrl, setRepoUrl] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [scanningId, setScanningId] = useState(null);
    const [error, setError] = useState('');
    const [projects, setProjects] = useState([]);

    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error('Failed to fetch projects', err);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.post('/projects', {
                repoUrl,
                accessToken: accessToken || undefined,
            });

            await fetchProjects();
            setRepoUrl('');
            setAccessToken('');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to add project');
        } finally {
            setLoading(false);
        }
    };

    const handleScan = async (project) => {
        setScanningId(project._id);
        try {
            await axios.post(
                'http://localhost:3000/api/scan',
                { repoUrl: project.repoUrl, accessToken: project.accessToken || '' },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            await fetchProjects();
            alert('Scan complete');
        } catch (err) {
            alert('Scan failed');
            console.error(err);
        } finally {
            setScanningId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-30 pb-5 px-6 md:px-20">
            <motion.div
                className="max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-3xl font-bold mb-6 text-center text-gradient bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                    📁 Add GitHub Project
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 glass-card p-6 rounded-xl shadow-lg border border-slate-700">
                    <input
                        type="text"
                        placeholder="GitHub Repo URL"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Access Token (optional)"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        type="submit"
                        className="btn-grad w-full text-white font-semibold py-3 rounded-lg transition-all"
                        disabled={loading}
                        style={{
                            backgroundImage: 'linear-gradient(to right, #8e2de2, #4a00e0)',
                            backgroundSize: '200% auto',
                        }}
                    >
                        {loading ? 'Adding Project...' : '🚀 Add Project'}
                    </button>
                </form>

                {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

                <h2 className="text-2xl font-semibold mt-10 mb-4 text-center text-purple-400">📦 Your Projects</h2>

                {projects.length === 0 ? (
                    <p className="text-gray-500 text-center">No projects added yet.</p>
                ) : (
                    <div className="overflow-x-auto mt-4">
                        <motion.table
                            className="w-full text-sm border border-slate-700 rounded-lg overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <thead className="bg-slate-800 text-gray-300">
                                <tr>
                                    <th className="px-4 py-3 text-left border border-slate-700">Repo URL</th>
                                    <th className="px-4 py-3 text-left border border-slate-700">Last Scan</th>
                                    <th className="px-4 py-3 text-left border border-slate-700">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project) => (
                                    <tr
                                        key={project._id}
                                        className="bg-slate-900 hover:bg-slate-800 transition"
                                    >
                                        <td
                                            className="px-4 py-3 border border-slate-700 text-blue-400 hover:underline cursor-pointer"
                                            onClick={() => navigate(`/result/${project._id}`)}
                                        >
                                            {project.repoUrl}
                                        </td>
                                        <td className="px-4 py-3 border border-slate-700">
                                            {project.lastScannedAt
                                                ? new Date(project.lastScannedAt).toLocaleString()
                                                : 'Not scanned'}
                                        </td>
                                        <td className="px-4 py-3 border border-slate-700">
                                            <button
                                                onClick={() => handleScan(project)}
                                                className={`text-white py-1 px-4 rounded-full text-sm transition ${scanningId === project._id
                                                    ? 'bg-gray-600 cursor-not-allowed'
                                                    : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90'
                                                    }`}
                                                disabled={scanningId === project._id}
                                            >
                                                {/* {scanningId === project._id ? `${<MdQrCodeScanner />}Scaning..` : <MdQrCodeScanner />} */}
                                                {scanningId === project._id ? (
                                                    <span className="flex items-center gap-2 text-yellow-400">
                                                        <MdQrCodeScanner className="animate-pulse" />
                                                        Scanning...
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center gap-2">
                                                        <LuScanFace className="animate-pulse" />
                                                        Scan
                                                    </span>
                                                )}

                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </motion.table>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
