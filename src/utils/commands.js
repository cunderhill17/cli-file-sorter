// Importing program files
const { moveFilesInstructions } = require('../commands/move');
const { listFiles } = require('../commands/list');
const { showHelp } = require('../commands/help');

// importing node.js modules
const fs = require('fs');

function chooseCommand(command) {
    switch (command?.toLowerCase()) {
        case 'move':
            moveFilesInstructions();
            prompt()
            break;

        case 'list':
            listFiles();
            prompt()
            break;
        
        case 'exit':
            process.exit(0);

        default:
            showHelp();
            prompt();
            break;
    }
}

function prompt() {
    console.log(`Please select a command or hit enter to exit`);

    process.stdin.once('data', (chunk) => {
        const [command, ...rest] = chunk.toString().trim().split(/\s+/);

        if (!command) {
            process.exit(0);
        }

        chooseCommand(command);
    });
}

// EXPORTS
module.exports = {
    chooseCommand
};