# GitHub and Construct 3

## Video Tutorial
{% include youtube.html id="DpCbrGgRkY0" %}

---
## Text Tutorial


We'll use Github every class in this course for a few purposes:
1. It is an online backup of our work so we never lose any days of programming, designing, etc. 
2. It is a way of keeping track of our file changes over time, so we can "go back in time" to see what we've done, as well as restore any files we may have deleted by accident. For example, you're making a platforming game, and you've designed beautiful levels and basic game mechanics for weeks. You then, in an hour programming session, make a new feature, double jump, but this breaks your entire game and the levels no longer work properly. Now, we can simply "revert" back to the version of the game prior to when you made this new mechanic, saving past work. 
3. It is an industry standard tool, so it is important to know how to use technology that real game designers use every day.

## Basic Github workflow

While we won't use every feature of github (there is no need for "branches" in this course, though use them if you know how) this will be our basic workflow for using Github in this course: (all steps will be further explained later on). 

1. Program your game and save/make changes to your local computer file folders. This could be things like:
* editing code in your game
* adding new files to your folders such as:
  * character sprites
  * level backdrops
  * music and sounds
  * word docs with story lines
  * text-based code files
  * construct 3 game-engine files & folders
* renaming files or folders
* editing current existing files
* re-ordering and moving files to new locations
* deleting files 

It's important to note that we are only changing files LOCALLY on our computer, this does NOT automatically make changes to your REMOTE version (cloud saved) of your Github repo. 

2. Publish changes/push to remote to save your files online.

## Github workflow Practice
Now it's your turn to practice using Github. We'll use some of these skills throughout the course. 

### Task 1: Add your Game 0 - Simple Pig Platformer to your GitHub Repo

If you look at your current github repo online (the website), you'll notice that your Game 0 is *not* online yet, despite being inside your "Game Design" folder. This is because it isn't in your repo yet! 

<img width="535" alt="Screenshot 2024-01-25 at 10 32 42" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/25fe4ca9-1040-4712-8eea-b9659cd82eaa">

Take the Game 0, and drag and drop it inside your Git Repo folder. (notice the folder/subfolder structure denoted by "v" and ">") 

<img width="539" alt="Screenshot 2024-01-25 at 10 33 11" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/9ef90460-5a4a-428b-b735-015d7074725a">

Head over to Github Desktop. You'll now notice new changes have been added to the local repo. Green "+" are new files, Yellow "." are changed files, and red "x" are deleted files. We have LOTS of newly added files, which are all the game files from Game 0. This is a "new addition" to your codebase or folder since we last published this change to remote.

<img width="500" alt="Screenshot 2024-01-25 at 10 33 55" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/95ed6ece-b8b7-4635-980b-70fcc43052ba">

Presently this change is only *locally on your computer*. We need to "publish" this change to our remote server so that it is saved online. To do this, we need to add 2 things in the bottom left side of Github Desktop: 
* Summary - a title for what changes you made since your last commit. In this current case, it's something along the lines of "Add Game 0"
* Descrition - point form, detailed notes of what you've changed. When you visit past commits through history, you'll see your summary/description of what has changed over time. In this case, we've "uploaded Game 0 - Piggy platformer"

*Don't skip the documentation step about what changes were made when making uploads*. This is how we keep track of our changes over time, it is our "trail of breadcrumbs" so to speak.  

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203299786-98f03d68-6565-427d-8738-837171106137.png">

Press the blue button "commit to main/master". This commits it to our Github history locally on our computer. 

Then, press "Publish repository". This "publish" is what sends our first initial changes to the remote file server (cloud storage) on Github. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203300030-6cd3fcc1-46be-412c-9b96-000251582222.png">

Now, to back to github to view your repo. You should now see all of your changes are now available online, great! 

<img width="564" alt="Screenshot 2024-01-25 at 10 39 30" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/fc11719b-d3ab-4d56-b0de-83af21948418">


### Task 2: Modifying a Game
Now that you have a basic idea of github workflow, let's practice something you'll regularly do at the end of each class and throughout the semester. At the end of each class, you'll commit and push any code changes to remote. 

Let's pretend that we're going to program our game for the day. Head to [editor.construct.net](editor.construct.net) and select Menu > open > local folder. Select your "game 0 piggy platformer" folder. 

<img width="412" alt="Screenshot 2024-01-25 at 10 41 35" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/da928e4d-d7b5-49f2-a250-cb885f564bb0">

With your piggy platformer open, add in one more pickup tomatoe, and one more ground sprite. Whew, with all those changes made this class, that was a solid 80m work block making all those changes! Class is almost over, it's time to save the game as a local folder inside of the github repo. Do this now. 

Next, open up Github Desktop. You should notice that a few of the files were changed, but not near as many as when we first uploaded the game. You'll have a LAYOUT.json file changed, a project.c3proj file changed, and likely a few others. Notice the yellow "." on changed files. However, you won't have any EVENTSHEET.json files changed, that's because we only modified a layout, not any code event sheets. 

<img width="500" alt="Screenshot 2024-01-25 at 10 43 17" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/5e76ba3f-b800-443f-9e1f-9122c1cc29bf">

Class is almost over, make another Commit and Push (with relevant descriptions and summaries!). Now your changes are up on Github. 

Okay, scenario over. This is what you'll do at the end of every class session. Save, Commit, Push. Thats it, you now know how to commit and push changes to GitHub's remote server. 

Why do this? 15% of students every semester save a file incorrectly by accident corrupting the file, or write some code that *breaks their entire program*. Rather than having to restart the entire project, you can go back in history and "pull" the last save, rewriting over any work done today that broke the program, but also saving any work done up to this point. Heed this warning, those who don't commit and push every class always end up losing work at some point throughout the semester and have to redo a lot of effort. 


## Viewing your Github History
In the future, you'll be making many new games, and it will help to be able to see your project history over time to see what changes have been made. On your repo online (Menu Bar > Repository > View on Github), click on the "commit history" button. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203317380-2df1f044-3a58-4e60-8071-5585d1ab4e9d.png">

Here, you'll be greeted with all your current commits. If you click inside one of the named versions, you'll be able to see how many changes have been made to the file itself. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 45 03" src="https://user-images.githubusercontent.com/101632496/203317456-440006f4-4ce7-4c1f-bfc4-565697219c1d.png">

<img width="500" alt="Screen Shot 2022-11-22 at 13 45 27" src="https://user-images.githubusercontent.com/101632496/203317488-4236bb98-3a04-4670-a87b-af6263340402.png">

Here we can see that I've changed some text on a readme.md file. In yours, you'll likely see whatever new game 0 folder & files that you've added inside. 



