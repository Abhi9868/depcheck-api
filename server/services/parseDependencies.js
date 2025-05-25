const fs = require('fs');
const path = require('path');

function parseDependencies(ecosystem, basePath) {
    switch (ecosystem) {
        case 'npm': {
            const pkg = JSON.parse(fs.readFileSync(path.join(basePath, 'package.json')));
            return { ...pkg.dependencies, ...pkg.devDependencies };
        }
        case 'PyPI': {
            const lines = fs.readFileSync(path.join(basePath, 'requirements.txt'), 'utf-8').split('\n');
            console.log("lines:", lines);
            const deps = {};
            lines.forEach(line => {
                const match = line.match(/^([a-zA-Z0-9_.-]+)==([\d.]+)/);
                if (match) deps[match[1]] = match[2];
            });
            return deps;
        }
        case 'Go': {
            const lines = fs.readFileSync(path.join(basePath, 'go.mod'), 'utf-8').split('\n');
            const deps = {};
            let inRequire = false;
            lines.forEach(line => {
                if (line.includes('require (')) inRequire = true;
                else if (line.includes(')')) inRequire = false;
                else if (inRequire || line.trim().startsWith('require')) {
                    const parts = line.replace('require', '').trim().split(' ');
                    if (parts.length === 2) deps[parts[0]] = parts[1];
                }
            });
            return deps;
        }
        case 'crates.io': {
            const lines = fs.readFileSync(path.join(basePath, 'Cargo.lock'), 'utf-8').split('\n');
            const deps = {};
            let current = {};
            lines.forEach(line => {
                if (line.startsWith('[[package]]')) current = {};
                if (line.startsWith('name =')) current.name = line.split('"')[1];
                if (line.startsWith('version =')) current.version = line.split('"')[1];
                if (current.name && current.version) {
                    deps[current.name] = current.version;
                    current = {};
                }
            });
            return deps;
        }
        default: return {};
    }
}

module.exports = parseDependencies;
