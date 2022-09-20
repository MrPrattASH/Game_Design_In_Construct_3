# Boolean Variables, Conditional Events, & Conditional Sub-Events

This tutorial will teach you about:
- boolean variables, their differences from integers (number variables) and strings (word variables), 
- how to create basic food powerups/collectables that modify main game system mechanics through time slow, invincibility, and additonal scores.

When completed with the tutorial, assess your knowledge using the self-assessment and go back over any content you did not understand. 

First, before starting, play through the example .c3p finished file to get an idea of what you'll be creating (located in this repo that you cloned at the start of the unit). (left click is the only control you need to play). As you can see, you'll be adding "power-ups" to a flappy bird style game. 

## By the end of this tutorial you should know:
1. What a *Boolean or Bool* is
2. How to use the *Timer* Behaviour 
3. How to upload custom sprite artwork
4. The importance of optimized and cropped artwork for sprites
5. How to create custom animations for sprites
6. How to use Boolean variables to control in game events like invincibility power-ups. 
7. The importance of using optimized artwork for game performance
8. what the "random" method is

## Boolean Variables

Before we start making the game, a bit of computer science concepts to talk about first. A **string or "str"** is a text/word variable. An *integer* or *int* is a number variable, like health or score instance variables. In contrast, a **boolean or "bool"** is like a "light switch", it is either on, or off; Booleans are either **True** or **False**. 

For Example, let's assume we have a sprite with an instance variable *invincibility* set as a Bool: 

The player sprite has an instance variable called "inviciblity". It is a Boolean. The player gets hit by an enemy. There are 2 outcomes:
> 
> Condition: invincibility bool is true:
> 
>     Action: player takes no damage
>   
> Conditition: invincibility bool is false:
> 
>     Action: player  -1 from health

In this case, if the player is currently invincible, they take no damage and If they are not, they take 1 damage. Wow! As you can see, booleans are incredibly useful for game design, as they allow for conditions to be true, or false, and events to happen based on these boolean variables. Imagine some ways you could use true/false logic for creating games. They could relate to:
- player is moving (play animation, hit a speed powerup in a racing game)
- player is stopped (player can now open their menu or backpack)
- player is jumping (player can collect object only if they're in the air)
- player is interacting with an event (player wants to talk to a character)
- player collided with another sprite (enemy, power up, coins, collectables, etc)

and so much more. Booleans and events will be used extensively in your games, in fact, you have probably seen boolean variables used in past modules already. 

# Boolean variables and Powerups/Collectables 

Let's get into actually building a game. **In the construct editor**, please open this module's "construct folder". (You cloned this repo at the beginning of Learning Guide 0, and you stored it locally on your computer. Go back to GitHub desktop, Select the cloned repo, "Pull the origin" (to make sure you have up to date changes, as this repo see's updates over time as I change the code inside), then you can open the folder below. 

(Game_Design_In_Construct_3 > module_3_flapping_bird_booleans > flapping_bird_construct_folder)

<img width="358" alt="Screen Shot 2022-09-13 at 11 43 18" src="https://user-images.githubusercontent.com/101632496/189897448-a93873eb-a3c8-43b1-a3ce-b74e2c85b7cc.png">

**Note: I have broken this module into "code groups" by colour. Instead of having all code in a massive line, I have split it up into groups that create similar outcomes of code, for example, all player controls are in one group, all collectables are in another. You do not have to edit any code inside a yellow code-group.  However, you are more than welcome to look at this code (in fact, it's encouraged) so that you can see how these games are created. The yellow blocks provide base functionality, and are not necessary to modify. Instead, for all code in these tutorials, You will modify the code in the green code-groups. **

#Alternate Tutorial Video Option:
If you would prefer to read the tutorial in text, continue. If you would prefer to follow along on this tutorial in video form, you can find the video recording [here](https://youtu.be/97Bca-r-ncs)

## 1. Creating a FoodSprite & Optimizing Artwork for your Game
Now that we have the base-game open, go ahead and test the project to see it's functionality so far. It's a little dry... let's spice it up by adding in powerups. First, we need to create our first powerup, with all associated instance variables. 

all code will be written inside the "Game Events" Event sheet. 
1. Create a new sprite object called "FoodSprite". Add this sprite to the "Object Repository" layout. Re-size appropriately so that it's not too big, or too small inside the viewport window (the hatched rectangle on the layout). 
2. Double-click the FoodSprite in the project folder, and create 3 animations for this sprite. label them Banana, Ham, and Apple respectively. 
<img width="213" alt="Screen Shot 2022-04-14 at 13 05 50" src="https://user-images.githubusercontent.com/101632496/163378948-24126ac5-0843-4b80-9531-c05e02b8b009.png">
3. For each animation, upload the 4 png images using the folder button in the animations editor. You'll find the artwork inside the "game assets" folder from this GitHub module. 
<img width="1280" alt="Screen Shot 2022-04-14 at 13 07 45" src="https://user-images.githubusercontent.com/101632496/163379189-aa643e31-ba82-4df0-9bb2-4a13ae82089e.png">
4.  I've uploaded the artwork too large (something that will commonly happen to you when uploading your artwork) so we need to "crop" each animation. This will remove any "blank" transparent space on each photo, improving game performance. *If an uploaded artwork is 500x500 pixels, but the art itself is only on 100x100 pixels, we have almost 400x400 pixels that are transparent (see-through). Transparent pixels are still rendered by the game, slowing it down! So we Remove the whitespace by cropping, and this dramatically improves game performance*. 
<img width="249" alt="Screen Shot 2022-04-14 at 13 09 42" src="https://user-images.githubusercontent.com/101632496/163379636-8c099dc9-c6ce-46d9-b031-9ef833666a2b.png">
5. In the Animation Properties bar, set an appropriate speed for the animation, and set it to loop. This is up to you how quickly you want this animation to loop, use your creative eye to decide.  Right click on the animation name to select "preview" to watch your animation. Adjust settings at will. 
<img width="321" alt="Screen Shot 2022-04-14 at 13 11 32" src="https://user-images.githubusercontent.com/101632496/163379725-36007f7a-855d-4d12-903c-34521b7276ed.png">
6. Outside of the animation editor, our food sprite needs 2 new instance variables. Add in 
-  a string called *PowerUpType* (we'll use this to create various kinds of powerups later)
-  a boolean called *IsEaten* (we'll use this to signal to our game that it has been collected by the player)
<img width="253" alt="Screen Shot 2022-04-14 at 13 23 30" src="https://user-images.githubusercontent.com/101632496/163381354-ffcb4d00-8ba1-4041-ba5f-b4e8d5e7aea1.png">

The 2nd instance variable is known as a "boolean flag". It is a waving "flag" to tell our game or code that something has happened. We can "wave" the flag as True, or put the "flag down" as False. Essentially, it is going to be used as a calling card for things to happen in our game.  

Now we have the powerup sprite created and in our game, but it currently does not do anything yet. Let's add it into the level and add in some game logic so that it creates a true powerup... 

We need to spawn it in the layout during the game at random Y coordinates (up and down) , similar to how the pipe "gaps" spawn into the game and move across the screen at random Y coordinates. To create this randomness, we're going to use a built in function to create random numbers for us, called the "random" method. A function is a piece of code that allows us to create more functionality to our game, in this case, randomness. 

##### Using The Random Method
We will use this "random" method a LOT throughout this course to generate random numbers. When we're inside of an action parameter, simply type
`
random(num1,num2) 
#num 1 is the low value
#num 2 is the high value
`
This will produce an output of a random number in between the 2 numbers you put in! For example, if you wrote

`random(1,5)
`

You could output either 1,2,3, or 4. (Note: the output is between the numbers, not including the second number).

<img width="197" alt="Screen Shot 2022-04-08 at 08 34 01" src="https://user-images.githubusercontent.com/101632496/162378077-818f2a1c-48fc-4ac5-8eae-2189540461b7.png">
This function allows you to enter values as integers (0,-5,32, etc) and floats (or a "floating" number) (0.12, -3.4932) 

## 2. Spawning food powerups at random Y coordinates
Let's get this food sprite spawning at random Y coordinates, so that we need to fly up and down to catch the food. If we always spawned the food at the same Y coordinate, then the player would always know where in the level the powerup would be located, not so interesting! Randomness adds a challenge to our game. 

1. Create a new  *global variable* (integer) called *SecondsPerPowerUp* and set it to 3.5 initially. We will use this variable to spawn powerups every "SecondsPerPowerUp" seconds, or in this case, every 3.5 seconds, we'll spawn a new power up. 
<img width="856" alt="Screen Shot 2022-09-13 at 14 14 47" src="https://user-images.githubusercontent.com/101632496/189898281-68410784-1527-4595-a9f6-47fb6fcdcdbf.png">

2. In the power-ups code group, create a new event:
> system  > Every X seconds > Every *SecondsPerPowerUp* 
<img width="276" alt="Screen Shot 2022-09-13 at 14 15 19" src="https://user-images.githubusercontent.com/101632496/189898366-18c67964-a314-435b-a1d4-44f742e1f3e6.png">

3. Inside this event, make a new action:
`create object *FoodSprite* on layer 0 at X,Y
`
For the X value, we want to select a value on the the right edge of our layout. How do you know what to select as an appropriate value? Head to your layout, look at the bottom of your screen for Mouse: X,Y. You should notice that as you move your mouse around the layout, you get the current X or Y coordinates of your layout. Use this to decide where to place your X powerup. 

<img width="475" alt="Screen Shot 2022-09-14 at 21 46 25" src="https://user-images.githubusercontent.com/101632496/190248465-bd4f1933-66c7-44bc-89af-77a833db9dfb.png">

For the Y value, we want to select a random Y value that is constrained inside our layout. This Y value will control how high/low the object spawns. We need to constrain this random(low,high) value inside of our layout, as if we choose Y values too large, the food would spawn outside of the layout, and our player could never grab it! Go to the layout and decide what to write inside the Y value: random(low,high) 

<img width="344" alt="Screen Shot 2022-04-14 at 13 15 03" src="https://user-images.githubusercontent.com/101632496/163380175-ce81ab8a-af47-4d1d-9774-f956a5ebdda2.png">

4. Inside the same event, set the animation of the created *FoodSprite* to a fruit of your choice. 
5. Under this same event, create a new sub-event to this same, to check: 
> FoodSprite > Is animation "YourFruit" playing. 

If true, set the foodsprite instance variable *PowerUpType* to "Invincibility". This will be used later to check what type of powerup our pickup is. It also means that we can create a single pickup sprite, with multiple animations, and have *different powerups associated with the same sprite*. This will save a lot of time coding later, as otherwise we would need to create a new sprite for each powerup in our game! 

<img width="829" alt="Screen Shot 2022-09-13 at 14 15 39" src="https://user-images.githubusercontent.com/101632496/189898432-90708464-9a30-4484-ba1b-435b667a62de.png">

Debug your game and test your game out. You should now notice that a powerup is spawing every 3.5 seconds in a random Y location. If not, go back and check your X/Y values for creating the object. 

## 3. Making the Powerup move 

Now that the powerup is spawning, we need to make it move across the screen, similar to how the pipes and ground sprites move across the screen (sidebar, take a look at this code in the yellow code-block now to see how they move).

However, we're going to learn a neat trick in game design to make our sprite move across the screen. We want to move the sprite on *delta time*, not on physical "in game seconds". This is a **critical** distinction. If your game has frame rate drops, events that run every second will skip frames and this means that your food may spawn in erratic places. Having events that run on *delta time* or *dt* (for short) run in line with frames that are running, even if frames are dropped, so the event will trigger as intended. You should use delta time when moving sprites around the layout, whereas you may use in-game seconds to control spawning events. 

In short, delta time runs events with game frames, time runs on actual seconds and may skip dropped frames from lag. 

## Note, multiplying numbers and dividing in code
multiplication in code is different that written. If we wanted to write 
3x7 =21, we would use the letter "x". Not so in code. instead, we use an asterisk
` 3 * 7 = 21`
To denote multiplication. Similarly, in division, we would write
` 21 / 3 = 7`
division uses a "slash" character

1. In the *Background* code group, add a new action to the current "EveryTick" condition. 

`> Condition: EveryTick
> 
> Action: Set FoodSprite.X to FoodSprite.X - SCROLLSPEED * dt
`
<img width="615" alt="Screen Shot 2022-04-14 at 13 26 09" src="https://user-images.githubusercontent.com/101632496/163381747-d04e296d-1ffe-45de-9900-02bf9d9ec151.png">

2. Debug your game. Notice how when fruits move off the screen, they never actually get destroyed in the debug property panels? Uh oh... If we miss a piece of fruit, it will continue to float on forever outside of the layout. This will severly impact game performance over time as we could have 1000+ floating infinite fruits on screen. Let's make some code to destroy the fruit once it's off the layout. In the same background code group, (You'll notice the code is clearly borrowed from a different event... )

> Condition: FoodSprite X <50
> 
> Action: Destroy  food sprite.
<img width="618" alt="Screen Shot 2022-04-14 at 13 29 30" src="https://user-images.githubusercontent.com/101632496/163382228-e64761c0-d6ad-4290-be65-6e7da0e3eabe.png">

4. Debug your game again. does your food spawn and move accross the screen as you'd expect? In the debug inspection panel, does the food destory itself? 

## 4. Checking bird and food collisions

Now, we have our powerup floating, but we need the bird to be able to actually pick up the powerups! We need the bird to collide with the food, and tell that specific food instance that it's instance boolean, IsEaten, is now true. 

1. In the collisions code-group, create a new event:

> Condition: Bird is overlapping FoodSprite
> 
> Action: FoodSprite > set bool IsEaten > True
<img width="616" alt="Screen Shot 2022-04-14 at 13 31 29" src="https://user-images.githubusercontent.com/101632496/163382470-6b018cb0-ed81-422d-a668-77c83a226815.png">

Inside this event, destroy the food sprite. 
2. Let's test out to see if this event actually triggers and changes our boolean. Right click on this event, set a break-point on this event. 
3. Debug your game: when the bird collides with the food sprite, check the food sprite in the inspector panel. does the food sprite instance set it's bool instance variable to true? 
4. You can now remove the break-point and continue. 

## 5. Trigger a powerup event

So far we've created the sprite, set the sprite's instance variable *PowerUpType* upon creation, and made the foodsprite move across the screen. Now we need to actually make the power-up do something in game. First, we'll trigger the bird's invincibility bool, then we'll set the bird to avoid any collisions if this invincibility bool is True. 

Before you continue, select the bird sprite in the project panel, and add the "timer" behaviour to this sprite. We'll use this behaviour to keep track of how long we want the invincibility to last for. 

<img width="1280" alt="Screen Shot 2022-09-14 at 13 21 39" src="https://user-images.githubusercontent.com/101632496/190140998-07470573-7572-4392-8fae-6627937ab750.png">

1. in the Power-Ups code-group, create a new event under our previous event above.
 
> Condition: FoodSprite > Instance Bool > Is Eaten
<img width="614" alt="Screen Shot 2022-04-14 at 13 36 34" src="https://user-images.githubusercontent.com/101632496/163383176-ab7ed48a-114b-4e58-a1f0-50aad0243db8.png">
2. Add a sub event with two actions to this condition:

> Condition: FoodSprite Instance variable PowerUpType = "Invincibility":
> 
> Action: Bird > start Timer "Invincible" for 2 seconds (once)
> 
> Action: Bird > set instance bool "Invincible" > True
<img width="603" alt="Screen Shot 2022-04-14 at 13 40 39" src="https://user-images.githubusercontent.com/101632496/163383673-83cfb117-b83e-4867-9953-2cb17634b3f0.png">

This will create a "timer" when we collide with a piece of food. This timer will count down for however long we set time. Then, we can create events based on when the timer finishes! In this case, we're going to make the bird invincible for 2 seconds, then on timer finish, we'll make the bird able to be hit by pipes again. 

3.  Add a new event and action under the previous 2 events that checks when the timer is finished. 

> Condition: Bird > On Timer "Invincible" 
> 
> Action: Bird > Set instance bool "Invincible" > False
<img width="619" alt="Screen Shot 2022-04-14 at 13 43 35" src="https://user-images.githubusercontent.com/101632496/163384037-79f1a7ba-7c5d-41b1-a206-6c1873af1b3c.png">

4. Let's test by debugging your game. (you may consider adding a breakpoint here) When your bird touches the foodsprite, is it's invinsibility instance bool true? Does it become false after 2 sec?

5. You've likely noticed that even though we have our invincibility boolean set, we can still die if we hit a pipe. Let's fix that. In the Collisions code-group, add a new event. You can right click, select *invert* to create a NOT condition (denoted by a giant red X). NOT  checks for the OPPOSITE of whatever condition you've created. In this case, we want to make our event check if the bird is NOT invincible :

> Condition: Bird instance bool is NOT invincible

6. Make all current collision events a sub-event of this inverted condition. (you're going to need to drag and drop all events inside this code group inside this new event). Now our bird only registers a collision event with these sprites if it's not invincible.
First, the game checks if the bird is not invincible. If the bird is invincible, it ignores all sub events, if not, if is able to run those simple collision events. 
<img width="633" alt="Screen Shot 2022-04-14 at 13 47 25" src="https://user-images.githubusercontent.com/101632496/163384585-be6870fe-41ae-4f2b-b279-0228ac0e86e3.png">

That's it! Test your game, and try to collect a piece of food. You should notice that if you do collect food, your bird can now safely ignore all pipes and collisions during these 2 seconds. 

# Extension ideas

These extensions are more of a "test" to see if you can apply your knowledge. If you're stuck, look at the completed .c3p file for a way of solving these extensions. 
For all of these extensions, it is expected that you are writing code comments for what and why you are adding in new powerups. What do these lines of code that you create do in the game? Start practicing now, as I will be assessing your understanding of the code based on your code comments. 

- When we spawn the FoodSprite in the power-ups code-group, can you randomly *choose* which animation is displayed to show either an apple, banana, or ham?

> choose("Frank", "fred", "george")     
This is a new function, similar to random(low,high_. However, the choose function is useful for strings (word variables) as well as integer variables. 

- When a FoodSprite spawns, can you create a new powerup based on which animation is currently showing? How might you use the string (word) instance variable PowerUpType to modify what happens based on this name? 
    - New power up idea: Make the banana add 5 to the score, and update the score text
-  Using what you know with an invincibility timer and event, New power up idea: Make the ham *slow down time* for a few seconds. (You may find this below action useful)

    - > Action: Set time scale to 0.5 
<img width="617" alt="Screen Shot 2022-04-14 at 14 05 16" src="https://user-images.githubusercontent.com/101632496/163387132-ebfea667-4dd2-46c6-8600-fbb14b07322f.png">

- <ake a new "bullet" sprite, and give this the bullet behaviour. Can you make a bullet powerup that spawns bullets that destorys the pipes in front of the player? 

- Create your own powerup for the game. 

## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLScFE0QglHzTDoQNCJ7IBRePG-g_yIlFhuELbYWb1EApbqQ6eQ/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*. 

