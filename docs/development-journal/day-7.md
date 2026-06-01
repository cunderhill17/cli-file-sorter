# **Day 7 Notes:**

## Pre-Phase-7: 

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
3. Checks if the file already exists in the given folder and provides solutions on how to handle that


USER FEEDBACK: 
1. Provides user feedback for how many files have been moved 

### Future Improvements: 

I've set a goal for myself to finish the MVP within 7 days. I want to ensure that projects are finished without falling into trap of continuous optimization. With that I've decided to changing up the future improvements section into my goals for the next 7 days. 

- Current date: May 25, 2026
- Goal to Finish By: May 31, 2026

1. Add soft delete
2. Add restore command
3. Create README for the project 
4. Cleanup any unnecessary code in the files (such as 'requires' that aren't being used)
5. Cleanup formatting for the menus that are displayed 
6. improve any naming conventions that aren't self explanatory 


## Phase 7: 
### Steps: 

1. I'm starting by adding in the steps to for users to be able to delete files 
    - first it prompts them whether they want to delete a single file or batch files 
    - then it asks them which file/files they want to delete 
    - afterward, it confirms that they made the right selection 
    - it handles empty user input and if either the file or directory don't exist 

I ended up reusing code that I'd used for the move command, refactoring it so it fit what I needed for the delete command 

**Example** 

**move.js** 

```js 
let fileGroup = fs.readdirSync(currentDir).filter(file => {
    const fullPath = path.join(currentDir, file);

    return (
        fs.statSync(fullPath).isFile() &&
        file !== currentFile
    );
});

const files = fileGroup.filter(file => (
    cleanExtensions.some(ext => file.endsWith(`.${ext}`))
));
```
- for move.js, there is the option of including multiple extensions, so it filters the files differently. 

**delete.js** 

```js
let file = fs.readdirSync(dir).filter(file => {
    const fullPath = path.join(dir, file);

    return file === `${fileName}.${extension}` &&
           fs.statSync(fullPath).isFile();
});
```
- one of the delete commands allows deleting a single file, so the code was able to be condensed as it didn't have to sort by multiple extensions or exclude certain files 
- it simply looks for a file with a specfic name and ensures that it's actually a file (eg. not a directory with the same name)

2. The next thing I want to add is a simple restore feature where the user can retrieve items from the trash bin and they'll be moved to the current working directory. There isn't really a lot of new logic being added for this. 
    - it'll prompt the user if they're sure they'd like to retrieve their deleted files (if there are any deleted files)
    - then it'll use rename() to move the files from the trash bin to the users cwd 
        - again, it should still check that no files have the same name

It's interesting how many functions can actually be reused when you think about the specific task that they accomplish. Such as how rename() can be used to either rename files or to move them from one directory to another. 