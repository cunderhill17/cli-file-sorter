const path = require('path');

function normalizePath(inputPath) {
    return path.resolve(inputPath);
}

module.exports = {
    normalizePath
};