function showHelp() {

    console.log(
        `
        COMMAND MENU:
        =============

        move:       moves files from one directory to another based on user inputed extension
        list:       lists files in the users current working directory
        exit:       closes the program (all changes made will be final)

        `
    );

}


// EXPORTS
module.exports = {
    showHelp
};