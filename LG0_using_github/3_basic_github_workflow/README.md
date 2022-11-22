# Using Github

We'll use Github close to every class in this course for a few purposes:
1. It is an online backup of our work so we never lose any days of programming, designing, etc. 
2. It is a way of keeping track of our file changes over time, so we can "go back in time" to see what we've done, as well as restore any files we may have deleted by accident. 
3. It is an industry standard tool, so it is important to know how to use technology that real game designers use every day.

## Basic Github workflow

While we won't use every feature of github (no need for "branches") this will be our basic workflow for using Github in this course: (all steps will be further explained later on). 

1. Make changes to your local computer file folders. This could be things like:
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

2. Publish changes to remote to save your files online.

## Github workflow Practice
Now it's your turn to practice using Github.

### Task 1: Updating Your README.md
Your readme.md is your main landing page for your Github folder, it tells the user what is happening inside each folder. You are actually currently reading the README.md for this current folder in this Github repo. Let's edit your readme.md to be more relevant to your repo. 

1. Locate the repository's local folder on your computer via your finder, or in the menu bar, Repository > reveal in finder. Then, right click to open the README.md file with "text edit" (Open> Open with Text Edit) and write 
` This is my first initial change to a repository! I'll be using this repo to store all of my game design files
`

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="(https://user-images.githubusercontent.com/101632496/203297057-c9d19084-1bcb-45c5-9e75-3d897c8f240a.png">

2. Headback to the GitHub desktop app, and in your repo under the "Changes" column, you'll likely notice your new changes mentioned in green. This is a new addition to your codebase or folder since we last published this change to remote. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203297782-4b8621cb-631a-44d8-8de7-278b30d7baea.png">

3. Presently this change is only on your computer. We need to "publish" this change to our remote server so that it is saved online. To do this, we need to add 2 things. 
* Summary - a title for what changes you made since your last commit. In this current case, it's updating the README.md
* Descrition - point form, detailed notes of what you've changed. In this case, we've added a greeting to our readme, and explained the purpose of our repo. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203299786-98f03d68-6565-427d-8738-837171106137.png">

4. Press the blue button "commit to main/master". This commits it to our Github history, but not yet to remote. 
5. Press "push Origin". This push is what sends our changes to the remote file server on Github. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203300030-6cd3fcc1-46be-412c-9b96-000251582222.png">

6. View your repo on github. you should now see your readme.md has been updated with your changes, and all of your changes are now available online, great! 

### Task 2: Adding Game Artwork Sprites
Now that you have a basic idea of github workflow, let's practice something you'll regularly do at the end of each class and throughout the semester. At the end of each class, you'll commit and push any code changes to remote. Additonally, when you add artwork to your game, sounds, etc, you'll also commit and push these changes. Let's practice adding some game artwork. 

1. In your repo on your computer, make a new folder called "game assets". 
2. Download [these](https://drive.google.com/drive/folders/1FQZrd1uOHYj2w1sV_NJnRZGqQFOi6Ss4?usp=share_link) free Creative Commons game asset files from Kenny.nl. You'll be using these assets in a later game. Place this downloaded folder into your github repo. 
3. Go to Github desktop. You should notice that these files are now "staged" in the changes section. Make a relevant title & description, then commit & push these changes to remote. 

Thats it, you now know how to commit and push changes to GitHub's remote server. 


## Viewing your Github History
In the future, you'll be making many new games, and it will help to be able to see your project history over time to see what changes have been made. On your repo online (Menu Bar > Repository > View on Github), click on the "commit history" button. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 44 48" src="https://user-images.githubusercontent.com/101632496/203317380-2df1f044-3a58-4e60-8071-5585d1ab4e9d.png">

Here, you'll be greeted with all your current commits. If you click inside one of the named versions, you'll be able to see how many changes have been made to the file itself. 

<img width="500" alt="Screen Shot 2022-11-22 at 13 45 03" src="https://user-images.githubusercontent.com/101632496/203317456-440006f4-4ce7-4c1f-bfc4-565697219c1d.png">

<img width="500" alt="Screen Shot 2022-11-22 at 13 45 27" src="https://user-images.githubusercontent.com/101632496/203317488-4236bb98-3a04-4670-a87b-af6263340402.png">

Here we can see that I've changed some text on a readme.md file. In yours, you'll likely see whatever new game assets you've added inside. 


##### From now on, it is the expectation that you will be commiting and pushing your code/game changes at the end of every class. 



