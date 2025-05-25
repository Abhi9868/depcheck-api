const axios = require("axios");
const ScanResult = require("../models/ScanResult");
const cloneRepo = require("./cloneRepo");
const detectEcosystem = require("./detectEcosystem");
const parseDependencies = require("./parseDependencies");
const fs = require("fs");
const path = require("path");

async function queryOSV(name, version, ecosystem) {
    const res = await axios.post("https://api.osv.dev/v1/query", {
        package: { name, ecosystem },
        version
    });
    return res.data.vulns || [];
}

async function scanRepository(repoUrl, token) {
    const basePath = await cloneRepo(repoUrl, token);
    console.log("Cloned repository to:", basePath);

    const ecosystem = detectEcosystem(basePath);
    console.log("Detected ecosystem:", ecosystem);
    if (!ecosystem) throw new Error("Unsupported ecosystem");

    const deps = parseDependencies(ecosystem, basePath);
    console.log("Parsed dependencies:", deps);

    const packages = [];

    for (const [name, versionRaw] of Object.entries(deps)) {
        const version = versionRaw.replace(/^[^0-9]*/, '').trim(); // Normalize version
        if (!version) continue;

        const vulns = await queryOSV(name, version, ecosystem);
        const parsedVulns = vulns.map(v => ({
            id: v.id,
            summary: v.summary,
            details: v.details,
            severity: v.database_specific?.severity || 'UNKNOWN',
            cwe_ids: v.database_specific?.cwe_ids || [],
            aliases: v.aliases || [],
            references: v.references || [],
            published: v.published ? new Date(v.published) : null,
            modified: v.modified ? new Date(v.modified) : null,
        }));

        packages.push({ name, version, ecosystem, vulnerabilities: parsedVulns });
    }

    // const result = await ScanResult.create({ repoUrl, packages });

    // Save detailed scan result to file
    fs.writeFileSync(path.join(basePath, "vulns.json"), JSON.stringify(packages, null, 2));

    // Cleanup cloned repo
    fs.rmSync(basePath, { recursive: true, force: true });

    return packages;
}

module.exports = { scanRepository };
