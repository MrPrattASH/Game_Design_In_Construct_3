# Boolean Variables, Conditional Events, & Conditional Sub-Events

This tutorial will teach you about boolean variables, their differences from integers and striings, and how to create basic food powerups/collectables that modify main game system mechanics through time slow, invincibility, and additonal scores. When completed with the tutorial, assess your knowledge using the self-assessment and go back over any content you did not understand. 

As always, play through the example .c3p finished file to get an idea of what you'll be creating. (click for control)

## Boolean Variables

Last tutorial we learned that an **string or "str"** is a text variable. In contrast, a **boolean or "bool"** is like a "switch"; Booleans are either **True** or **False**. For Example, let's assume we have a sprite with an instance variable *invincibility* set as a Bool: 
> 
> if invincibility == true:
> 
>     player takes no damage
>   
> if invincibility == false:
> 
>     player  -1 from health

As you can see, booleans are incredibly useful for game design, as they allow for conditions to be true, or false, and events to happen based on these boolean variables. They could relate to:
- player is moving
- player is stopped
- player is jumping
- player is interacting with an event

and so much more. Booleans and events will be used extensively in your games, and you probably have seen boolean variables used in past modules already. 

# Boolean variables and Powerups/Collectables
As with the last module, you don't need to change anything in the yellow code-group, only the green code. 

## 1. Creating a FoodSprite

We first need to create our powerup, and all associated instance variables. 

1. Create a new sprite object called "FoodSprite". Add this sprite to the "Object Repository" layout. Re-size appropriately. 
2. Double-click the FoodSprite in the project folder, and create 3 animations. label them Banana, Ham, and Apple respectively. 
<img width="213" alt="Screen Shot 2022-04-14 at 13 05 50" src="https://user-images.githubusercontent.com/101632496/163378948-24126ac5-0843-4b80-9531-c05e02b8b009.png">
3. For each animation, upload the 4 png images using the folder button in the animations editor. 
<img width="1280" alt="Screen Shot 2022-04-14 at 13 07 45" src="https://user-images.githubusercontent.com/101632496/163379189-aa643e31-ba82-4df0-9bb2-4a13ae82089e.png">
4. "crop" each animation. This will remove any "blank" transparent space on each photo, improving game performance. *If an artwork is 500x500, but only has art on 100x100, transparent pixels are still rendered, Remove the whitespace dramatically improves game performance*. 
<img width="249" alt="Screen Shot 2022-04-14 at 13 09 42" src="https://user-images.githubusercontent.com/101632496/163379636-8c099dc9-c6ce-46d9-b031-9ef833666a2b.png">
5. In the Animation Properties bar, set an appropriate speed for the animation, and set it to loop. Right click on the animation name to select "preview" to watch your animation. Adjust settings at will. 
<img width="321" alt="Screen Shot 2022-04-14 at 13 11 32" src="https://user-images.githubusercontent.com/101632496/163379725-36007f7a-855d-4d12-903c-34521b7276ed.png">
6. Create 2 new instance variables on the FoodSprite. a str called *PowerUpType*, and a bool called *IsEaten*
<img width="253" alt="Screen Shot 2022-04-14 at 13 23 30" src="https://user-images.githubusercontent.com/101632496/163381354-ffcb4d00-8ba1-4041-ba5f-b4e8d5e7aea1.png">


## 2. Spawning food powerups at random intervals

Now that we have our sprite, we need to spawn it in the layout during the game at random time intervals. 

1. create a new int global variable (righclick on the event sheet) called *SecondsPerPowerUp* and set it to 3.5 initially. You can change this later. 
2. in the power-ups code group, create a new system event > Every *SecondsPerPowerUp* seconds. 
3. inside this event, create object *FoodSprite* on layer 0 at an X value of the right edge of our layout and a random Y value inside our layout (layout size is 400 x 500). This Y value will control how high/low the object spawns. 
<img width="344" alt="Screen Shot 2022-04-14 at 13 15 03" src="https://user-images.githubusercontent.com/101632496/163380175-ce81ab8a-af47-4d1d-9774-f956a5ebdda2.png">
4. set the animation of the created *FoodSprite* to a fruit of your choice. 
5. Create a new sub-event to check FoodSprite > Is animation "YourFruit" playing. If true, set the foodsprite instance variable *PowerUpType* to "invincibility". 
<img width="604" alt="Screen Shot 2022-04-14 at 13 22 11" src="https://user-images.githubusercontent.com/101632496/163381144-4d767dcc-caa9-4715-aa94-18fd01a013fe.png">

## 3. Making the Powerup move 

Now that the powerup is spawning, we need to make sure it moves across the screen, similar to the pipes and ground. We want to move the sprite on *delta time* not on physical in game seconds. This is a **critical** distinction. If your game has frame rate drops, events that run every second will skip frames and may spawn in erratic places. Having events that run on *delta time* or *dt* run in line with frames that are running, even if frames are dropped, so the event will trigger as intended. You should use delta time when moving sprites around the layout, whereas you may use in-game seconds to control spawning events. 

1. In the *Background* code group, find the "EveryTick" event and add a new action for the FoodSprite. Set FoodSprite.X to FoodSprite.X - SCROLLSPEED * dt
<img width="615" alt="Screen Shot 2022-04-14 at 13 26 09" src="https://user-images.githubusercontent.com/101632496/163381747-d04e296d-1ffe-45de-9900-02bf9d9ec151.png">
2. Create a new event, checking FoodSprite X <50, destroy the food sprite. *This stops us from having a million spare food sprites floating outside the layout and slowing down our game*. You'll notice the code is clearly borrowed from a different event...  
<img width="618" alt="Screen Shot 2022-04-14 at 13 29 30" src="https://user-images.githubusercontent.com/101632496/163382228-e64761c0-d6ad-4290-be65-6e7da0e3eabe.png">

## 4. Checking bird and food collisions

We need the bird to collide with the food, and tell that specific food instance that it's instance bool, IsEaten, is now true. 

1. In the collisions code-group, create a new event If Bird is overlapping FoodSprite, FoodSprite > set bool IsEaten > True
<img width="616" alt="Screen Shot 2022-04-14 at 13 31 29" src="https://user-images.githubusercontent.com/101632496/163382470-6b018cb0-ed81-422d-a668-77c83a226815.png">

## 5. 

# Extension ideas

- When we spawn the FoodSprite in the power-ups code-group, can you randomly *choose* which animation is displayed? 
-     > random(low,high)    
- the random method is useful for ints 
-     > choose("Frank", "fred", "george")     
- the choose method is useful for strs as well as ints
