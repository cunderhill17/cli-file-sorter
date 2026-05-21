const { normalizePath } = require('../utils/paths');
const { prompt } = require('../utils/userPrompts');


const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);

function moveFilesInstructions() {

    prompt('move').then((userInput) => {
        directoryCreation(userInput);
    });

}


function directoryCreation(args) {
    let [currentDir, newDir, ...rest] = args;

    currentDir = normalizePath(currentDir);

    if (!currentDir || !newDir || rest.length === 0) {
        console.log('Usage: <starting directory path> <new directory> <file extensions>');

        moveFilesInstructions();

        return;
    } else if  (fs.existsSync(currentDir)) {
        const createdDir = path.resolve(currentDir, newDir);

        try {
            fs.mkdirSync(createdDir, { recursive: true });
            moveMyFiles(currentDir, newDir, rest);

        } catch (err) {
            console.log(err);
        }

    } else {
        console.log("Please provide a correct starting directory");
    }

}


function moveMyFiles(currentDir, newDir, rest) {
    let files = [];

    const cleanExtensions = [...new Set(
        rest.map(item => item.replace(/\./g, ''))
    )];

    console.log(cleanExtensions); //program debugging

    let count = 0;
    
    let fileGroup = fs.readdirSync(currentDir).filter(file => {
        const fullPath = path.join(currentDir, file);

        return (
            fs.statSync(fullPath).isFile() &&
            file !== currentFile
        );
    });

    for (const item of cleanExtensions) {
        let dirFiles = fileGroup.filter(file => file.endsWith(`.${item}`) );
        
        files.push(...dirFiles);
    }

    console.log(files); //program debugging
    
    if (files.length > 0) {
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
    } else {
        console.log('There are no files that match the extenion(s) in the current directory.');
        console.log(`Please check that the extensions are correct: ${rest}`)
    }


}




// EXPORTS

module.exports = {
    moveFilesInstructions
};