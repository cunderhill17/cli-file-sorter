const path = require('path');

function normalizePath(inputPath) {
    return path.resolve(inputPath);
}


function extensionCleanup(extensions) {
    if (!Array.isArray(extensions)) {
        extensions = [extensions];
    }

    return [...new Set(
        extensions.map(item => item.replace(/\./g, '').toLowerCase().trim())
    )];
}


module.exports = {
    normalizePath,
    extensionCleanup
};