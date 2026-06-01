# **Day 5 Notes:**

## Pre-Phase-5: 

FEATURES:
1. Moves files from a given directory to another directory by extension
2. Uses terminal input to determine files to move (allows for flexibility as the user decides which extensions they want to work with)
3. Can handle moving files into nested folders
4. Can use the `list` command in order to list the contents of a `cwd`
    - currently working on making it so that 'hidden' files aren't shown
5. Basic help menu is included that lists the current commands


ERROR HANDLING:
1. Checks if the given directory already exists
2. Ensures that duplicates of the same extension can't be used


USER FEEDBACK: 
1. Provides user feedback for how many files have been moved 

### Future Improvements: 

1. Still need to handle the case for if the name of the file being moved already exists in the directory
2. I'd like to be able to log errors to a text file in order for users to be able to look at them afterward even after the script has finished running
3. Functionality to move files to a previous folder
4. Need to allow the users to return to the menu after completing their original command 
5. Commands to still add: 
    - delete (soft)
    - restore 
    - empty trash (permanent delete)
    - undo command 
    - rename file (single)
    - rename file (batch)

## Phase 5: 
### Steps: 

1. Passed menu function as a dependency so that it can be ran within the move.js module and avoid circular dependency. Also moved creation of the readline into the prompt function so that it can be closed properly

2. Refactor the `directoryCreation()` function by extracting the directory existence check and directory creation logic into a reusable utility module for use across other parts of the codebase. Also update the section where `moveFilesInstructions()` is called, since it now requires an argument and the previous invocation is no longer valid.

**Old Code**

```js
if (!currentDir || !newDir || rest.length === 0) {
    console.log('Usage: <starting directory path> <new directory> <file extensions>');

    moveFilesInstructions();

    return;
}
```

**New Code**

```js
while(!currentDir || !newDir || rest.length === 0) {
    console.log('Usage: <starting directory path> <new directory> <file extensions>');
    let newInput = await prompt('move');
    [currentDir, newDir, ...rest] = newInput;
    currentDir = normalizePath(currentDir);
}
```

3. Modified the function `moveMyFiles()`, so that it didn't have to traverse through an array multiple times for the same functionality. Originally I had combined a `for` loop for a `filter` method, however, that caused the array to be traversed repeatedly for each extension.
- when I was doing research in how to modify my function into smaller chunks so code was more reusable, I learned more about how you can comebine different array methods to produce the same functionality with less 'cost'

**Old Code**

```js
for (const item of cleanExtensions) {
    let dirFiles = fileGroup.filter(file => file.endsWith(`.${item}`) );
    
    files.push(...dirFiles);
}
```

**New Code**

```js
const files = fileGroup.filter(file => (
    cleanExtensions.some(ext => file.endsWith(`.${ext}`))
));
```
- the new code conbines filter() and some() to get the same result 
- some() says whether at least one item (in this case extension) meets a condition going through the items until it returns true or ultimately returning false if no items meets the condition 
- filter() keeps items in the array only if the callback returned true
- by combining these two methods, you only need to iterate over fileGroup once, instead of re-scanning it multiple times for each extension

4. I'm looking into how you would move files from a child directory to it's parent folder. With my current code that asks the user for `<starting directory> <new directory> <ext>`, it looks like the user can enter `..` as the `<new directory>` to traverse backwards in the filepath. However, I'm stuck on how you would explain that in a clean & acccessible way within the program as the user themselves needs to enter the dots. 
    - there's the option of replacing `..` with a keyword such as `parent`
    - I could provide numbered options and the user could select where it should be moved (I would need to refactor a lot of my current code for this option to work)
    - I could provide a simple explanation in the console about how to use it
        - eg. `Use ".." to move to the parent folder (one level up)`
    