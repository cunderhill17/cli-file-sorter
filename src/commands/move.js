const { normalizePath } = require('../utils/paths');

const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);



function moveFilesInstructions() {

    process.stdout.write("MOVE: <starting directory path> <new directory> <file extensions> \n\n", "UTF-8");

    moveFilesUserInput();

}

function moveFilesUserInput() {
    process.stdin.once('data', (chunk) => {
        const args = chunk.toString().trim().split(/\s+/);
        // console.log(args);

        directoryCreation(args);
    });
}



function directoryCreation(args) {
    let [currentDir, newDir, ...rest] = args;

    currentDir = normalizePath(currentDir);

    if (!currentDir || !newDir || rest.length === 0) {
        console.log('Usage: <starting directory path> <new directory> <file extensions>');

        moveFilesUserInput();

        return;
    } else if  (fs.existsSync(currentDir)) {
        const createdDir = path.resolve(currentDir, newDir);


        fs.mkdir(createdDir, { recursive: true }, (err) => {
            if (err) {
                console.log(err);
            } else {
                moveMyFiles(currentDir, newDir, rest);
            }
        });

    } else {
        console.log("Please provide a correct starting directory");
    }

}


function moveMyFiles(currentDir, newDir, rest) {
    let files = [];

    const cleanExtensions = [...new Set(
        rest.map(item => item.replace(/\./g, ''))
    )];

    console.log(cleanExtensions);

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

    console.log(files);
    
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