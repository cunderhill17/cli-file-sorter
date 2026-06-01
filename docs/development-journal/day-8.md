# **Day 8 Notes:**

## Pre-Phase-8: 

FEATURES:
1. Moves files from a given directory to another directory by extension
2. Uses terminal input to determine files to move (allows for flexibility as the user decides which extensions they want to work with)
3. Can handle moving files into nested folders
4. Can use the `list` command in order to list the contents of a `cwd`
    - currently working on making it so that 'hidden' files aren't shown
5. Basic help menu is included that lists the current commands
6. Added a prompt to the 'move' command so that the user can select another command once finished their original one
7. Soft deletes files to program 'trash bin'
8. restores files from the trash bin to the users current working directory


ERROR HANDLING:
1. Checks if the given directory already exists
2. Ensures that duplicates of the same extension can't be used
3. Checks if the file already exists in the given folder and provides solutions on how to handle that


USER FEEDBACK: 
1. Provides user feedback for how many files have been moved 

### Future Improvements: 

I've set a goal for myself to finish the MVP within 7 days. I want to ensure that projects are finished without falling into trap of continuous optimization. With that I've decided to changing up the future improvements section into my goals for the next 7 days. 

- Current date: May 26, 2026
- Goal to Finish By: May 31, 2026

1. Add soft delete (done)
2. Add restore command (done)
3. Create README for the project 
4. Cleanup any unnecessary code in the files (such as 'requires' that aren't being used)
5. Cleanup formatting for the menus that are displayed 
6. improve any naming conventions that aren't self explanatory 


## Phase 8: 
### Steps: 

1. It wasn't on the original list of features for the MVP, however, I'm going to add in a way to permanently delete files from the trash bin as it doesn't make sense to just leave them there. 
    - prompts the user for confirmation
    - 'gathers' all the files from the trash bin (except for the .gitkeep file)
    - keeps track of how many files were deleted
    - once everything has been deleted, it provides the user with a confirmation message

**Bug**
- while I was adding functionality to the 'empty trash' command, I noticed that the 'trash' folder no longer existed. It seems that when I was testing the funtionality yesterday I didn't realise that it had also removed the '.gitkeep' file from the folder. So I've added in a filter to ignore that file specifically 

2. The next thing I'm going to do is work on the naming conventions for an 'input' that is left unused so it doesn't become confusing to look at in the future. I also removed an unused require statement from userPrompt.js

3. Now I'd like to work on formatting of the prompts as nothing lines up properly and its distracting to look at. 
    - I standardized the formatting so that all prompts/output/input line up to the left side and that there is clear space indicators between each message
    - I also added a divider between each prompt so that commands would remain separate from each other 

4. Added a confirmation message to let the user know how many files have been restored for the 'restore' command

5. I looked into adding tests for my code for the first time today. So far it was only simple tests that compare array output, but I think it gave me and idea of what it means to write tests as I go forward and research how to write tests that are more complicated. 

```js
const { extensionCleanup } = require('../../src/utils/paths');

describe('extensionCleanup', () => {

    test('handles a single extension string', () => {
        expect(extensionCleanup('.jpg')).toEqual(['jpg']);
    });

    test('handles an array of extensions', () => {
        expect(extensionCleanup(['.jpg', '.png'])).toEqual(['jpg', 'png']);
    });

    test('removes leading dots', () => {
        expect(extensionCleanup(['.jpg', 'png'])).toEqual(['jpg', 'png']);
    });

    test('removes multiple dots', () => {
        expect(extensionCleanup(['...jpg'])).toEqual(['jpg']);
    });

    test('lowercases all extensions', () => {
        expect(extensionCleanup(['JPG', 'Png'])).toEqual(['jpg', 'png']);
    });

    test('deduplicates extensions', () => {
        expect(extensionCleanup(['.jpg', 'jpg', 'JPG'])).toEqual(['jpg']);
    });

    test('handles mixed formatting', () => {
        expect(extensionCleanup([' .JpG ', 'PNG', '.png'])).toEqual(['jpg', 'png']);
    });

});
```
- the mixed formatting test failing until I added `trim()` to my code 

