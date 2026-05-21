// Importing program files


// importing node.js modules
const fs = require('fs');

const readline = require('node:readline');
const {stdin: input, stdout: output} = require('node:process');
const rl = readline.createInterface({input, output});


// Variables 
const commandArr = {
    "move": "MOVE: <starting directory path> <new directory> <file extensions> \n\n",
    "noCommand": "\n\n Please select a command or hit enter to exit \n\n"
}

function prompt(sysCommand) {
  return new Promise((resolve) => {
    rl.question(`${commandArr[sysCommand]}`, (answer) => {
      const userInput = answer.trim().split(/\s+/);
      resolve(userInput);
    });
  });
}

// EXPORTS

module.exports = {
    prompt
};