# Making a 3D FPS
We're now going to explore a 3D styled game, a throwback to the days of Doom, if you've ever played. Construct 3's 3D engine capabilities are not near as powerful as it's 2D abilites, and even though it does have 3D capabilities, it is more of a "3D" game. In any case, we'll learn about a new example bare-bones game that you can build off of to make your own 3D FPS, and about timers, a generalized behaviour that we can apply to any of our games to make time-based events. By the end of this tutorial, you'll have made a game like the following below. 

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/101632496/206664084-95077525-08cc-4185-9096-8648fabbd169.gif)


## By the end of this tutorial you should know:
1. How a 3D object is presented in construct 3
2. What a *timer* behaviour is
3. How to use *timers* to create in-game, timebased powerup events


# Tutorial
We're going to build upon one of construct 3's "barebones templates" in the example browser today. 

## Examining Pre-built Code

1. Navigate back to the example browser at [editor.construct.net](https://editor.construct.net) and select "barebones template" as a filter. Inside this filter, search for "FIRST-PERSON SHOOTER".

![Screenshot 2022-12-09 at 10 27 44](https://user-images.githubusercontent.com/101632496/206669770-d39517f7-02bc-426f-9dd9-93580109b8a8.png)

2. Uing the skills you learned in LG1 examining the alternative controls template game, examine how this game functions. (If you can't figure it out from comments, see the bottom header of this tutorial page called "First-Person Shooter Explained".) as a reminder:
* look at all game layouts first. discover where sprites/objects are placed. look what layers are present
* See what object types/sprites exist in the project panel (right side)
* look through all event sheets. Read through code comments & order of events to discover in-game logic. 
* In this game specifially, toggle the code groups "3d camera" and "2D camera" enabled/disabled to see how 3D objects look in 2D form. (this means this can also be an "isometric" top down shooter as well!) 
* Note: for this game comments, you'll want to open the animations editor of the "piggy billboard" object to discover what is meant by the comment: "we only want to see the right faces in first-person mode"
* ![Screenshot 2022-12-09 at 10 33 00](https://user-images.githubusercontent.com/101632496/206670751-d84ff27a-d9c6-4f70-9f5e-a0a9e0a0c9ee.png)


## Tutorial = Timers
Before moving on to this step, you should understand how the 3d camera object works, and how the Piggy billboards always turn their right face to look at the player. 

1. First, let's make these 3dShape objects look a little more interesting. Inside this repo folder is a folder called "game_assets" (taken from Kenny.nl)(LG3 > mod 0 > game assets). Open the animations editor and replace all 6 billboards with the correct images.
* You can drag and drop from your cloned repo into the animations editor
* once all animations are uploaded, they'll be the wrong size. We need to crop all animations to remove the transparent space. 
* From this
* ![Screenshot 2022-12-09 at 10 54 13](https://user-images.githubusercontent.com/101632496/206675972-11e3dd41-3359-4b5a-b407-6937069d82d0.png)
* ![Screenshot 2022-12-09 at 10 54 20](https://user-images.githubusercontent.com/101632496/206676000-e7dcb3f1-75f1-4d78-91ad-af53ca806bb4.png)
* to this
* ![Screenshot 2022-12-09 at 10 54 39](https://user-images.githubusercontent.com/101632496/206676008-fa13c541-5652-4b6d-a516-cf60995b22f6.png)
* We'll also need to correct the image point "origin" back to centre, or all of our sprites will shift down 100px. Select image point, right click > quick assign > middle. Then, right click again > apply to all animations. Whenever you upload custom artwork, be sure to crop and correct the origin image points, or things will "float" or drift to weird locations in your layout. 
* ![Screenshot 2022-12-09 at 10 55 10](https://user-images.githubusercontent.com/101632496/206676263-a6b61ff1-2bfb-455e-81f0-56494d0afa58.png)
* ![Screenshot 2022-12-09 at 10 55 15](https://user-images.githubusercontent.com/101632496/206676277-7828d95e-947b-46e6-8a09-b426c2fdc141.png)





# First-Person Shooter Explained
Watch through [this video]() for a step by step walkthrough & further explanation of the code. 
3D objects Animation Editor (from the viewpoint of the editor):
