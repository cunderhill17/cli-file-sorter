// Importing program files
const { chooseCommand } = require('./utils/commands');

const fs = require('fs');

const [command, ...rest] = process.argv.slice(2);


chooseCommand(command);



