# FileSorter CLI Utility
FileSorter is an interactive command‑line tool designed to help you organize, clean, and manage files in your working directory. It supports moving files by extension, listing directory contents, soft‑deleting files to a trash bin, restoring deleted files, and permanently emptying the trash.

The tool is fully interactive — after each command completes, FileSorter returns to the command menu so you can continue working without restarting the program.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Command Overview](#command-overview)
4. [Command Details](#command-details)
5. [Interactive Prompts](#interactive-prompts)
6. [Project Structure](#project-structure)
7. [Example Workflow](#example-workflow)
8. [License](#license)



## Features
- Move files by extension into a new directory
- List files and directories in the current working directory
- Soft‑delete files by name or extension
- Restore deleted files from the trash bin
- Permanently empty the trash
- Clean, guided prompts for every command
- Safe operations with validation and error handling

## Installation
There are three ways to install and use FileSorter depending on how you prefer to run CLI tools.

### 1. Run Locally (No Global Install Needed)

Clone the repository and run the CLI directly with Node:

```bash
git clone https://github.com/cunderhill17/cli-file-sorter.git
cd cli-file-sorter
npm install
```

Run any command: 

```
node index.js move
node index.js list
node index.js delete
```
This method is ideal if you want to explore or modify the source code.

### 2. Install Globally Using `npm link`

If you want to use FileSorter from anywhere on your system without typing node index.js, you can link it globally.

From inside the project directory:

```bash
npm install
npm link
```

This makes your CLI available system‑wide under the command name you define in your package.json "bin" field (for example, filesorter).

Then you can run: 

```bash
filesorter move
filesorter list
filesorter delete
```

To remove the global link: 

```bash
npm unlink -g
```

### 3. Install from npm (Recommended for Users)

Install the package on your system: 

```bash
npm install -g @cunderhill17/filesorter
```

Then run it from anywhere:

```bash
filesorter move
filesorter list
filesorter restore
filesorter empty
```
This is the cleanest and most user‑friendly installation method.

## Command Overview 

FileSorter accepts a single command as the first argument:

Example: 

```bash
node index.js <command>
```

OR

```bash
filesorter <command>
```

If no command is provided, FileSorter displays the help menu.

| Command | Description |
| --- | --- |
| ``move`` | Move files from one directory to another based on extension(s) |
| ``list`` | List files and directories in the current working directory |
| ``delete`` | Soft‑delete files by name or extension |
| ``restore`` | Restore files from the trash bin |
| ``empty`` | Permanently delete all files in the trash bin |
| ``exit`` | Close the program |


## Command Details

<details>
    <summary> move </summary>

Move files from a source directory into a new directory based on one or more file extensions.

Usage inside the CLI: 

```bash
<starting directory> <new directory> <extensions...>
```

Example: 

```bash
./ images jpg png jpeg
```

`./` is used for the root directory or current working directory 

**FileSorter will:**

- Validate the directory exists
- Create the target directory if needed
- Move all matching files
- Prompt you if a file with the same name already exists
    - Skip
    - Auto‑rename with a sequence number

</details>

<details>
    <summary>list</summary>

Lists all non‑system, non‑hidden files and directories in the current working directory.

Output example:

```bash
[file] notes.txt
[directory] images
[file] script.js
```
</details>


<details>
    <summary>delete</summary>

Soft‑deletes files by name or extension.
Files are moved to a trash directory instead of being permanently removed.

First you will be asked how you want to delete files:

```
1. Delete a single file
2. Delete a batch of files
```
#### **Single File Deletion** 
You will be prompted for: 

```
<directory> <file name> <extension>
```

Example: 

```
/Users/me/Documents report txt
```

FileSorter will:
- Validate the directory exists
- Confirm the file exists
- Ask for confirmation before deleting
- Move the file into the trash/ directory
- Auto‑rename if a file with the same name already exists in the trash

#### **Batch Deletion by Extension** 
You will be prompted for: 

```
<directory> <extension>
```

Example: 

```
/Users/me/Downloads jpg
```

FileSorter will:
- Validate the directory
- Confirm the extension
- Ask for confirmation
- Move all matching files into the trash
- Auto‑rename duplicates inside the trash
</details>


<details>
    <summary>restore</summary>

Restores files from the trash bin back into the current working directory.

You will be asked: 

```
Please confirm whether you'd like to restore any currently deleted files. (Y/N)
```

If confirmed:
- Every file in trash/ (except .gitkeep) is moved back
- If a file with the same name already exists in the destination, FileSorter auto‑renames it using a sequence number
- A count of restored files is displayed

Example Output: 

```
7 deleted files have been restored to your current working directory
```
</details>


<details>
    <summary>empty</summary>

Permanently deletes all files in the trash bin.

You will be asked: 

```
Please confirm whether you'd like to empty the trash bin. (Y/N)
```

If confirmed:
- Every file in trash/ (except .gitkeep) is permanently removed using fs.unlinkSync
- A count of deleted files is displayed


Example Output: 

```
12 file(s) have been permanently deleted.
```
</details>


<details>
    <summary>exit</summary>

Closes the program
</details>



## Interactive Prompts

FileSorter uses a guided prompt system for:
- Missing arguments
- Invalid directories
- Rename conflicts
- Next command selection

After each command completes, FileSorter asks:

```bash
Please select a command or hit enter to exit
>
```


## Project Structure 
```
commands/ 
    delete.js
    emptyTrash.js
    help.js
    list.js
    move.js
    restore.js
utils/
    dirCreation.js
    paths.js
    renameSequence.js
    SystemFiles.js
    userPrompts.js
index.js
```

## Example Workflow 

```powershell
PS C:\Users\cryst\downloads> filesorter

COMMAND MENU:
=============

move:           moves files from one directory to another based on user inputted extension
list:           lists files in the users current working directory
delete:         deletes files by name or extension
restore:        restores files from trash bin to current working directory
empty trash:    permanently deletes all files in the trash bin
exit:           closes the program


-------------------------------------------------------------------------------


Please select a command or hit enter to exit
> list
[file] EpicInstaller-19.2.3-unrealEngine-2a194b8f53a946f2b6e7c7945aec6f80.exe
[file] Git-2.53.0-64-bit.exe
[file] node-v24.13.1-x64.msi
[file] SLSPMAST.txt
[file] VisualStudioSetup.exe
[file] vite-installation.jpg
[file] xampp-windows-x64-8.2.12-0-VS16-installer.exe

-------------------------------------------------------------------------------


Please select a command or hit enter to exit
> move

-------------------------------------------------------------------------------


MOVE: <starting directory path> <new directory> <file extensions>
> ./ text-files .txt

1 file(s) were moved


-------------------------------------------------------------------------------


Please select a command or hit enter to exit
> exit

Thank you for using FileSorter!
```


## License 

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
