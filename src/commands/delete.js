const { prompt } = require('../utils/userPrompts');
const { normalizePath, extensionCleanup } = require('../utils/paths');
const { dirExists } = require('../utils/dirCreation');
const { renameWithSequence } = require('../utils/renameSequence');

const fs = require('fs');
const path = require('path');

const currentFile = path.basename(__filename);
const trashBin = path.resolve(__dirname, '..', '..', 'trash');


async function softDelete() {

    const [deletionMethod, ...unusedInput] = await prompt('deletionType');

    switch(deletionMethod) {
        case '1':
            console.log("You've elected to delete a single file");
            const singleInput = await prompt('deleteSingle');
            await confirmSingleFile(singleInput);
            break;
        case '2':
            console.log("You've elected to delete a batch of files");
            const batchInput = await prompt('deleteBatch');
            await confirmBatchFiles(batchInput);
            break;
        default:
            console.log("Invalid option. Returning to menu.");
            break;
    }

}


async function confirmSingleFile(singleInput) {
    let [dir, fileName, extension, ...unusedInput] = singleInput;

    while(!dir || !fileName || !extension) {
        let newInput = await prompt('deleteSingle');
        [dir, fileName, extension, ...unusedInput] = newInput;
    }

    dir = normalizePath(dir);
    const cleanExtension = extensionCleanup(extension);

    while (!dirExists(dir)) {
        const userInput = await prompt('correctDir');
        [dir] = userInput;
        dir = normalizePath(dir);
    }

    console.log(`Please confirm that you'd like the file: ${fileName}.${cleanExtension} deleted from the ${dir} directory`);

    const [confirmation] = await prompt('confirmation');

    if (confirmation?.toLowerCase() !== 'y') {
        return;
    }
    
    await deleteSingleFile(dir, fileName, cleanExtension);
}





async function confirmBatchFiles(batchInput) {
    let [dir, extension, ...unusedInput] = batchInput;

    while(!dir || !extension) {
        let newInput = await prompt('deleteBatch');
        [dir, extension, ...unusedInput] = newInput;
    }

    dir = normalizePath(dir);
    const cleanExtension = extensionCleanup(extension);

    while (!dirExists(dir)) {
        const userInput = await prompt('correctDir');
        [dir] = userInput;
        dir = normalizePath(dir);
    }

    console.log(`Please confirm that you'd like all files with the .${cleanExtension} extension deleted from the ${dir} directory`);

    const [confirmation] = await prompt('confirmation');

    if (confirmation?.toLowerCase() !== 'y') {
        return;
    }

    await deleteBatchFiles(dir, cleanExtension);

}




async function deleteSingleFile(dir, fileName, extension) {

    let file = fs.readdirSync(dir).filter(f => {
        const fullPath = path.join(dir, f);

        return f === `${fileName}.${extension}` &&
            fs.statSync(fullPath).isFile();
    });

    if (file.length === 0) {
        console.log(`The file doesn't exist.`);
        return
    }
  
    let oldPath = path.join(dir, file[0]); 
    let newPath = path.join(trashBin, file[0]);

    if (fs.existsSync(newPath)) {
        newPath = await renameWithSequence(newPath);
    }

    try {
        fs.renameSync(oldPath, newPath);
    } catch(err) {
        console.log(`Failed to delete: ${file[0]}`, err);
    }
    
    console.log(`Your file: ${file[0]} was deleted`);
      
}



async function deleteBatchFiles(dir, extension) {
    let count = 0;

    let fileGroup = fs.readdirSync(dir).filter(file => {
        const fullPath = path.join(dir, file);

        return (
            fs.statSync(fullPath).isFile() &&
            file !== currentFile
        );
    });

    const files = fileGroup.filter(file => file.endsWith(`.${extension}`));

    console.log(files);

    if (files.length === 0) {
        console.log(`There are no files with the extension ${extension} to be deleted`);
        return;
    }


    for (const file of files) {
        let oldPath = path.join(dir, file); 
        let newPath = path.join(trashBin, file);

        if (fs.existsSync(newPath)) {
            newPath = await renameWithSequence(newPath);
        }

        try {
            fs.renameSync(oldPath, newPath);
            count++;
        } catch(err) {
            console.log(`Failed to delete: ${file}`, err);
        }
    }

    console.log(`${count} file(s) were deleted`);


}

















module.exports = {
    softDelete
}