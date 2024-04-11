# Advanced AI Enemies, Loops & Driving Cars
So far we've explored some *very* rudimentary Artificial Intelligence for our enemy sprites. If you remember back to our platformer game in Learning Guide 1, we simply created edge markers to make our enemies bounce back and forth. Now, we're going to give them some real brains. 

## By the end of this tutorial you should know:
1. What the *Pathfinding* behaviour is, and how to use it
2. How to use a loop to repeat events in a game
3. #Optional: How to control a game using a Gamepad



# Tutorial
Again, we're going to build upon one of construct 3's "barebones templates" in the example browser today. Before moving forward, take a look at the finished game in the above folder to see what we're going to make.  

## Examining Pre-built Code

1. Navigate back to the example browser at [editor.construct.net](https://editor.construct.net) and select "barebones template" as a filter. Inside this filter, search for "DRIVING".

<img width="258" alt="Screenshot 2023-03-20 at 15 19 44" src="https://user-images.githubusercontent.com/101632496/226368410-e2f1d923-207f-4eaa-add2-6c3a8a5db055.png">

2. Using the skills you learned in LG1 examining the alternative controls template game, examine how this game functions. (If you can't figure it out from comments, talk to a peer beside you or ask your teacher for help) 
as a reminder:
* look at all game layouts first. discover where sprites/objects are placed. look what layers are present. Particularly on the car, the "Car" behaviour and its properties. 
* See what object types/sprites exist in the project panel (right side)
* look through all event sheets. Read through code comments & order of events to discover in-game logic. 
* While you don't need to understand *how* the camera effect works, you should know that this code makes your camera scale zoom in and out. 


# Tutorial 

## Making an AI Car Sprite
In this sub-section we'll create our AI car sprite and set it up with all necessary behaviours/instance variables for control later in the tutorial. 

1. Right click on our car sprite and "Clone" it (duplicate it). Rename the sprite "AICar" and use the painbucket tool to turn the car a new colour. I've chosen red. 

<img width="389" alt="Screenshot 2023-03-20 at 15 22 07" src="https://user-images.githubusercontent.com/101632496/226369061-8f8668f2-f58f-416f-ab58-d31ddca42f74.png">

2. On Our AI car, remove the car behaviour and add the "Pathfinding" behaviour. Leave the Scroll to behaviour for now. 
3. On the player car, disable to scroll-to behaviour, but leave it enabled on the AI car. For debugging purposes, we're going to want to follow the AI car around the screen as it moves around the path. When the game is done we'll remove the scroll to behaviour from the AI car and re-enable it for our regular car.

<img width="277" alt="Screenshot 2023-03-20 at 15 24 01" src="https://user-images.githubusercontent.com/101632496/226369575-8a3eb5fd-8fb3-4051-9c5e-898367000be3.png">

4. Give the AICar sprite 3 instance variables.
- Number: LastCheckpointCrossed
- Number: Laps
- Number: PathFoundState

5. Give the PlayerCar one instance variable.
- Number: Laps

## Creating Waypoints/Checkpoints
In this subsection, we'll set up our game to allow counting laps. All racing games use waypoints/checkpoints throughout the level. Waypoints serve two purposes. 
- They serve as "checkpoints" for our AI to know where to go next in the level. 
- They stop the player from cheating. Without checkpoints, the player could simply turn around and drive through the "finish line" to make a lap. Instead, we can check if the player has touched all the checkpoints, and if they have, allow the lap to "count". 


1. Make a new layer and call this "Checkpoints".

<img width="221" alt="Screenshot 2023-03-20 at 15 30 37" src="https://user-images.githubusercontent.com/101632496/226371395-cf27e163-a63c-4559-963f-12564c812259.png">

2. Make a new sprite and call it "Checkpoint". Use the paint bucket tool to fill it in any generic colour, as this will be an invisible marker for game logic, similar to PlayerBox or EdgeMarker from earlier games. Turn off the "initially visible" box in the properties bar. 
 
3. Give the Checkpoint sprite 2 instance variables:
- Number: Checkpoint
- Boolean: PlayerCrossed

4. Add 4 checkpoints to the map and label their Checkpoint instance variables 1-4 respectively. The highest number should be your final checkpoint to be crossed. These will serve as our waypoints for both the player car and the AI car. 

<img width="500" alt="Screenshot 2023-03-20 at 15 35 59" src="https://user-images.githubusercontent.com/101632496/226373010-2a73f414-f405-441b-8a49-1eb2c6dab084.png">

5. Create a new sprite and call it "Finish Line". This will be our artwork sprite, no game logic will be applied to this object. Make this sprite a simple colour, or find a checkered flag png online as a placeholder artwork. Place this sprite slightly above the final checkpoint. 

<img width="172" alt="Screenshot 2023-03-20 at 15 40 14" src="https://user-images.githubusercontent.com/101632496/226374167-3d33407a-6936-4ad4-93c0-cb96f68821b1.png">

### Sub Tutorial: How Pathfinding Works
Before we program our AI car to use pathfinding behaviour, it's helpful to know how pathfinding works. This next section is modified from the official construct 3 documentation [here](https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/pathfinding)

The Pathfinding behavior uses the A* pathfinding algorithm (a well known algorithm in the programming community for pathfinding) to efficiently find a short path around obstacles.

#### The Pathfinding Grid
The pathfinding behavior works based on dividing the layout in to a *grid*. Pixel-perfect pathfinding can be extremely slow to process, dividing the layout in to square cells makes the pathfinding more efficient. In the behaviours properties panel of our AICar, you can change the cell size. The larger it is the more efficient pathfinding is. However setting a large cell size can cause problems: a cell can only be entirely obstacle or entirely free, and using large cells can close up small gaps. For example take the following arrangement of obstacles using a cell size of 32:

![image](https://user-images.githubusercontent.com/101632496/226374775-ba7c14f8-6f99-46c8-ab37-0b9976be06d3.png)

It appears that objects should be able to freely move around in between these objects. However if the cells that the pathfinding behavior marks as obstacle are highlighted in red, we see this:

![image](https://user-images.githubusercontent.com/101632496/226375165-59075141-3955-4e1c-9c7e-5cbed7eaaf90.png)

Some of the gaps have been closed off due to the cell size being relatively large compared to the size of the gap. This will make the pathfinding behavior route paths entirely around the obstacles, and never through them. We can help fix this by reducing the cell size to 20 (in our game, we'll use a cell size of 25):

![image](https://user-images.githubusercontent.com/101632496/226375283-d459931f-87e8-4fa9-a6d7-336cf5ba3ba3.png)

Now we can see that the Pathfinding behavior will be able to find routes between these obstacles. However, the smaller cell size will make the pathfinding more CPU intensive. This means lag in your game. Generally, try to use the largest cell size that does not cause problems navigating around obstacles. If you find your enemies are not navigating the map properly, reduce their cell size in the behaviours property panel. 

#### Finding a Path
Calculating a path can take a long time, especially if the cell size is small. To prevent this reducing the game's framerate, the paths are calculated in the background. This means after using the Find path action, the resulting path *is not immediately available*. You must wait for the On path found event trigger to run. Basically, your pathfinding "find path" behaviour does *not happen sequentially (in order) as other code does*. 

<img width="500" alt="Screenshot 2023-03-20 at 15 45 34" src="https://user-images.githubusercontent.com/101632496/226375682-0d5de883-360d-449d-bc30-2454e7cc8f1a.png">

The event "on path found" tells the game once a path has been calculated. Once this event triggers, you can move the object along the path. As a note, the game may continue to run for a fraction of a second in between Find path and On path found. 

The result path is a sequence of "nodes" along the grid. The image below demonstrates a four-node path moving the Green triangle to the Blue circle.  (nodes 0 to 3), with arrows being nodes "along the path" and the circle being the final destination node. 

![image](https://user-images.githubusercontent.com/101632496/226375840-94a93601-f8a1-4909-bfcc-4a18d50cc717.png)

Below we can see the same pathfinding behaviour in action. I am clicking on the screen and the green triangle goes to the location of my click. Any "Solid" object counts as an obstacle for your AICar.   

![7f5pps](https://user-images.githubusercontent.com/101632496/226376471-aa7b39ad-af6e-4ba5-bced-d2cc508e44a0.gif)

Note it may be impossible to find a path, such as trying to navigate to a destination inside a ring of obstacles. In this case, On failed to find path will be triggered instead of On path found. If you ask the pathfinding behavior to pathfind to a destination inside an obstacle, it will simply find the nearest clear cell and pathfind to there instead.

## Using Pathfinding to Create an Advanced AI Car (Incorrectly) 
Let's get our car moving. In the future, you might use this pathfinding behaviour to make a "homing" bullet, make enemies chase a player, or more...

1. In the properties panel on the AICar, match the perameters to those seen below. The PlayerCar's attributes are the same speed/accel/deccel, so both cars will move at the exact same speed/accelleration. If you want things to move faster or slower, make sure you change both the PlayerCar's properties, and the AICar's properties. 

<img width="400" alt="Screenshot 2023-03-20 at 15 49 42" src="https://user-images.githubusercontent.com/101632496/226377052-9204a0cc-ac60-42bc-89c1-6ffd974c51fe.png">

2. Make a new event with 2 conditions:

<img width="500" alt="Screenshot 2023-03-21 at 10 53 30" src="https://user-images.githubusercontent.com/101632496/226571589-66467da2-daa9-46f5-99d1-9afaf1e884b4.png">

Let's explain what's happening here. The goal of this code is to find the path to take to the next checkpoint. First, we check 2 conditions
1. That the AICar's "Pathfound" state is currently the previous path calculated. 
2. That the checkpoint we are using in code is the NEXT checkpoint in line. (our car's current checkpoint + 1) 

In order for our Pathfinding behaviour to be smooth, we actually have to calculate a path 1 step ahead of time. If we were to calculate the path from 1>2, and when we arrive at 2, calculate the path from 2>3, we would see that our car moves to #2, stops, calculated the next path, then accelerates again. Obviously, a car that starts and stops at every checkpoint is not ideal. So instead, we check "is the car moving in a current path state?" If yes, get the NEXT section of path waypoints to calculate, and calculate this path. So we're always calculating a path 1 waypoint ahead of where we are actually moving. 

**Remember, calculating the path is Different from actually MOVING on the path.**

3. Add a sub event to this event. This will mean that If our car has passed all checkpoints, that we reset the AI back to it's first PathFoundState, checkpoint #0>1. At this point, we can now calculate paths in advance of when we actually move on them. 

<img width="500" alt="Screenshot 2023-03-21 at 10 58 48" src="https://user-images.githubusercontent.com/101632496/226572844-423748cf-4455-47a0-ac76-3b8c3a727bb4.png">

4. Add a new event. When the game engine has found the correct path, tell the car to move along the path. Now our car will actually *move* after finding it's path. 

<img width="500" alt="Screenshot 2023-03-21 at 11 00 05" src="https://user-images.githubusercontent.com/101632496/226573115-b005967c-709d-4f2f-9e61-579862aa96e4.png">

5. Add a new event & sub event. This sets up logic for our pathfinding behaviour above in step #2. We set our car's last checkpoint crossed to the current checkpoint number that we just collided with, and If we have gone over 4 checkpoints, reset our car's lastcheckpointCrossed back to 0 and add 1 to our lap counter. 

<img width="500" alt="Screenshot 2023-03-21 at 13 20 29" src="https://user-images.githubusercontent.com/101632496/226619119-417f168a-6fd9-4d3c-bab8-b0e6782c7034.png">


6. At this point, you've got a functioning, pathfinding car! Test out your layout in debug mode and watch the AI car's instance variables. You should see it's LastCheckpointCrossed variables, and laps variables change overtime as the car progresses throughout the level. 


<img width="500" alt="Screenshot 2023-03-21 at 11 04 05" src="https://user-images.githubusercontent.com/101632496/226574079-cfb4afb3-d3d8-402f-aab8-d5781ed51556.png">

## Stopping the Player Car from Cheating (With Loops!) 
We're now going to stop our player car from being able to cheat as they drive around the map. Essentially, we want the player to have to cross every checkpoint in order for a lap to "count". 

First, we should remove the Scrollto behaviour from our AICar, and re-enable the scrollto behaviour on our Car, so that we drive looking at our car rather than the AICar. 

1. Make a new global number variable called "CheckpointsCrossed". We'll use this to tally how many checkpoints our car has crossed.

2. Add a new event. This will cause each individual checkpoint to set it's PlayerCrossed boolean variable to TRUE when the player collides with it. Notice, this will apply only to the checkpoint that was crossed. You can try it for yourself now. Test your game and drive your player car into one of the checkpoints while in debug. You should notice that ONLY the checkpoint you've crossed has it's PlayerCrossed boolean true, while the others remain false. 

<img width="500" alt="Screenshot 2023-03-21 at 11 14 27" src="https://user-images.githubusercontent.com/101632496/226576374-7c07ed3e-0152-4540-ac54-74ddfa8c612d.png">

3. Add a new sub event. 

<img width="500" alt="Screenshot 2023-03-21 at 11 16 34" src="https://user-images.githubusercontent.com/101632496/226576838-fd2f7d5a-13b1-4bdf-838f-c2a3be48b88d.png">

Here is where we stop the player from actually cheating. First, we check every checkpoint object and see if it's "playercrossed" boolean is true using a "for each" loop. A loop simply repeats a block of code before moving on to other events/conditons. This will loop this block of code for as many checkpoints as we have, or repeat 4 times in our case. For every checkpoint, if this boolean is true (a player crossed it), then add 1 to our global checkpoints crossed variable. 

After our loop has completed running, IF "checkpointscrossed" is greater than or equal to 4 (our total number of checkpoints), add 1 to the player laps count, and reset our global variable back to 0 to setup for the next lap. 

4. Lastly, we need to reset the game state for a new lap, because currently our checkpoints are still saying the player crossed them, even though we're at a new lap. As an additional subevent, for each checkpoint, reset it's PlayerCrossed boolean to False. Now we have a new clean slate map to drive around on. 

<img width="500" alt="Screenshot 2023-03-21 at 11 20 09" src="https://user-images.githubusercontent.com/101632496/226577663-f0aa7a29-5969-423a-ad83-8d4db1ab0636.png">

That's it for the base game, we now have a player car that can drive and a functioning smart AI car. You can debug your game and complete a few laps, you should notice both the player car and AI car's laps numbers counting up progressively. You'll also notice that we can use loops to repeat game logic events without needing to program in every individual sprite. How else might you use a loop in games? 

# Optional Section: Using a Gamepad to control games
Now let's get our car driving using a gamepad/controller. On the arcade cabinet final project, you'll have access to two logitech F310 controllers. 

To make the gamepad work on an M1 mac:
* Disconnect F310 from Mac
* Use an USB-A to USB-C adapter
* On F310: switch X-input to D-input (small slider switch on the back of the controller) 
* Hold **Logitech** button (in the middle)
* Connect F310 to Mac via adapter, now you can release the Logitech button.

Now you should be able to use your gamepad. [Shoutout to Gituser Jackblk for the tutorial](https://gist.github.com/jackblk/8138827afd986f30cf9d26647e8448e1)

## Making the gamepad drive the car

1. On your main layout, add the "Gamepad" object to your game. (Like adding a new sprite, text, or other object)
2. Now we can simulate car controls just like we simulated controls for the WASD, or touch screen controls. It is possible to have multiple gamepads connected, so we'll use gamepad 0 for player 1, and gamepad 1 for player 2 (in future games).

Simulating controls with an analog joystick is slightly different than simulating controls via a keyboard key press like WASD. Instead of a single ON/OFF state from a key press, we actually send a range of values, from -100>100. See the chart below for how these numbers relate to the gamepad. 

- The X/Y axis both centre at 0, and range from -100 > 100 respectively.
- X axis is left/right, Y axis is up/down. Pay attention to +/- values of the Y axis, as it is not intuitive with which direction is positive. 

<img width="500" alt="Screenshot 2023-03-21 at 11 38 40" src="https://user-images.githubusercontent.com/101632496/226596587-78531897-6cab-42ed-a024-5332f45e201e.jpeg">

3. Put in the following code to simulate controls. You may also choose to use the Dpad if you so wish to use a simple ON/OFF feature rather than a range. 

<img width="500" alt="Screenshot 2023-03-21 at 11 38 40" src="https://user-images.githubusercontent.com/101632496/226582281-84335703-0cf0-4ff5-9e57-d7eb0a9d89f5.png">

A few things to note:
- We want to keep a "deadpoint" in the centre of the controller, so we actually start our ranges about 10 +/- points in either direction. We do this because joysticks are not built perfectly. When a joystick is in the "centre" of the controller, it may not actually be the true "centre". Instead, it may actually be reading (x,y) 2,4, or -2,1. If we used our simulate controls as X axis <0, turn left, we risk making our driver move erraticaly because we'd float between -1>4 (for example) and jitter left/right. Instead we use a "deadpoint" or a large range (10 points +/-) where no ouputs are being sent to the game.Effectively, the controller is "dead" in the centre.  
- The "X" axis controls the left/right steering movement
- The "Y" axis controls the up/down accelerate/brake movement. 
- Look at the code and see how the X/Y axis relate to the numbers on the gamepad image above. 

That's it for gamepad logic. You can now make anygame control by a gamepad, if you so wish. 

# Extensions & Finished Game
Take a look at the "finished_example" above for some ways on how you might extend this game beyond what I've done here. You are not required to complete extentions, though you may do so if you wish to further improve your programming abilities. 
- Add a starting light animation that enables the car's driving behaviour, rather than starting the game instantly. 
- Add a UI text that displays the player's current laps. 
