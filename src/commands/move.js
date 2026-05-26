const { prompt } = require('../utils/userPrompts');
const { normalizePath } = require('../utils/paths');
const { dirExists, createDir } = require('../utils/dirCreation');
const { renameWithSequence } = require('../utils/renameSequence');


const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);

async function moveFilesInstructions({userCommand}) {

    const userInput = await prompt('move');
    await directoryCreation(userInput);

    const [newCommand, ...unusedInput] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);

}





async function directoryCreation(args) {
    let [currentDir, newDir, ...extensions] = args;

    currentDir = normalizePath(currentDir);
        
    while(!currentDir || !newDir || extensions.length === 0) {
        console.log('\nUsage: <starting directory path> <new directory> <file extensions>\n');
        let newInput = await prompt('move');
        [currentDir, newDir, ...extensions] = newInput;
        currentDir = normalizePath(currentDir);
    }

    while (!dirExists(currentDir)) {
        const userInput = await prompt('correctDir');
        [currentDir] = userInput;
        currentDir = normalizePath(currentDir);
    }

    try {
        createDir(currentDir, newDir);
        await moveMyFiles(currentDir, newDir, extensions);
    } catch (err) {
        console.log(err)
    }

}






async function moveMyFiles(currentDir, newDir, extensions) {
    let count = 0;

    const cleanExtensions = [...new Set(
        extensions.map(item => item.replace(/\./g, ''))
    )];
    
    let fileGroup = fs.readdirSync(currentDir).filter(file => {
        const fullPath = path.join(currentDir, file);

        return (
            fs.statSync(fullPath).isFile() &&
            file !== currentFile
        );
    });

    const files = fileGroup.filter(file => (
        cleanExtensions.some(ext => file.endsWith(`.${ext}`))
    ));

    if (files.length === 0) {
        console.log('\nThere are no files that match the extension(s) in the current directory.');
        console.log(`Please check that the extensions are correct: ${extensions}\n`);
        return;
    }

    for (const file of files) {
        let oldPath = path.join(currentDir, file); 
        let targetDir = path.resolve(currentDir, newDir);
        let newPath = path.join(targetDir, file);

        if (fs.existsSync(newPath)) {
            console.log(`\n${file} already exists!\n`);

            const [renameOption, ...unusedPromptInput] = await prompt('renameOptions');

            switch(renameOption) {
                case '1':
                    console.log("\nYou've elected to not move the file\n");
                    continue;
                case '2':
                    console.log("\nYou've elected to rename the file in sequence\n");
                    newPath = await renameWithSequence(newPath);
                    break;
                default:
                    continue;
            }

        }

        try {
            fs.renameSync(oldPath, newPath);
            count++;
        } catch(err) {
            console.log(`\nFailed to move: ${file}\n`, err);
        }
    }

    console.log(`\n${count} file(s) were moved\n`);
}




// EXPORTS

module.exports = {
    moveFilesInstructions
};