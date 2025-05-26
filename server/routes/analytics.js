const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const ScanResult = require('../models/ScanResult');


// Middleware to protect routes (assume JWT middleware is available)
const authMiddleware = require('../middleware/auth');

// GET /api/analytics
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = req.user._id;
        console.log(user);

        // Get user's projects
        const projects = await Project.find({ user }).select('_id');

        const projectIds = projects.map(p => p._id);

        const [
            totalProjects,
            totalScans,
            severityStats,
            topVulnerableRepos,
            topPackages,
            scanTrends,
            cweStats,
            ecosystemStats
        ] = await Promise.all([
            Project.countDocuments({ user }),
            ScanResult.countDocuments({ projectId: { $in: projectIds } }),

            // Severity distribution
            ScanResult.aggregate([
                { $match: { projectId: { $in: projectIds } } },
                { $unwind: '$packages' },
                { $unwind: '$packages.vulnerabilities' },
                {
                    $group: {
                        _id: '$packages.vulnerabilities.severity',
                        count: { $sum: 1 },
                    }
                }
            ]),

            // Top 5 vulnerable repositories
            ScanResult.aggregate([
                { $match: { projectId: { $in: projectIds } } },
                { $unwind: '$packages' },
                { $unwind: '$packages.vulnerabilities' },
                {
                    $group: {
                        _id: '$repoUrl',
                        vulnCount: { $sum: 1 }
                    }
                },
                { $sort: { vulnCount: -1 } },
                { $limit: 5 }
            ]),

            // Most common vulnerable packages
            ScanResult.aggregate([
                { $match: { projectId: { $in: projectIds } } },
                { $unwind: '$packages' },
                {
                    $group: {
                        _id: '$packages.name',
                        count: { $sum: 1 }
                    }
                },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]),

            // Scan trends over time (last 7 days)
            ScanResult.aggregate([
                {
                    $match: {
                        projectId: { $in: projectIds },
                        scannedAt: {
                            $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$scannedAt' }
                        },
                        count: { $sum: 1 }
                    }
                },
                { $sort: { _id: 1 } }
            ]),

            // Top CWE IDs
            ScanResult.aggregate([
                { $match: { projectId: { $in: projectIds } } },
                { $unwind: '$packages' },
                { $unwind: '$packages.vulnerabilities' },
                { $unwind: '$packages.vulnerabilities.cwe_ids' },
                {
                    $group: {
                        _id: '$packages.vulnerabilities.cwe_ids',
                        count: { $sum: 1 }
                    }
                },
                { $sort: { count: -1 } },
                { $limit: 5 }
            ]),

            // Ecosystem stats
            ScanResult.aggregate([
                { $match: { projectId: { $in: projectIds } } },
                { $unwind: '$packages' },
                {
                    $group: {
                        _id: '$packages.ecosystem',
                        count: { $sum: 1 }
                    }
                }
            ])
        ]);

        res.json({
            totalProjects,
            totalScans,
            severityStats: formatAgg(severityStats, 'severity'),
            topVulnerableRepos,
            topPackages,
            scanTrends,
            cweStats,
            ecosystemStats
        });

    } catch (err) {
        console.error('Analytics error:', err);
        res.status(500).json({ message: 'Failed to load analytics' });
    }
});

// Format aggregation data into readable key-value pairs
function formatAgg(arr, labelKey = 'label') {
    const out = {};
    arr.forEach(item => {
        const key = item._id || 'Unknown';
        out[key] = item.count;
    });
    return out;
}

module.exports = router;
