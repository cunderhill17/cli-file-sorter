// Importing program files
const { moveFilesInstructions } = require('./commands/move');
const { listFiles } = require('./commands/list');

// importing node.js modules
const fs = require('fs');
const path = require('path');

//variables
const currentFile = path.basename(__filename);

const [command, ...rest] = process.argv.slice(2);



switch (command?.toLowerCase()) {
    case 'move':
        moveFilesInstructions();
        break;

    case 'list':
        listFiles();
        break;

    default:
        // showHelp();
        console.log('this will be for command instructions');
}

