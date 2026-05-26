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
    !newCommand ? process.exit(0) : userCommand(newCommand);

}





async function directoryCreation(args) {
    let [currentDir, newDir, ...extensions] = args;

    currentDir = normalizePath(currentDir);
        
    while(!currentDir || !newDir || extensions.length === 0) {
        console.log('Usage: <starting directory path> <new directory> <file extensions>');
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
        console.log('There are no files that match the extension(s) in the current directory.');
        console.log(`Please check that the extensions are correct: ${extensions}`);
        return;
    }

    for (const file of files) {
        let oldPath = path.join(currentDir, file); 
        let targetDir = path.resolve(currentDir, newDir);
        let newPath = path.join(targetDir, file);

        if (fs.existsSync(newPath)) {
            console.log(`${file} already exists!`);

            const [renameOption, ...unusedPromptInput] = await prompt('renameOptions');
            console.log(`You've selected rename option number: ${renameOption}`);

            switch(renameOption) {
                case '1':
                    console.log("You've elected to not move the file");
                    continue;
                case '2':
                    console.log("You've elected to rename the file in sequence");
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
            console.log(`Failed to move: ${file}`, err);
        }
    }

    console.log(`${count} file(s) were moved`);
}




// EXPORTS

module.exports = {
    moveFilesInstructions
};