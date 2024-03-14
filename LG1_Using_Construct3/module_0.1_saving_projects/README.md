# Saving Games in Construct 3
Well done designer, you've successfully completed your first (simple) game. Now it's time to save this work so we don't lose it. 

## By the end of this module you should know:
1. How to properly save construct 3 games to your git repo.

# Tutorial

## Saving Games
1. On your computer's Document folder, make a new folder called "Game Design". Inside this folder, add in a sub folder called "Game 0 Simple Pig Platformer". 
If done correctly, your folder structure should look like the following below. Note the correct main folder and subfolder structure. 

<img width="538" alt="Screenshot 2024-01-25 at 09 42 03" src="https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/9adfa775-37c0-4395-8591-8e782edf6aa5">


2. There are 2 ways to save games in construct 3. Project Files, and Project Folders. 
* Project files store EVERYTHING inside a single file, similar to a .zip archive. 
* Project folders store your game inside discrete folders. 

For every game in this course, we'll save it as a Project Folder. The reason being that if we happen to corrupt something in a project folder, we only corrupt a single portion of our file, rather than the ENTIRE project. Of course, saving things as files still works, but you are running a big risk by doing so. 

With your editor open, choose "Menu - Project - Save as - Save as Project Folder". Select the local path "Game 0 Simple Pig Platformer" that you created in step 1. 

<img width="500" alt="Screenshot 2022-12-01 at 14 03 20" src="https://user-images.githubusercontent.com/101632496/205061433-7aafa119-20d0-4ff4-bdce-a8050b692141.png">

For security reasons you may sometimes see a permission prompt when construct 3 attempts to access your local files. Make sure you allow permission to ensure file access works. 

<img width="500" alt="Screenshot 2022-12-01 at 14 03 20" src="https://user-images.githubusercontent.com/101632496/205061753-0f6461de-ef0a-4c9f-84e1-5e5a9d143e95.png">

3. If you've done it correctly, it might look something like this: Where inside my main repo, I have a folder called "extension_project_construct_folder". I have saved my construct folder here, where you can see all my game files inside. 

<img width="500" alt="Screenshot 2022-12-01 at 14 03 20" src="https://user-images.githubusercontent.com/101632496/205061967-e7b18ce7-4912-4e0f-ab16-ce7304b6a1fa.png">

If you open each sub-folder, you'll notice that:
* in the "layouts" folder, you have "Layout 1". This is the corresponding file for your level layout/design for where exactly you placed your pig, apples, and platforms
* in the "images" folder, you should have your background tile, pig, and apple. the PNG files that the sprite objects correspond to
* in the "event sheets" folder, you have your "event sheet 1", which is where you wrote your code for your game events like destroying an apple on a collision. 
* and so on and so forth. 

You can see how each folder holds a different part of your game structure. Later, you'll make games with multiple layouts (levels) and multiple event sheets, allowing you to collaborate with partners as each partner can work on 1 layout/event sheet at a time, without saving over one another's works. This wouldn't be possible if you only saved your game via files. 

## Opening Games
1. After saving your construct game, close your editor.construct.net tab. Re-open it, and open your construct folder by selecting "Open - Construct folder". Select the local path where you stored your "construct folder". This is how you should open your games from now on as well. 

<img width="500" alt="Screenshot 2022-12-01 at 14 03 20" src="https://user-images.githubusercontent.com/101632496/205062964-dea170fc-1053-4fea-b987-c465cf4a46f1.png">


