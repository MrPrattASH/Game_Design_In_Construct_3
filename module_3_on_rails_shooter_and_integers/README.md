# Integers, Random Integers, & Their Use in Game Design
This tutorial will step you through working with integers, and random integers, in the context of a Z axis "on rails" shooter, similar to those that you see in arcades. Take a look at the finished .c3p file before getting started, to see what you'll be making. 

**Note**
- All yellow code-groups you will not need to edit. They provide base functionality, and are not necessary to modify. 

## 1. Spawn an asteroid sprite on the ship layer every random seconds 

##### The Random Method
> (random(LowValue,HighValue))
> 
<img width="197" alt="Screen Shot 2022-04-08 at 08 34 01" src="https://user-images.githubusercontent.com/101632496/162378077-818f2a1c-48fc-4ac5-8eae-2189540461b7.png">
- accepts arguments as integers (0,-5,32, etc) and floating integers (0.12, -3.4932) 

1. in the main event sheet, every few seconds **Create object** asteroid sprite at a random location inside the viewport/layout size (320x180).
 - *Hint*: you'll also want to make sure the ship is capable of colliding with the asteroid, so you'll need to "clamp" (constrain) the asteroid to smaller than this margin. (*Example, if the width is 320, create the X location randomly between 0+margin of error, and 320-margin of error*)
2. Set the instance variable of the asteroid, "speed" (*integer*,) to a random number range. Run the program to test how fast it runs. Adjust speed as needed.   
3. Set the Z elevation of the asteroid to spawn "out in the distance" at the bottom of our main layour at a -100 Z elevation. 

## 2. Make the ship register a collision with an asteroid
1. Add in a collision event for the ship and the asteroid in a "For Each Asteroid" loop. (Similar to the "bullets" in the target code group). 
> <img width="260" alt="Screen Shot 2022-04-08 at 08 36 15" src="https://user-images.githubusercontent.com/101632496/162378356-924e520e-c052-4a08-83a2-ff1a1cc4eca9.png">

2. Make a collision sub-event with 2 conditions. (This will then do all of the following **for each** asteroid, rather than treating *all* asteroids as a single sprite.)

    -Is Asteroid overlapping Ship
    > <img width="238" alt="Screen Shot 2022-04-08 at 08 38 40" src="https://user-images.githubusercontent.com/101632496/162378678-3f9aadf4-a0ee-4650-b224-5689575e2827.png">
    -System: value Is between 2 values. 
     - The value of the ship's Z elevation
     - is between: the +/- z elevation of the asteroid (with a range +/- the asteroid_collision_margin)
    > <img width="489" alt="Screen Shot 2022-04-08 at 08 38 19" src="https://user-images.githubusercontent.com/101632496/162378639-e2c1a290-13ea-4ccf-b72f-75984bb96642.png">

## 3. Destroy the ship on enough contacts with asteroids. 
1. On collision, subtract 1 from the ship's *instance variable* "health" 
2. Set the ship's animation to play "collision" from the beginning. 


# Extension Ideas
- Add a health instance variable to the asteroids, and make the "bullet" object destroy them?
*Hint*- Take a look at the "Target" code group, "For each bullet" 
- Make the asteroid create an object "Big explosion" explode on impact
- Add a new text object to the HUD, and make it display the ship's health (you may need to use  ("Append" +  str(instance variable)) to turn the integer  variable into a string variable to be able to be displayed 
- Add a different kind of enemy to randomly spawn like the asteroid. 
