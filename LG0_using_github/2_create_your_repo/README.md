# Using Github Desktop

Now that you have GitHub desktop installed, let's learn how to use the program. This module will first teach you about some features of GitHub, then you'll practice them further down. 

## What is a "Repository"?
A repository contains all of your project's files and each file's revision history. Think of it like Google Drive, but for your code. You can access Google Drive files on your phone, or any other computer you go to drive.google.com on. In Google Drive, you have the files stored locally on your computer, *and* stored in the cloud on Google's servers. The same is true of Github. 

A repository is a folder on your computer where you can store all of your project files. However, the special thing about a Github repository is that we can see all changes to various files over time, and we can easily collaborate with partners on large projects. You're going to use a lot of repositories throughout this course, infact, you're currently accessing *my* repository for the course here on this very page! It just so happens that my repository includes a lof of text and tutorials, rather than code.  

In this course, you will be creating and using 1 main repository to store ALL of your course files. All of your written work will be stored here, as well as any assignments, games, and artwork you create. The best part about this is that it is similar to Google-Drive in that it backs up all your files on "remote" (or a cloud server) so that even if your computer crashes, your files will be stored online. This also means that you can sign in to any computer anywhere on earth and still have access to your repository online. 

## How to Navigate a repository

Let's examine a "finished" repository's structure. Head over to this courses' main Github repository ("repo" for short) [here](https://github.com/MrPrattASH/Game_Design_In_Construct_3). You'll be greated to a page that looks like this:

<img width="500" alt="Screen Shot 2022-11-21 at 15 44 12" src="https://user-images.githubusercontent.com/101632496/203083541-caee5593-666a-4303-bef4-ccb3235cab31.png">

This section is our repo title. It will have UserName/RepoName in it's title. Coincidentally, this is also the URL for your repository! if you go to "https://github.com/MrPrattASH/Game_Design_In_Construct_3" in your web browser, you'll also return back to this page. The main heading tab " <> code " is what we'll use for the majority of this course, we wont be using issues, branches, wikis, or pull requests. Though if you know how to use these features already, go ahead and use them to their fullest extents. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 44 35" src="https://user-images.githubusercontent.com/101632496/203083615-c6c0b231-a272-4e45-afa0-89f8d66af916.png">

Further below, you will find the main file structure. This is what the folders look like on Github's remote server...

<img width="500" alt="Screen Shot 2022-11-21 at 15 46 42" src="https://user-images.githubusercontent.com/101632496/203084115-06be594d-b75b-428e-9302-1be43728bc33.png">

## Local Version
We've just examined the "remote" version of our Github repo. What does this repo look like if it were stored locally on your computer? (Git Repo's store a copy on your computer AND online). Look at the picture below. Notice that the file structure is the same, but one is an "online" version, and the next is your "offline" or "local" version. They look the same, eh? That's because what is on your computer is the same as what is on your online github repo. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 47 47" src="https://user-images.githubusercontent.com/101632496/203084366-90546ddc-b81f-4684-ad78-1037897f7103.png">

Go ahead and click on the LG0_using_github folder.  You should notice that these folders again, also look the same as on a computer. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 49 45" src="https://user-images.githubusercontent.com/101632496/203084825-ee152609-1b3f-4d17-8fe0-fb3dc20e1ff5.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 49 56" src="https://user-images.githubusercontent.com/101632496/203084865-a9ed4d05-2558-4ca1-908e-3a0e3052f82c.png">

The difference being, GitHub's version is stored *online*, and can show a history of changes over time.(in the history/commits section) 

You'll notice that most pages include a README.md file. That's the file you're currently reading right now, and it's the way that we can type instructions or documentation for our users in each various folder. It's not necessary for you to include a README.md in ever folder, though you will see one in this current repo because I've attached instructions on each assignment here. 

## Creating your first Repo

Let's get your own repo setup. You're going to use this repo for all course work. We're going to use the folder you created to store your piggy game originally in last class in LG-1. Once we save some initial setup files for a Github repo, we'll "push" this folder onto our gitrepo remote location to store it on Github's servers. 

1. In your computer's document folder, locate your folder called "Game Design" that you created last class. This is where we will store all course content for proper file management. Get organized from the beginning, *you are not permitted to use your downloads folder or desktop for working on active files throughout this course.*

2. Using the Github Desktop App, create a new repository in side your Game Design folder called "Game Design Repo-First-Last Initials". (File > New Repository). (In My Case, Game Design B-P)
In the Repo settings:
* Local path should be the folder you just created in step 1. 
* Initialize this repository with a README.md file
* Leve ignore blank for now
* set your license to MIT
* create your repo

<img width="500" alt="Screen Shot 2022-11-21 at 15 54 23" src="https://user-images.githubusercontent.com/101632496/203085790-4087c308-e934-4a5d-99c3-27712bf339a9.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 55 20" src="https://user-images.githubusercontent.com/101632496/203086050-8bcadb82-5378-4b44-a37b-01bb7961ce5e.png">

## ignoring files

Why do we want Github to "ignore" some of the files that we upload? Ignored files are NOT uploaded to the remote server, but they *DO* stay on your computer. Let's say for example, you're collaborating on a final project with a partner. You work on level 1, while they code level 2. Your partner LOVES having a pink background, while you LOVE blue. this is a ui.state file, for "User Interface" (the colour of our background). Since this isnt real code, simple a theme, we want to ignore these temporary files. We ignore temporary files that shouldn't be saved, such as: 

* .uistate.json: This is your User Interface setup in Construct 3, our course game engine. Things like the size of your browser page, what tabs you have open, etc. We don't want to update this everytime we save our code because these are temporary and change each time we open our game. 
* .DS_Store: This is a local macOS file that gets updated when folders were last accessed. It's a hidden file that says a date, and is not relevant to our repo so we can safely ignore this. If we didn't, we would make a "change" to our repo every time we opened the local folder, even if we didn't change any code. 

In your repository settings (Menu Bar: Repository > Repository Settings), add these 2 lines to the IgnoredFiles section: (*remove quotation marks*)
* "*uistate.json"
* "**/.DS_Store"

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 10" src="https://user-images.githubusercontent.com/101632496/203086448-90da3af4-21f1-437d-a601-3ec0e181a041.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 40" src="https://user-images.githubusercontent.com/101632496/203086586-62ab3253-7564-42b5-a45d-43f1decee8fc.png">
 

## Pushing your Repo to "Remote"
With your local repo all set up, presently, your repo only exists on your local computer in Documents > Game Design. To get the benefits of Github's cloud servers, we need to "publish" this repository through the menu at the top, or through the giant blue button, same deal. For now, Keep this code private. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 40" src="https://user-images.githubusercontent.com/101632496/203248945-f4787d85-51e5-4261-9906-7de360870dd3.png">

You'll now notice that you can "view on Github" (Menu Bar: Repository > View on Github). Click that, and you should notice your (very empty) repo up on a website! If you added a description to your Commit/Push, you'll also see this in github remote now. If you compare your remote vs. your local file structure (like we did at the start of this unit), they should look the same. 
