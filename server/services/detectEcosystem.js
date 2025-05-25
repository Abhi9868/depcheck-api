const fs = require('fs');
const path = require('path');

function detectEcosystem(projectPath) {
    if (fs.existsSync(path.join(projectPath, 'package.json'))) return 'npm';
    if (fs.existsSync(path.join(projectPath, 'requirements.txt'))) return 'PyPI';
    if (fs.existsSync(path.join(projectPath, 'go.mod'))) return 'Go';
    if (fs.existsSync(path.join(projectPath, 'Cargo.lock'))) return 'crates.io';
    return null;
}

module.exports = detectEcosystem;
