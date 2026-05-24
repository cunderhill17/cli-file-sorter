// Importing program files
const { moveFilesInstructions } = require('./commands/move');
const { listFiles } = require('./commands/list');
const { showHelp } = require('./commands/help');

const [command, ...rest] = process.argv.slice(2);


function userCommand(command) {
    switch (command?.toLowerCase()) {
        case 'move':
            return moveFilesInstructions({userCommand});
            break;

        case 'list':
            return listFiles({userCommand});
            break;
        
        case 'exit':
            process.exit(0);

        default:
            showHelp();
            break;
    }
}

userCommand(command);


