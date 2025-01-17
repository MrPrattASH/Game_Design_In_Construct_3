# Cloning Repos

## Video Tutorial
{% include youtube.html id="LuyT4_bRWOM" %}

---
## Text Tutorial

Another great thing about Github is the ability to clone repos. Essentially, you can take someone elses code base, and "clone" it to your own github account/computer. If your computer gets broken, you can download github desktop on any computer and "clone" your own work as well! 

The repo that you're currently working on can be cloned and added to your own computer as well, giving you access to all of these tutorials, etc, locally on your computer. It also gives you access to all course files, game images, assets, etc, that you'll need in the course. Later on in Learning Guide 1, you will be using many of these games inside this repo as a template for your own games, and you'll need to have local access to the different sprite sheets & game engine files for your own work. By the end of this module, you'll have all the necessary files you'll need to create games in Learning Guide 1 stored locally on your computer. 

## Cloning this Repo

Let's make a copy of the course Git Repo locally on your computer.


1. In your documents folder on your computer, make a new folder called "game_design_tutorials". Do NOT make this folder inside your current repo, it should be a new top level folder. Remember, we're adding a new repo here, so we don't want your repo to include all these course files. 
2. In GitHub Desktop, add a new Repo.
3. Select "Clone Repository…" and insert this URL 

`https://github.com/MrPrattASH/Game_Design_In_Construct_3`

<img width="500" alt="Screen Shot 2022-11-22 at 15 41 04" src="https://user-images.githubusercontent.com/101632496/203341889-0dc10db1-a564-4873-a0d6-338c48bc3659.png">

4. Select a the game_design_tutorials local path for your cloned repo inside your Documents. 
5. Select "clone". 

## Examining a Cloned Repo

Let's take a look at what you just cloned. You should now have access to all of the files in this current repo, locally on your computer. (Menu bar, Repository > Show in Finder). See if you can find a bullet, hero, monster, and explosion picture inside "LG1_Using_Construct3 > module_1.0_ghost_shooter > game_assets". You'll need these assets for your first game in Learning Guide 1. 

Later in this module, you'll need to copy/paste these assets inside your personal repo. Do not do this yet. 

<img width="500" alt="Screen Shot 2022-11-22 at 15 41 04" src="https://user-images.githubusercontent.com/101632496/203342431-e80676cd-d1ea-46fd-b008-167f39137a67.png">

<img width="500" alt="Screen Shot 2022-11-22 at 15 42 51" src="https://user-images.githubusercontent.com/101632496/203342829-9a66d588-38ea-438b-92b4-f44aab6b9286.png">

## Preparing your Repo up for your first game
We're now going to prepare your repo for the creation of your first game (the start of Learning Guide 1). You'll need these files on your personal repo to be able to start learning guide 1. 

1. Inside Github Desktop, select your personal game design repo. (Top left, select current repository, then your repo under your username, not under MRPrattASH's username.)
<img width="500" alt="Screen Shot 2022-11-22 at 15 45 30" src="https://user-images.githubusercontent.com/101632496/203343526-30e6e02c-d649-41f1-b7ec-a16951e2f7dc.png">

2. Reveal your repo's location in Finder, then add a new folder called "Game 1-Ghost Shooter". You'll use this folder to store *all* game related content for the game #1. Inside this folder, create 2 sub-folders. 
* Construct_folder (where we will store our game engine files/code later)
* game_assets (where we will store all of our artwork for this game)

<img width="500" alt="Screen Shot 2022-11-22 at 15 47 37" src="https://user-images.githubusercontent.com/101632496/203343982-b533799b-5149-4df3-9a67-78f99d762e95.png">

3. Inside the game assets sub-folder, copy and paste in all of the png images from where we examined the cloned repo previously(the bullet, hero, monster, explosion, and cracked ground image). You need to copy/paste in these files to your own personal repo. Why? *you cannot make file changes on the MrPrattASH repo*. (You can change this repo on your local computer, but it won't change on remote, because it is MrPrattASH's repo, not your repo). Later on in the course you will need to copy more content from this repo, and I suggest you copy/paste that content again, rather that re-writing the local file paths. 

<img width="500" alt="Screen Shot 2022-11-22 at 15 49 14" src="https://user-images.githubusercontent.com/101632496/203344414-29597a75-6893-479c-ad19-897350fc0ae2.png">

4. Make a Commit to your repo with a relavant title and description. Perhaps:
Title: Game assets
Description: Added sprite images for game #1

5. Push your commit to remote. 

# Final Thoughts on GitHub in Game Design
A few things to keep in mind when considering how we will be using Github in this course:

1. From now on, everytime you begin to create a new game (of which you'll make several throughout the course of Game Design) you need to:
* make a top level folder with your game title
* make 2 sub-folders. 
  * game assets
  * construct folder

If you don't heed this warning, your files will be unorganized and you may overwrite/lose work accidentally. Follow this structure for the rest of the course. 

2. At the end of every class when you are coding, you will need to make a commit and push to your git repo. Keep your push comments/descriptions short, and in point form. This creates a "save point" on your code, so you can go back in time and remove poor code if necessary. 
3. You're welcome to use separate branches for your own repo/games as you wish (if you are aware of what branches are), though this is not necessary. 
4. If you're working on a team/in partners, you should use branches to keep track of new features, as with multiple developers, things can get messy quickly. However, you won't be working with partners (or potentially, it is optional) until the final game project. 
