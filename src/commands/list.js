const { prompt } = require('../utils/userPrompts');
const { isHiddenSystemFiles } = require('../utils/SystemFiles');

const fs = require('fs');
const path = require('path');


async function listFiles({userCommand}) {
    const cwd = process.cwd();
    const entries = fs.readdirSync(cwd);

    for (const name of entries) {
        const fullPath = path.join(cwd, name);
        const stats = fs.lstatSync(fullPath);

        let type;
        if (stats.isSymbolicLink()) {
            type = "symlink";
        } else if (stats.isFile()) {
            type = "file";
        } else if (stats.isDirectory()) {
            type = "directory";
        } else {
            type = "extra";
        }

        if (type === 'directory' || type === 'file') {

            if (isHiddenSystemFiles(name)) {
                continue;
            }

            console.log(`[${type}] ${name}`);
        }
    }

    const [newCommand, ...unusedInput] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);
}


// EXPORTS
module.exports = {
    listFiles
};