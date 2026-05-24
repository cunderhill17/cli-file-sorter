const { prompt } = require('../utils/userPrompts');


async function showHelp({userCommand}) {

    console.log(
        `
        COMMAND MENU:
        =============

        move:       moves files from one directory to another based on user inputed extension
        list:       lists files in the users current working directory
        exit:       closes the program (all changes made will be final)

        `
    );

    const [newCommand, ...rest] = await prompt('noCommand');
    !newCommand ? process.exit(0) : userCommand(newCommand);

}


// EXPORTS
module.exports = {
    showHelp
};