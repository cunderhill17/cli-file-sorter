**Pre-Phase-Three:** 
1. You can move files from a given directory to another directory by extension 
2. There is error handling for if the given directory already exists 
3. Provides user feedback for how many files have been moved 
4. Uses terminal input to determine files to move (allows for flexibility in which extensions the user wants to work with)
5. Can handle moving files into nested folders
6. Ensured that duplicates of the same extension couldn't be used

**Phase Three:** 

Additions To Implement: 
1. I want to start setting up the file structure to start putting the code into separate files (modules)
2. Then I want to create the help() function to show the menu options (there may not be many options yet)
3. If I have time I want to work on a solution for moving files to a previous folder 

**Steps:** 
1. I separated my code into separate folders in order to prepare for adding additional features as well as eventually publishing it as an npm package 
    - bin / config / src / tests
    - This keeps CLI entry points, configuration, core logic, and tests separated for scalability
2. I also added a package.json file which connects with the file within the bin folder and is required publishing the package. 
    - It also enables `npm link` which lets me run the CLI globally while developing it locally
    - This allows me to test the tool in the same way a user would use it after installation
    - You can unlink it using:
        - npm unlink -g (global unlink)
        - or npm unlink (from the project directory)
3. I then separated my code into two separate files (for now) --> index.js and move.js
    - index.js contains the main CLI logic and acts as the entry point for routing commands
    - move.js contains all logic related to the "move" command
    - Some reusable logic may later be moved into a util/ folder if it becomes shared across commands
4. Added a function called `normalizePath` in order to hand user-provided paths 
    - This is in order to accept any of the following formats: 
        - ./folder
        - folder
        - /full/path (or Windows full paths like C:\folder)
    - It uses path.resolve() to convert the input into an absolute path based on the current working directory
    
Notes::
- paths don't appear to be case sensitive so --> `documents` and `Documents` resolve to the same path 
- if you're in the documents folder, you can't specify 'documents' in the starting path, you have to use './' or '.'

5. Worked on functionality for the command 'list' in order to list the contents of the users current directory so they'll have a better idea of paths / contents that they're working with
    - originally grouped all of the contents into a variable (array) called `fileGroup` and then looped through it checking if each file was a file or directory
    - then I displayed a console.log message with either 'File: ' or 'Directory: '
    - However, it doesn't have any sort of organizational structure to it, so files and directories are mixed together and the user has to searching through all of them rather then skipping directly to either files or directories 

```js
function listFiles() {
    let fileGroup = fs.readdirSync('./');

    for (const file of fileGroup) {
        const fullPath = path.join('./', file);
        let isFile = fs.statSync(fullPath).isFile();
        let isDir = fs.statSync(fullPath).isDirectory();

        if (isFile) {
            console.log(`File: ${file}`);
        } else if (isDir) {
            console.log(`Directory: ${file}`);
        }

    }
}
```

6. I changed up the listFiles() function as I realized that 'items' could be classified as more than just files or directories (such as symlinks)
    - at this point I'm only displaying files and directories though, as I want to handle 'sensitive' information in a more specific way as certain users may not realize the damanage that could be caused if they move or delete certain files 
    - I also created a function called isHiddenSystemFiles() in order to exclude certain files from being listed


7. Both the paths.js and SystemFiles.js files were put until the `utils` folder in order for them to be reusable for the other commands 
