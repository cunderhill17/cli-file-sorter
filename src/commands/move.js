const { normalizePath } = require('../utils/paths');
const { prompt } = require('../utils/userPrompts');
const { dirExists, createDir } = require('../utils/dirCreation');


const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);

async function moveFilesInstructions({userCommand}) {

    const userInput = await prompt('move');
    await directoryCreation(userInput);

    const [newCommand, ...rest] = await prompt('noCommand');
    !newCommand ? process.exit(0) : userCommand(newCommand);

}


async function directoryCreation(args) {
    let [currentDir, newDir, ...rest] = args;

    currentDir = normalizePath(currentDir);
        
    while(!currentDir || !newDir || rest.length === 0) {
        console.log('Usage: <starting directory path> <new directory> <file extensions>');
        let newInput = await prompt('move');
        [currentDir, newDir, ...rest] = newInput;
        currentDir = normalizePath(currentDir);
    }

    while (!dirExists(currentDir)) {
        const userInput = await prompt('correctDir');
        [currentDir] = userInput;
        currentDir = normalizePath(currentDir);
    }

    try {
        createDir(currentDir, newDir);
        moveMyFiles(currentDir, newDir, rest);
    } catch (err) {
        console.log(err)
    }

}


function moveMyFiles(currentDir, newDir, rest) {
    let count = 0;

    const cleanExtensions = [...new Set(
        rest.map(item => item.replace(/\./g, ''))
    )];

    console.log(cleanExtensions);
    
    let fileGroup = fs.readdirSync(currentDir).filter(file => {
        const fullPath = path.join(currentDir, file);

        return (
            fs.statSync(fullPath).isFile() &&
            file !== currentFile
        );
    });

    console.log(fileGroup);

    const files = fileGroup.filter(file => (
        cleanExtensions.some(ext => file.endsWith(`.${ext}`))
    ));

    if (files.length === 0) {
        console.log('There are no files that match the extension(s) in the current directory.');
        console.log(`Please check that the extensions are correct: ${rest}`);
        return;
    }

    for (const file of files) {
        let oldPath = path.join(currentDir, file); 
        let targetDir = path.resolve(currentDir, newDir);
        let newPath = path.join(targetDir, file);

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