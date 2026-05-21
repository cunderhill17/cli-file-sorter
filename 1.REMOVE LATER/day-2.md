**Phase Two:** 

1. Currently, you can use the command 'move' along with a directory name and a file extension (such as 'txt') to sort files into those directories
2. If the directory already exists, it will bypass creation of the directory and sort the files
3. There are also two other commands 'list' and the default option (which occurs for no command, or any other word not previously listed)
    - However, these commands don't currently do anything beyond displaying a console log message 


**Phase Two Additions:** 

1. I want to create the 'default' section which will provide a list of commands as well as allow the user to enter commands (as well as other needed information)
2. I want to allow the user to work with nested directories 
3. I need to handle the 'error' if the file already exists in the directory (essentially, renaming the file)

Steps: 

1. instead of using 'existsSync' switch to using --> fs.mkdir(directory, { recursive: true }, (err) => {}) in order to handle nested files
    - I also don't need to use if statements in this case to handle the possible existance of the directory 
    - 'recursive' will check each directory within the path to see if it already exists, and will only ensure only the ones that don't exist are created
2. I added const cleanExtension = extension.replace('.', ''); to account for users who may include the dot for the file extension so that the format is standardized 

Problem::
- my function 'moveMyFiles' still looks for the 'files' to move within the root directory. It needs to adapt to the nexted directory

I'm wondering if it would be better, to have all commands exist first without the arguments, and then when the user navigates to that specific command it can tell them what args they need to supply such as: 

MOVE: <starting directory path> <new directory> <file extensions> 
| [user enters input here]

- could use stdin / stdout to handle user input and terminal output 

3. I used set() to ensure that extensions weren't used more than once so files weren't duplicated when they were moved. As a user could enter .jpg and jpg

**Cases to Still Handle:** 
- User feedback if there are no files to move (done)
- what happens if the user enters an extension with more than one dot '...txt' (fixed)
- what if I want to move files to an earlier folder in the path? 
