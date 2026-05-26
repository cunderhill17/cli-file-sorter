const { renameWithSequence } = require('../utils/renameSequence');
const { prompt } = require('../utils/userPrompts');


const path = require('path');
const fs = require('fs');


async function restoreDeletedFiles({userCommand}) {

    const [restoreConfirmation, ...unusedInput] = await prompt('restoreFiles');

    if (restoreConfirmation?.toLowerCase() === 'y') {
        await restoreFiles();
    }

    const [newCommand, ...unusedNewCommandInput] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);
}

async function restoreFiles() {
    let count = 0;
    const trashBin = path.resolve(__dirname, '..', '..', 'trash');
    const returnPath = process.cwd();

    let files = fs.readdirSync(trashBin).filter(file => file !== '.gitkeep');

    for (const file of files) {
        let oldPath = path.join(trashBin, file); 
        let newPath = path.join(returnPath, file);

        if (fs.existsSync(newPath)) {
            newPath = await renameWithSequence(newPath);
        }

        try {
            fs.renameSync(oldPath, newPath);
            count++;
        } catch(err) {
            console.log(`\nFailed to restore: ${file}\n`, err);
        }
    }

    console.log(`\n${count} deleted files have been restored to your current working directory\n`)

}






module.exports = {
    restoreDeletedFiles
}