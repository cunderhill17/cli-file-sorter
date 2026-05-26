const { prompt } = require('../utils/userPrompts');


async function showHelp({userCommand}) {

console.log(`\nCOMMAND MENU:
=============

move:           moves files from one directory to another based on user inputted extension
list:           lists files in the users current working directory
delete:         deletes files by name or extension
restore:        restores files from trash bin to current working directory
empty trash:    permanently deletes all files in the trash bin
exit:           closes the program\n`);

    const [newCommand, ...unusedInput] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);

}


// EXPORTS
module.exports = {
    showHelp
};