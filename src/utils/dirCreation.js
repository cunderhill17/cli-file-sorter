const fs = require('fs');
const path = require('path');

function dirExists(dir) {
    return fs.existsSync(dir);
}

function createDir(currentDir, newDir) {
    const createdDir = path.resolve(currentDir, newDir);
    fs.mkdirSync(createdDir, { recursive: true });
}

module.exports = {
    dirExists,
    createDir
}