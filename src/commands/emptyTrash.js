const { prompt } = require('../utils/userPrompts');

const fs = require('fs');
const path = require('path');


const trashBin = path.resolve(__dirname, '..', '..', 'trash');

async function emptyTrashBin({userCommand}) {

    const [emptyTrashConfirmation, ...unusedInputConfirmation] = await prompt('emptyTrash');

    if (emptyTrashConfirmation?.toLowerCase() === 'y') {
        await permanentlyDeleteFiles();
    }

    const [newCommand, ...unusedInputNewCommand] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);

}

async function permanentlyDeleteFiles() {
    let count = 0;
    let files = fs.readdirSync(trashBin).filter(file => file !== '.gitkeep');

    for (const file of files) {
        const deletePath = path.join(trashBin, file);
        
        try {
            fs.unlinkSync(deletePath);
            count++;
        } catch(err) {
            console.log(`\nFailed to permanently delete: ${file}\n`, err);
        }
    }

    console.log(`\n${count} file(s) have been permanently deleted.\n`)
}




module.exports = {
    emptyTrashBin
}