const { prompt } = require('../utils/userPrompts');


async function showHelp({userCommand}) {

console.log(`\nCOMMAND MENU:
=============

move:           moves files from one directory to another based on user inputed extension
list:           lists files in the users current working directory
delete:         deletes files by name or extension
restore:        restores files from tash bin to current working directory
empty trash:    permenately deletes all files in the trash bin
exit:           closes the program\n`);

    const [newCommand, ...unusedInput] = await prompt('noCommand');
    !newCommand ? userCommand('exit') : userCommand(newCommand);

}


// EXPORTS
module.exports = {
    showHelp
};