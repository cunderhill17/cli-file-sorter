
**Idea:** 
1. user needs to be able to enter the name of the folder they want to create as well as the extensions that go in that folder
2. OR -- should it simply gather all of the extensions and determine how to sort them that way --> this seems like it would take a long time, especially if you're going through thousands of files just to get the extensions and then you have to go through them again to sort them. 
    - could you sort them as you're gathering the extensions 
    
**Thought:** 
- for each file, it checks the extension
- it determines if a folder has already been created for that extension 
- if a folder hasn't been created, then it creates one 
- after a folder has been either created or been determined to exist, then the file is moved into that folder 

**Error Handling** 
- Would need to establish what to do if files share the same name as another file already in that folder 
- could the file be renamed? 
    - when you do thing in the file explorer on windows it gives the option to rename as a duplicate - 'file(2)'


**Decision:** 
- I'm going to have the user enter the folder and ext when they run the program, that way they aren't limited by naming conventions or what files they put in what folders 


Steps: 

1. The program needs to accept input from the user -> folder name / type of extension
    - you can accept arguments in the same line as running the file and use them through 'process.argv' within the file 

2. The second step would be to create a folder with the first argument
    - needs to include error handling for if the folder already exists (fs.exsistsSync)
    - if it doesn't exist, you can create the folder (fs.mkdir)

3. Next, would be to move files that have the provided extension into the specified folder
    - need a way to gather all files with that extension --> fs.readdirSync -> filter those results 
    
4. I want to break the application down further so that it can be used for different commands
    - there will be a default option, that if the user doesn't provide a command or provides one that doesn't exist, it will list all of the available commands and what they do
    - used a switch statement
        - I need to fix command so it's in lowercase in order to match the 'cases' 
        - using switch(command.toLowerCase) doesn't seem to work --> I forget to actually call it, it should be switch(command.toLowerCase()) --> however, it throws an error if they don't include any arguments
        - optional chaining --> switch(command?.toLowerCase())

**Things to consider:** 
- right now if the user does something like: node listsort move scripts js --> that could try and move the program file
    - fixed by saving the filename for the script into a variable and then excluding it from the file filter 
- there is no error handling for moving files right now, if one file fails then the entire thing will fail 
    - added a try / catch block to log the errors if one of the files fails
- doesn't currently handle nested folders
