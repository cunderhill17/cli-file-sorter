// Importing program files
const { moveFilesInstructions } = require('./commands/move');
const { listFiles } = require('./commands/list');
const { showHelp } = require('./commands/help');
const { softDelete } = require('./commands/delete');
const { restoreDeletedFiles } = require('./commands/restore');
const { emptyTrashBin } = require('./commands/emptyTrash');

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
            console.log('Thank you for using FileSort!');
            process.exit(0);

        case 'delete':
            softDelete({userCommand});
            break;

        case 'restore':
            restoreDeletedFiles({userCommand});
            break;

        case 'empty':
            emptyTrashBin({userCommand});
            break;
            
        default:
            showHelp({userCommand});
            break;
    }
}

userCommand(command);


