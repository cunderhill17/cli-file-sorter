# **Day 6 Notes:**

## Pre-Phase-6: 

FEATURES:
1. Moves files from a given directory to another directory by extension
2. Uses terminal input to determine files to move (allows for flexibility as the user decides which extensions they want to work with)
3. Can handle moving files into nested folders
4. Can use the `list` command in order to list the contents of a `cwd`
    - currently working on making it so that 'hidden' files aren't shown
5. Basic help menu is included that lists the current commands
6. Added a prompt to the 'move' command so that the user can select another command once finished their original one


ERROR HANDLING:
1. Checks if the given directory already exists
2. Ensures that duplicates of the same extension can't be used


USER FEEDBACK: 
1. Provides user feedback for how many files have been moved 

### Future Improvements: 

1. Still need to handle the case for if the name of the file being moved already exists in the directory
2. I'd like to be able to log errors to a text file in order for users to be able to look at them afterward even after the script has finished running
3. Commands to still add: 
    - delete (soft)
    - restore 
    - empty trash (permanent delete)
    - undo command 
    - rename file (single)
    - rename file (batch)
4. Need to think about handling directories that have spaces in the names

## Phase 6: 
### Steps: 

1. The first step was getting the other commands to the same place that 'move' was at by passing `userCommand` to their modules through dependency injection. That way all commands will eventually lead the user to being prompted for the next command 

2. The next thing I want to work on is checking if a file already exists before it's moved. If it does exist, I should provide the user with an option to either not move it or to rename in sequence (eg. 'img' would become 'img-01')
- I used existsSync() to check whether the file exists in the new directory. If it does exist, it will trigger a prompt for the user to decide how to handle the duplication
- I added a renameOptions property to my object variable so users would know what options they have for duplicate files 

```js
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
```
- after the user selects one of the commands, I added in a switch statement to process their request, using `continue;` for the option to skip the file 
- I created a utility file named `renameSequence` that adds a sequenced number to the end of the file

3. I think the next command I'm going to work on is `soft deleting` by adding a `trash` directory within the program files. It'd probably also be helpful if the user is able to select whether they want to delete individual files or a group of files 
    - single file by name and extension
    - group of files by name or extension (for eg. could delete all files that include 'sample' in the name)

- I added the delete command to the switch statement in the index.js file
- I set up the js file for the delete command with a minimal switch statement 

I will continue working on the delete command during the next session
