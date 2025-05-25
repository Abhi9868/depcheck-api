const simpleGit = require('simple-git');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { v4: uuidv4 } = require('uuid');

async function cloneRepo(repoUrl, token) {
    const tempDir = path.join(os.tmpdir(), uuidv4());
    const git = simpleGit();

    const url = token
        ? repoUrl.replace("https://", `https://${token}@`)
        : repoUrl;

    await git.clone(url, tempDir);
    return tempDir;
}

module.exports = cloneRepo;
