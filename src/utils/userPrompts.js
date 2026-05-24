// Importing program files


// importing node.js modules
const fs = require('fs');



// Variables 
const commandArr = {
    "move":             "MOVE: <starting directory path> <new directory> <file extensions> \n\n",
    "correctDir":       "Please provide a correct starting directory. Your CWD is either './' or '.' \n\n",
    "renameOptions":    `
        Please select the option for how you'd like to handle the duplicate file: Select By Number
        ===========================================================================================
        1. Skip File
        2. Rename in Sequence

        Note: Any character outside of 1-2 will default to option 1
    `,


    "noCommand": "\n\n Please select a command or hit enter to exit \n\n"
}

function prompt(sysCommand) {
    const readline = require('node:readline');
    const {stdin: input, stdout: output} = require('node:process');
    const rl = readline.createInterface({input, output});

    return new Promise((resolve) => {
      rl.question(`${commandArr[sysCommand]}`, (answer) => {
        const userInput = answer.trim().split(/\s+/);
        resolve(userInput);
        rl.close();
      });
    });
}

// EXPORTS

module.exports = {
    prompt
};