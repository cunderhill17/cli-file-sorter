const { renameWithSequence } = require('../utils/renameSequence');
const { prompt } = require('../utils/userPrompts');


const path = require('path');
const fs = require('fs');


async function restoreDeletedFiles({userCommand}) {

    const [restoreConfirmation, ...unusedInput] = await prompt('restoreFiles');

    if (restoreConfirmation?.toLowerCase() === 'y') {
        await restoreFiles();
    }

    const [newCommand, ...rest] = await prompt('noCommand');
    !newCommand ? process.exit(0) : userCommand(newCommand);
}

async function restoreFiles() {
    const trashBin = path.resolve(__dirname, '..', '..', 'trash');
    const returnPath = process.cwd();

    let files = fs.readdirSync(trashBin);

    for (const file of files) {
        let oldPath = path.join(trashBin, file); 
        let newPath = path.join(returnPath, file);

        if (fs.existsSync(newPath)) {
            newPath = await renameWithSequence(newPath);
        }

        try {
            fs.renameSync(oldPath, newPath);
        } catch(err) {
            console.log(`Failed to restore: ${file}`, err);
        }
    }

}






module.exports = {
    restoreDeletedFiles
}