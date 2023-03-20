# Advanced AI Enemies, Loops, Driving Cars, & Gamepad Control
So far we've explored some *very* rudimentary Artificial Intelligence for our enemy sprites. If you remember back to our platformer game in Learning Guide 1, we simply created edge markers to make our enemies bounce back and forth. Now, we're going to give them some real brains. 

## By the end of this tutorial you should know:
1. What the *Pathfinding* behaviour is, and how to use it
2. How to control a game using a Gamepad
3. How to use a loop to repeat events in a gam


# Tutorial
Again, we're going to build upon one of construct 3's "barebones templates" in the example browser today. Before moving forward, take a look at the finished game here to see what we're going to make.  

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
In this sub-section we'll create our AI car sprite and set it up with all necessary behaviours/instance variables. 

1. Right click on our car sprite and "Clone" it (duplicate it). Rename the sprite "AICar". 

<img width="389" alt="Screenshot 2023-03-20 at 15 22 07" src="https://user-images.githubusercontent.com/101632496/226369061-8f8668f2-f58f-416f-ab58-d31ddca42f74.png">

2. On Our AI car, remove the car behaviour and add the "Pathfinding" behaviour. 
3. On the regular car, disable to scroll-to behaviour, but leave it enabled on the AI car. We're going to want to follow the AI car around the screen as it moves around the path, and when the game is done we'll remove the scroll to behaviour from the AI car and re-enable it for our regular car. For now, it will help us with debugging. 

<img width="277" alt="Screenshot 2023-03-20 at 15 24 01" src="https://user-images.githubusercontent.com/101632496/226369575-8a3eb5fd-8fb3-4051-9c5e-898367000be3.png">

4. Give the AICar sprite 3 instance variables.
- Number: LastCheckpointCrossed
- Number: Laps
- Number: PathFoundState

5. Give the PlayerCar two instance variables.
- Number: Laps
- Number: LastCheckpointCrossed

## Creating Waypoints/Checkpoints
In this subsection, we'll set up our game to allow counting laps. 

All racing games use waypoints/checkpoints throughout the level. Waypoints serve two purposes. 
1. They serve as "checkpoints" for our AI to know where to go next. 
2. They stop the player from cheating. Without checkpoints, the player could simply turn around and drive through the "finish line" to make a lap. Instead, we can check if the player has touched all the checkpoints, and if they have, allow the lap to "count". 

1. Make a new layer and call this "Checkpoints".

<img width="221" alt="Screenshot 2023-03-20 at 15 30 37" src="https://user-images.githubusercontent.com/101632496/226371395-cf27e163-a63c-4559-963f-12564c812259.png">

2. Make a new sprite and call it "Checkpoint". Use the paint bucket tool to fill it in any generic colour, as this will be an invisible marker for game logic, similar to PlayerBox or EdgeMarker from earlier games. 
3. Give the Checkpoint sprite 3 instance variables:
- Number: Checkpoint
- Boolean: IsFinishLine
- Boolean: PlayerCrossed

4. Add 4 checkpoints to the map and label their Checkpoint instance variables 1-4 respectively. The highest number should be your final checkpoint to be crossed. These will serve as our waypoints for both the player car and the AI car. 

<img width="500" alt="Screenshot 2023-03-20 at 15 35 59" src="https://user-images.githubusercontent.com/101632496/226373010-2a73f414-f405-441b-8a49-1eb2c6dab084.png">

5. Create a new sprite and call it "Finish Line". This will be our artwork sprite, no game logic will be applied to this object. Make this sprite a simple colour, or find a checkered flag png online as a placeholder artwork. Place this sprite slightly above the final checkpoint. 

<img width="172" alt="Screenshot 2023-03-20 at 15 40 14" src="https://user-images.githubusercontent.com/101632496/226374167-3d33407a-6936-4ad4-93c0-cb96f68821b1.png">

### Sub Tutorial: How Pathfinding Works
Before we program our AI car to use pathfinding behaviour, it's helpful to know how pathfinding works. This next section is modified from the official construct 3 documentation [here](https://www.construct.net/en/make-games/manuals/construct-3/behavior-reference/pathfinding)

The Pathfinding behavior uses the A* pathfinding algorithm (a well known algorithm for pathfinding, yes, there are multiple ways to find paths) to efficiently find a short path around obstacles.

#### The pathfinding grid
The pathfinding behavior works based on dividing the layout in to a *grid*. Pixel-perfect pathfinding can be extremely slow to process, dividing the layout in to square cells makes the pathfinding more efficient. In the behaviours properties panel of our AICar, you can change the cell size. The larger it is the more efficient pathfinding is. However setting a large cell size can cause problems: a cell can only be entirely obstacle or entirely free, and using large cells can close up small gaps. For example take the following arrangement of obstacles using a cell size of 32:

![image](https://user-images.githubusercontent.com/101632496/226374775-ba7c14f8-6f99-46c8-ab37-0b9976be06d3.png)

It appears that objects should be able to freely move around in between these objects. However if the cells that the pathfinding behavior marks as obstacle are highlighted in red, we see this:

![image](https://user-images.githubusercontent.com/101632496/226375165-59075141-3955-4e1c-9c7e-5cbed7eaaf90.png)

Some of the gaps have been closed off due to the cell size being relatively large compared to the size of the gap. This will make the pathfinding behavior route paths entirely around the obstacles, and never through them. We can help fix this by reducing the cell size to 20 (in our game, we'll use a cell size of 25):

![image](https://user-images.githubusercontent.com/101632496/226375283-d459931f-87e8-4fa9-a6d7-336cf5ba3ba3.png)

Now we can see that the Pathfinding behavior will be able to find routes between these obstacles. However, the smaller cell size will make the pathfinding more CPU intensive. Generally, try to use the largest cell size that does not cause problems navigating around obstacles.

#### finding a path
Calculating a path can take a long time, especially if the cell size is small. To prevent this reducing the game's framerate, the paths are calculated in the background. This means after using the Find path action, the resulting path *is not immediately available*. You must wait for the On path found event trigger to run.

<img width="500" alt="Screenshot 2023-03-20 at 15 45 34" src="https://user-images.githubusercontent.com/101632496/226375682-0d5de883-360d-449d-bc30-2454e7cc8f1a.png">

Only then can you move the object along the path. The game may continue to run for a fraction of a second in between Find path and On path found. 

The result path is a sequence of "nodes" along the grid. The image below demonstrates a four-node path moving the Green triangle to the Blue circle.  (nodes 0 to 3).

![image](https://user-images.githubusercontent.com/101632496/226375840-94a93601-f8a1-4909-bfcc-4a18d50cc717.png)

Below we can see the same pathfinding behaviour in action, in real time, and through more complete terrain, similar to what your AICar will need to do. Any "Solid" object counts as an obstacle for your AICar.   

![7f5pps](https://user-images.githubusercontent.com/101632496/226376471-aa7b39ad-af6e-4ba5-bced-d2cc508e44a0.gif)

Note it may be impossible to find a path, such as trying to navigate to a destination inside a ring of obstacles. In this case, On failed to find path will be triggered instead of On path found. If you ask the pathfinding behavior to pathfind to a destination inside an obstacle, it will simply find the nearest clear cell and pathfind to there instead.

## Using Pathfinding to Create an Advanced AI Car (Incorrectly) 
We'll first incorrectly make our car move using the pathfinding behaviour to demonstrate a principal of pathfinding. Later, we'll clean this movement up. 

1. In the properties panel on the AICar, match the perameters to those below. This means that the PlayerCar and the AICar will move at the exact same speed/accelleration. If you want things to move faster or slower, make sure you change both the PlayerCar's properties, and the AICar's properties. 

<img width="388" alt="Screenshot 2023-03-20 at 15 49 42" src="https://user-images.githubusercontent.com/101632496/226377052-9204a0cc-ac60-42bc-89c1-6ffd974c51fe.png">

2. It's time to make the AI car move, but a bit "choppy". 






and that's it! Preview out your game, you've now created a functional 3D Isometric First Person Shooter. 
