# Integers, Random Integers, & Their Use in Game Design
This tutorial will step you through working with integers, and random integers, in the context of a Z axis "on rails" shooter, similar to those that you see in arcades. Take a look at the finished .c3p file before getting started, to see what you'll be making. 

## 1. Spawn an asteroid sprite on the ship layer every random seconds 

### The Random Method
> (random(LowValue,HighValue))
- accepts arguments as integers (0,-5,32, etc) and floating integers (0.12, -3.4932) 

1. in the main event sheet, every few seconds **Create** the asteroid sprite at a random location inside the viewport/layout size (320x180).
- Hint: you'll also want to make sure the ship is capable of colliding with the asteroid, so you'll need to "clamp" (constrain) the asteroid to smaller than this margin. (*Example, if the width is 320, create the X location randomly between 0+margin of error, and 320-margin of error*)

2. Set the instance variable of the asteroid "speed" (*integer*) of the asteroid to a random number range. Run the program to test how fast it runs. Adjust speed as needed, or randomly in a range. 

3. Set the Z elevation of the asteroid to spawn "out in the distance" at a -100 Z elevation
4. Add in a collision event for the ship and the asteroid in a "For Each Asteroid" loop. (Similar to the "bullets" in the target code group)
- We'll need to have an AND block here to check both:
    -overlapping sprites ship and asteroid
    -Compare 2 values. the Z elevation of the ship, and the z elevation of the asteroid (with a range +/- the 
    asteroid_collision_margin)
5. On collision, reduce ship's health by 1 and play the ship's "collision" animation