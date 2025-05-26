import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaBug, FaProjectDiagram } from "react-icons/fa";
import { Bar, Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import api from "../api/axios";
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get("/analytics");
                setData(res.data);
            } catch (err) {
                console.error("Error fetching dashboard data", err);
            }
        };

        fetchData();
    }, [token]);

    if (!data) {
        return (
            <div className="flex justify-center items-center min-h-screen text-pink-400 text-xl">
                Loading dashboard...
            </div>
        );
    }

    const severityColors = {
        CRITICAL: "#dc2626",   // Red (danger)
        HIGH: "#f97316",       // Orange (warning)
        MODERATE: "#eab308",   // Yellow (caution)
        LOW: "#10b981",        // Green (low risk)
        UNKNOWN: "#3b82f6",    // Blue (unknown/info)
    };

    const severityData = {
        labels: Object.keys(data.severityStats),
        datasets: [
            {
                data: Object.values(data.severityStats),
                backgroundColor: Object.keys(data.severityStats).map((key) => severityColors[key]),
                borderWidth: 1,
            },
        ],
    };

    const scanTrendsData = {
        labels: data.scanTrends.map((s) => s._id),
        datasets: [
            {
                label: "Scans",
                data: data.scanTrends.map((s) => s.count),
                backgroundColor: "#ec4899",
            },
        ],
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen pt-30 pb-2.5 px-4 md:px-10">
            <h1 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-500 to-fuchsia-500 mb-10">
                🧠 Vulnerability Analytics Dashboard
            </h1>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
                    <FaProjectDiagram className="text-pink-500 text-4xl" />
                    <div>
                        <p className="text-lg text-gray-300">Total Projects</p>
                        <p className="text-2xl font-bold">{data.totalProjects}</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex items-center gap-4">
                    <FaBug className="text-pink-500 text-4xl" />
                    <div>
                        <p className="text-lg text-gray-300">Total Scans</p>
                        <p className="text-2xl font-bold">{data.totalScans}</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Severity Distribution</h2>
                    <div className="w-[250px] h-[250px]">
                        <Doughnut data={severityData} />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Scan Trends</h2>
                    <div className="w-[350px] h-[250px]">
                        <Bar data={scanTrendsData} />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Top Vulnerable Repos</h2>
                    <ul className="space-y-2 text-sm">
                        {data.topVulnerableRepos.map((repo) => (
                            <li key={repo._id} className="flex justify-between">
                                <span className="truncate">{repo._id}</span>
                                <span className="text-pink-500 font-semibold">{repo.vulnCount}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Top Packages</h2>
                    <ul className="space-y-2 text-sm">
                        {data.topPackages.map((pkg) => (
                            <li key={pkg._id} className="flex justify-between">
                                <span>{pkg._id}</span>
                                <span className="text-pink-500 font-semibold">{pkg.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Top CWEs</h2>
                    <ul className="space-y-2 text-sm">
                        {data.cweStats.map((cwe) => (
                            <li key={cwe._id} className="flex justify-between">
                                <span>{cwe._id}</span>
                                <span className="text-pink-500 font-semibold">{cwe.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-pink-400">Ecosystem Stats</h2>
                    <ul className="space-y-2 text-sm">
                        {data.ecosystemStats.map((eco) => (
                            <li key={eco._id} className="flex justify-between">
                                <span>{eco._id}</span>
                                <span className="text-pink-500 font-semibold">{eco.count}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
