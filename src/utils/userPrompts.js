// Variables 
const commandArr = {
"move":             "\nMOVE: <starting directory path> <new directory> <file extensions>\n",

"correctDir":       "\nPlease provide a correct starting directory. Your CWD is either './' or '.'\n",

"renameOptions":    
`\nPlease select the option for how you'd like to handle the duplicate file: Select By Number
===========================================================================================
1. Skip File
2. Rename in Sequence

Note: Any character outside of 1-2 will default to option 1
\n`,

"deletionType": 
`\nPlease select the deletion method you'd like to use: 
====================================================
1. Single file (Must Include Full Name + Extension)
2. Batch Files (Delete By Extension)

Any character outside of 1-2 will default to the main command prompt.
\n`,

"deleteSingle": "\nDelete Single File: <starting directory> <file name> <file extension>\n",

"deleteBatch": "\nDelete Batch Files: <starting directory> <file extension>\n",

"confirmation": "\n(Y/N)\n",

"restoreFiles": "\nPlease confirm whether you'd like to restore any currently deleted files. (Y/N)\n",

"emptyTrash": "\nPlease confirm whether you'd like to empty the trash bin. (Y/N)\n",

"noCommand": "\nPlease select a command or hit enter to exit\n"
}



function prompt(sysCommand) {
    const readline = require('node:readline');
    const {stdin: input, stdout: output} = require('node:process');
    const rl = readline.createInterface({input, output});

    console.log("\n-------------------------------------------------------------------------------\n");

    return new Promise((resolve) => {
      rl.question(`${commandArr[sysCommand]}> `, (answer) => {
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