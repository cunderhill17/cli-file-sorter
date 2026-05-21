# **Day 4 Notes:**

### Pre-Phase-Four: 
1. You can move files from a given directory to another directory by extension 
2. There is error handling for if the given directory already exists 
3. Provides user feedback for how many files have been moved 
4. Uses terminal input to determine files to move (allows for flexibility in which extensions the user wants to work with)
5. Can handle moving files into nested folders
6. Ensured that duplicates of the same extension couldn't be used
7. Can use the `list` command in order to list the contents of a `cwd`
    - currently working on making it so that 'hidden' files aren't shown 

**Future Improvements**
1. Get the help menu set up
2. Still need to handle the case for if the name of the file being moved already exists in the directory
3. I'd like to be able to log errors to a text file in order for users to be able to look at them afterward even after the script has finished running
4. Functionality to move files to a previous folder

### Phase Four: 

**Today's Steps**

1. Put the switch statement (index.js) into a function and then called it using the 'command' as a parameter
    - this way the function can be imported and called from other js files and the user can use the commands on more than just the entry point 
    - I actually broke this down further and put the function into it's own file under the `utils` folder

2. set up the help menu function to provide a list of commands for user consideration (only includes currently available commands)



Challenges:

**BUG**
- two files can't both require functions from each other, as at the time of loading one won't be finished and Node will be seeing requests for things that don't currently exist
    - Leads to a warning like this: 
        - (node:7948) Warning: Accessing non-existent property 'chooseCommand' of module exports inside circular dependency (Use node --trace-warnings ... to show where the warning was created)
    - to fix this I added the prompt for selecting a command to the commands.js file and removed it from help.js so that commands.js and help.js weren't calling each other 

**Bug**
- If I call the list command at the beginning `(program-name command)` then the program runs the command and exits the program once finished. However, if I call the command after accessing the help menu, it continues to add lines like it's waiting for input 
    - I ended up changing the way the program runs so that each command calls a prompt function once it's finished and the user can either run another command or exit the program and that way it defines specifically how the program closes

**Bug**
- I ran into issues with how `stdin` works, and how it doesn't wait for user input before continuing on with the rest of the program. So when I included prompt() below the function for moving files, it didn't wait for the user to enter the file information to move, it immediately went to the next 'prompt' 


At this point, there were more problems then I could reasonably fix myself. I want to get to the point where I don't have to refactor my entire code base when mistakes happen, but I'm also realistic enough to know that anything I did right now would be like slapping a bandaid on the problem. I'm still learning how everything fits together, so restarting is probably the better option rather than making it worse. 

Restarting didn't do a whole lot honestly, and I've now spent about 6 and a half hours trying to solve this problem. 

I've reset it to where the user can enter a command such as (move) and move their files, but it doesn't allow the user to give another command after the first. 
