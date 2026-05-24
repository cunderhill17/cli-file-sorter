const { prompt } = require('../utils/userPrompts');

async function softDelete() {

    const [deletionMethod, ...unusedInput] = await prompt('deletionType');

    switch(deletionMethod) {
        case '1':
            console.log("You've elected to delete a single file");
            break;
        case '2':
            console.log("You've elected to delete a batch of files");
            break;
        default:
            break;
    }


}

module.exports = {
    softDelete
}