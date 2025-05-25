import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiShield } from 'react-icons/fi';
import Loader from './components/Loader';
function ScanResult() {
    const { projectId } = useParams();
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(null);
    const [meta, setMeta] = useState(null);
    const [error, setError] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchScanResult = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/api/scan/${projectId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setResult(res.data.scanResults[0]);
                setMeta(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load scan result');
            } finally {
                setLoading(false);
            }
        };

        fetchScanResult();
    }, [projectId]);

    const getSeverityClass = (severity) => {
        switch (severity?.toUpperCase()) {
            case 'HIGH':
                return 'bg-red-600 text-white';
            case 'MODERATE':
            case 'MEDIUM':
                return 'bg-yellow-400 text-black';
            case 'LOW':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-400 text-white';
        }
    };

    return (
        <div className="min-h-screen w-full bg-slate-900 text-white  overflow-x-hidden ">
            <motion.div
                className="mx-auto bg-slate-800 mt-15  p-4 sm:p-8 w-full  overflow-x-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* <motion.div
                    className="flex items-center justify-center mb-8 gap-3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <FiShield className="text-4xl sm:text-5xl text-blue-400 animate-pulse" />
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                        Scan Results
                    </h1>
                </motion.div> */}

                {loading && <Loader />}
                {error && <p className="text-red-400 text-center">{error}</p>}

                {result && (
                    <>
                        <motion.div
                            className="flex items-center justify-center mb-8 gap-3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <FiShield className="text-4xl sm:text-5xl text-blue-400 animate-pulse" />
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
                                Scan Results
                            </h1>
                        </motion.div>
                        <div>
                            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center break-words">
                                Results for <code className="text-blue-400 break-all">{meta.repoUrl}</code>
                            </h2>

                            {result.packages.length === 0 ? (
                                <p className="text-green-400 text-center font-medium text-lg">
                                    ✅ No vulnerabilities found.
                                </p>
                            ) : (
                                <div className="space-y-6">
                                    {result.packages.map((pkg, idx) => (
                                        <motion.div
                                            key={idx}
                                            className="bg-slate-700 p-4 sm:p-6 rounded-2xl shadow-md overflow-x-auto"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                        >
                                            <h3 className="text-xl sm:text-2xl font-bold mb-4">
                                                📦 {pkg.name}{' '}
                                                <span className="text-gray-400 text-sm">({pkg.version})</span>
                                            </h3>

                                            {pkg.vulnerabilities.length === 0 ? (
                                                <p className="text-green-400">✅ No known vulnerabilities</p>
                                            ) : (
                                                <ul className="space-y-5">
                                                    {pkg.vulnerabilities.map((vuln, i) => (
                                                        <li
                                                            key={i}
                                                            className="bg-slate-600 p-4 sm:p-5 rounded-xl border border-slate-500 shadow"
                                                        >
                                                            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                                                                <span
                                                                    className={`text-xs font-bold px-2 py-1 rounded ${getSeverityClass(
                                                                        vuln.severity
                                                                    )}`}
                                                                >
                                                                    {vuln.severity || 'UNKNOWN'}
                                                                </span>
                                                                <a
                                                                    href={`https://osv.dev/vulnerability/${vuln.id}`}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-sm text-blue-400 underline break-all"
                                                                >
                                                                    View Advisory ↗
                                                                </a>
                                                            </div>

                                                            <div className="mt-2 space-y-1 text-sm break-words">
                                                                <p>
                                                                    <strong>🆔 ID:</strong> {vuln.id}
                                                                </p>
                                                                {vuln.aliases?.length > 0 && (
                                                                    <p>
                                                                        <strong>🪪 CVE ID:</strong>{' '}
                                                                        {vuln.aliases
                                                                            .filter((a) => a.startsWith('CVE'))
                                                                            .join(', ') || 'N/A'}
                                                                    </p>
                                                                )}
                                                                {vuln.cwe_ids?.length > 0 && (
                                                                    <p>
                                                                        <strong>🧱 CWE ID:</strong>{' '}
                                                                        {vuln.cwe_ids.join(', ')}
                                                                    </p>
                                                                )}
                                                                {vuln.details && (
                                                                    <p className="text-gray-300">
                                                                        <strong>📝 Details:</strong> {vuln.details}
                                                                    </p>
                                                                )}
                                                                {vuln.summary && (
                                                                    <p className="text-gray-300">
                                                                        <strong>🧾 Summary:</strong> {vuln.summary}
                                                                    </p>
                                                                )}
                                                                {vuln.references?.length > 0 && (
                                                                    <div className="text-xs text-gray-400 mt-2 space-y-1 break-all">
                                                                        {vuln.references.map((ref, rIdx) => (
                                                                            <div key={rIdx}>
                                                                                🔗{' '}
                                                                                <a
                                                                                    href={ref.url}
                                                                                    target="_blank"
                                                                                    rel="noreferrer"
                                                                                    className="underline text-blue-300 text-sm break-all"
                                                                                >
                                                                                    {ref.url}
                                                                                </a>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>

                )}
            </motion.div>
        </div>
    );
}

export default ScanResult;
