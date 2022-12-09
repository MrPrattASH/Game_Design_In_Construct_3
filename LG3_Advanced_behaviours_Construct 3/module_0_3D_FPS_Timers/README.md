# Making a 3D FPS
We're now going to explore a 3D styled game, a throwback to the days of Doom, if you've ever played. Construct 3's 3D engine capabilities are not near as powerful as it's 2D abilites, and even though it does have 3D capabilities, it is more of a "3D" game. In any case, we'll learn about a new example bare-bones game that you can build off of to make your own 3D FPS, and about timers, a generalized behaviour that we can apply to any of our games to make time-based events. By the end of this tutorial, you'll have made a game like the following below. 

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/101632496/206664084-95077525-08cc-4185-9096-8648fabbd169.gif)


## By the end of this tutorial you should know:
1. How a 3D object is presented in construct 3
2. What a *timer* behaviour is
3. How to use *timers* to create in-game, timebased powerup events
4. What the "Sine" behaviour is, and how it can create floating back/forth objects. 


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
* Note, the player is controlled using the "car" behaviour, and the pigs use the "bullet" behaviour with "bounce off solid" enabled. 
* Note: for this game comments, you'll want to open the animations editor of the "piggy billboard" object to discover what is meant by the comment: "we only want to see the right faces in first-person mode"
* ![Screenshot 2022-12-09 at 10 33 00](https://user-images.githubusercontent.com/101632496/206670751-d84ff27a-d9c6-4f70-9f5e-a0a9e0a0c9ee.png)


## Tutorial = Timers
Before moving on to this step, you should understand how the 3d camera object works, and how the Piggy billboards always turn their right face to look at the player. 

### Changing the 3D shape

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

That already looks a lot better. 

## Adding a "Super Bullet" 
We'll now use the timer object to create a "super" bullet tomato in our game. Regularly, tomatoes only do 1HP of damage, but we want to create a pickup that gives us a super bullet, doing a full 5 points of damage capable of killing a pig in a single shot. Here's what we want to do in order:
* Create a "super tomato" pickup object, and a super tomato "bullet" object. 1 is the level pickup, the other the bullet that fires.
* Once picked up the powerup, give the player a "super tomato" bullet, fired with the "V" key
* Once fired, start a 3 second "cooldown" timer
* after 3 seconds has passed/cooled down, give the player another super tomato
* reate a "heads up display" layer to let the player know when their powerup is ready to fire again


### Create a "super tomato" pickup object

1. In the project panel, right click on the tomato and select clone.

![Screenshot 2022-12-09 at 11 10 40](https://user-images.githubusercontent.com/101632496/206678239-4c767a1e-be4f-49c9-8ea8-a45ec720d5e2.png)

2. Rename this tomato to "SupertomatoPickup", then open it in the animations editor. Using the "paintbucket" tool, change the tomato's colour to something new, I'm choosing yellow. 
* If you change the "tolerance" slider when using the paintbucket to something high, like 300+, you'll change the red colour AND red-ish colours in a single click. If the tolerance were set at "1", then only that exact shade of red gets replaced. 
* be sure to change both the "back" and "right" animation frames

3. Drag the supertomato somewhere on the layout for the player to pickup. 
4. on the properties panel of the super tomato, remove the the destroy outside layout behaviour and bullet behaviour on the super tomato. 
5. Add in the "sine" behaviour to the super tomato. (this will give our pickup a nice up/down bounce, like our gem in our platformer) Change the sine behaviour to:
* movement: Z elevation (up/down in a 3d game)
* period: 3 (time from start to finish up/down)
* magnitude: 10 (pixels to move by)
* everything else can be 0. 

5. With our super pickup created, we now need to setup the code. We'll first add a global boolean variable (true/false) called "PowerupCollected". Set this initial value to false (unchecked = false, checked = true) 
* on your event sheet, right click > add global variable. You need to do this at the Top or bottom of the event sheet, otherwise you'll create a local variable (for that group only to use) 
* ![Screenshot 2022-12-09 at 11 21 35](https://user-images.githubusercontent.com/101632496/206680413-59da91a5-32b9-4018-b41a-8d98f975fbf3.png)
* ![Screenshot 2022-12-09 at 11 22 22](https://user-images.githubusercontent.com/101632496/206680488-af33ee96-fd07-4d03-a2c9-52aa03935a50.png)

6. Add an event to our player: 
* Event: on collision with super tomato:
* Action: set global boolean "PowerupCollected" > True
* Action: destroy super tomato pickup

![Screenshot 2022-12-09 at 11 42 55](https://user-images.githubusercontent.com/101632496/206684519-3dd843f0-bfbc-45b7-baf4-91278ee3f892.png)


### Making the Super tomato a "super bullet" 
1. clone our super tomato sprite, call it "SuperTomatoBullet" and remove all behaviours. Then, re-add the bullet behaviour and the destroy outside layout behaviour. 

2. We need to have a "placeholder" artwork on our game, otherwise our layout doesn't know what size to create our super bullet on spawn. Drag out our superbullet to the top left side, outside of the layout. Re-size the tomato to 40x40. 

This will tell construct 3 the size we want for our bullet when it is spawned. If we didn't do this, and simply created an object without first sizing it outside of the layout, construct 3 would make our image at the ORIGINAL tomato size, which is 500px. That would be a HUGE bullet! 
![Screenshot 2022-12-09 at 11 29 10](https://user-images.githubusercontent.com/101632496/206681877-ae46c699-f259-4e59-93a8-d9d56a00153b.png)

3. On the player, add the "timer" behaviour. This will allow us to create the cool-down event later. 
4. Let's head back to the event sheet and add in some events, because right now we can pickup our tomato but it doesn't actually do anything. We need to tell the game what to do. 

### Firing the Super Bullet
1. Add a new event with 2 conditions.:
* Keyboard > on key pressed > "V"
* System > Is Boolean Set > PowerupCollected
* ![Screenshot 2022-12-09 at 11 39 39](https://user-images.githubusercontent.com/101632496/206683951-658e3758-000b-4cbe-bdfc-03ef4649ad39.png)

2. As actions, we're going to copy/paste the code from line 8, but instead replace the "Tomato" object with our "SuperTomatoBullet". Now, if we pickup the super tomato pickup, and press V, we should fire a super tomato. Test it out. 

![Screenshot 2022-12-09 at 11 41 38](https://user-images.githubusercontent.com/101632496/206684282-f6f8eeb8-e4a4-4ca3-bc88-f7d04f3be6dc.png)

3. We now need to make our super tomato collide with our piggies. Again, we're going to copy/paste the events in line 10, and change their object from tomato to our super tomatobullet. However, we're going to change "add 1 to hitcount" to "add 5 to hitcount" instead, making our bullet deal 5x as much damage. 

![Screenshot 2022-12-09 at 11 45 32](https://user-images.githubusercontent.com/101632496/206685045-403f5c52-31a1-4a7f-8c56-52d076578511.png)

### Adding the Super Bullet Timer
Now we've got a super-powered pickup! However, our player can use this all the time and spam the "V" key to kill piggies effortlessly. We only want the player to have this powerup once every 3 seconds. This is where the timer comes into play. 

* The timer object creates a variable second timer based on an event. It could start the timer when a key is pressed, when an item spawns, when a player dies/collides with a different object, or any other innumerable ways. 
* The timer object comes with a string (word) "tag" or "label"
* Timers can be "once" or "regular", meaning they trigger their time and end, or trigger their time and restart their timer again forever. 
* The timer has a "on timer -" tag"" event, that can cause something to happen when the timer is finished. 

1. on our "V" key pressed event, add an action
* Action: "Start Timer" > Duration "3.0" > Once > Tag "SuperTomatoBullet"
* Note: With string variables (pink words "between quotes") CaPiTaLs and SpElLiNg matter a LOT. "True" and "true" are 2 different string variables. Be sure you're spelling them correctly!

![Screenshot 2022-12-09 at 11 51 11](https://user-images.githubusercontent.com/101632496/206686124-fb0e41ce-dabe-41c8-b3b7-eafb8ac308bc.png)

2. Add another condition to this event:
* Player > Timer > Is timer "SuperTomatoBullet" running
* Right click on this condition, select "invert"

![Screenshot 2022-12-09 at 11 52 14](https://user-images.githubusercontent.com/101632496/206686258-2c6af0e7-3958-4073-87cc-4b99dd24fe9f.png)

What have we done here? Well, If the player presses V, AND the powerup was collected, AND the timer is currently NOT running, the game will spawn a super bullet. Try it out, you should notice that your game can only spawn a super bullet once every 3 seconds. Why? Let's step through the logic:
1. The timer is not running, and the player has picked up the powerup, setting our global bool True. 
2. The player presses the V key, and because our bool is true and the timer is NOT running, it spawns a super bullet, and starts the 3second timer. 
3. The player presses the V key again. because all 3 conditions are NOT true, (the timer is running!) the actions do not take place. 
4. once 3 seconds elapses again, the player can now shoot their super bullet again. 


# First-Person Shooter Explained
Watch through [this video]() for a step by step walkthrough & further explanation of the code. 
3D objects Animation Editor (from the viewpoint of the editor):
