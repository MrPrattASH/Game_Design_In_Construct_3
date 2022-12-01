# Using Github Desktop

## What is a "Repository"?
A repository contains all of your project's files and each file's revision history. A repository is a folder on your computer where you can store all of your project files. However, the special thing about a Github repository is that we can see all changes to various files over time, and we can easily collaborate with partners on large projects. You're going to use a lot of repositories throughout this course, infact, you're currently accessing my repository for the course here! 

In this course, you will be creating and using 1 main repository to store ALL of your course files. All of your written work will be stored here, as well as any assignments, games, and artwork you create. The best part about this is that it is similar to Google-Drive in that it backs up all your files on "remote" (or a cloud server) so that even if your computer crashes, your files will be stored online. This also means that you can sign in to any computer anywhere on earth and still have access to your repository online. 

This tutorial will show you how to both create, and navigate a repository. 

## Navigating a repository

Head over to this courses' main Github repository ("repo" for short) [here](https://github.com/MrPrattASH/Game_Design_In_Construct_3). You'll be greated to a page that looks like this:

<img width="500" alt="Screen Shot 2022-11-21 at 15 44 12" src="https://user-images.githubusercontent.com/101632496/203083541-caee5593-666a-4303-bef4-ccb3235cab31.png">

This section is our repo title. It will have UserName/RepoName in it's title. Coincidentally, this is also the URL for your repository! if you go to www.https://github.com/MrPrattASH/Game_Design_In_Construct_3 in your web browser, you'll also return back to this page. The main heading tab " <> code " is what we'll use for the majority of this course, we wont be using issues, branches, wikis, or pull requests. Though if you know how to use these features already, go ahead and use them to their fullest extents. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 44 35" src="https://user-images.githubusercontent.com/101632496/203083615-c6c0b231-a272-4e45-afa0-89f8d66af916.png">

Further below, you will find the main file structure. This is what the folders look like on Github...

<img width="500" alt="Screen Shot 2022-11-21 at 15 46 42" src="https://user-images.githubusercontent.com/101632496/203084115-06be594d-b75b-428e-9302-1be43728bc33.png">

And this is what they look like on your computer. They look the same, eh? That's because what is on your computer is the same as what is on your online github repo. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 47 47" src="https://user-images.githubusercontent.com/101632496/203084366-90546ddc-b81f-4684-ad78-1037897f7103.png">

Go ahead and click into the LG0_using_github folder.  You should notice that these folders again, also look the same as on your computer. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 49 45" src="https://user-images.githubusercontent.com/101632496/203084825-ee152609-1b3f-4d17-8fe0-fb3dc20e1ff5.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 49 56" src="https://user-images.githubusercontent.com/101632496/203084865-a9ed4d05-2558-4ca1-908e-3a0e3052f82c.png">

The difference being, GitHub's version is stored online, and can show a history of changes over time. You'll notice that most pages include a README.md file. That's the file you're currently reading right now, and it's the way that we can type instructions or documentation for our users in each various folder. It's not necessary for you to include a README.md in ever folder, though you will see one in this current repo because I've attached instructions on each assignment here. 

## Creating your first Repo

You're going to use this next repo for all course work, so don't lose it! First, we'll create the folder on our computer, then, we'll push the folder onto our gitrepo. 

1. In your computer's document folder, create a new folder called "Game Design". This is where we will store all course content for proper file management. Get organized from the beginning, you are not permitted to use your downloads folder or desktop for working on active files throughout this course.  

2. Using the Github Desktop App, create a new repository in side your Game Design folder called "Initial-Test-Repository". (File > New Repository).
* Local path should be the folder you just created in step 1. 
* Initialize this repository with a README.md file
* don't ignore any files (for now)
* set your license to MIT
* create your repo

<img width="500" alt="Screen Shot 2022-11-21 at 15 54 23" src="https://user-images.githubusercontent.com/101632496/203085790-4087c308-e934-4a5d-99c3-27712bf339a9.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 55 20" src="https://user-images.githubusercontent.com/101632496/203086050-8bcadb82-5378-4b44-a37b-01bb7961ce5e.png">

3. Ignore some files. In your repository settings (Repository > Repository Settings), add these 2 lines to the IgnoredFiles section:
* *istate.json
* **/.DS_Store

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 10" src="https://user-images.githubusercontent.com/101632496/203086448-90da3af4-21f1-437d-a601-3ec0e181a041.png">

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 40" src="https://user-images.githubusercontent.com/101632496/203086586-62ab3253-7564-42b5-a45d-43f1decee8fc.png">

What are these files and why should we ignore them? Ignored files are essentially NOT uploaded to remote, but they DO stay on your computer. They're generally used for ignoring temporary files such as: 
* .uistate.json is your User Interface setup in Construct 3. Things like the size of your browser page, what tabs you have open, etc. We don't want to update this everytime we save our code because these are temporary. 
* .DS_Store is a local macOS file that gets updated when folders were last accessed. It's a hidden file that says a date, and is not relevant to our repo.  

## Pushing your Repo to "Remote"
Presently, your repo only exists on your local computer in Documents > Game Design (or whatever local path you have presently set up). We now need to "publish" this repository through the menu at the top, or through the giant blue button, same deal. For now, Keep this code private. 

<img width="500" alt="Screen Shot 2022-11-21 at 15 57 40" src="https://user-images.githubusercontent.com/101632496/203248945-f4787d85-51e5-4261-9906-7de360870dd3.png">

You'll now notice that you can "view on Github". Click that, and you should notice your (blank) repo up on a website! If you added a description, you'll also see this in github remote now. 
