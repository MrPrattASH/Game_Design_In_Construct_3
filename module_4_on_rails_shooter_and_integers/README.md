# Integers, Random Integers, & Their Use in Game Design
This tutorial will step you through working with numbers in code. In Code, numbers are called integers (I'm sure you know this from your previous math lessons in elementary school), and random integers. You are going to be applying integer math in the context of a Z axis, "on rails" shooter, similar to those that you see in arcades like Timesplitter, Jurassic park, and the like.

Before you get started, take a look at the finished .c3p file to see what you'll be making. It's always good to know what you're aiming towards. 

## By the end of this tutorial you should know:
1. What an *Integer* or *Int* variable is
2. How to use math operators (+ - x ÷) in a program
3. How to use a "for each" loop/repeat block to create events that affect a single instance of an sprite, without affecting ALL instances of that sprite.
4. What Z-elevation is, and how to use it to create "depth of field" effects in games. 

# Tutorial

### Similar to Flappy bird powerups, in this tutorial you'll be using a pre-made game as a base and building on top of it (or remixing).  In the construct editor, please open the corresponding module's construct folder. (Game_Design_in_Construct_3 > module_4_on_rails_shooter > on_rail_shooter_integer_practice_construct_folder)

You do not need to edit any code in the yellow code-groups. They provide base functionality, and are not necessary to modify, though you are encouraged to read through them to see how the game functions on the back end. You should edit code in the green coding blocks for this tutorial. 

In this tutorial, you will be adding in an asteroid object that will fly towards your ship. You will not be able to shoot and destroy this asteroid, but you will be able to be blown up by this asteroid. You'll also make this sprite "scale" on the Z-axis so it starts small and gets bigger as it approaches your ship. It will also show a layered effect, that it will be shown both in front, and behind your ship. 

## 1. Spawn an asteroid sprite on the ship layer every "X" seconds 

##### The Random Method
> (random(LowValue,HighValue))
> 
<img width="197" alt="Screen Shot 2022-04-08 at 08 34 01" src="https://user-images.githubusercontent.com/101632496/162378077-818f2a1c-48fc-4ac5-8eae-2189540461b7.png">
- accepts arguments as integers (0,-5,32, etc) and floats (or a "floating" number) (0.12, -3.4932) 

We learned about the random method last tutorial, we'll continue to use/apply this today. 

1. in the main event sheet under the "Asteroid Extension Group", every few seconds, **Create object** asteroid sprite at a random location inside the viewport/layout size (320x180) (remember, you can find the coordinates by mousing over the layout screen). This will spawn an asteroid somewhere on the layout. 
 - *Hint*: Don't make your random locations the width of the layout (X: random(0,320) Y: random(0,180)). The ship is not capable of flying to the exact corners of the layout, it actually sits inside about about 50* pixels in each direction. You'll want to make sure the ship is capable of colliding with the asteroid, so you'll need to "clamp" (constrain) the asteroid to smaller than this margin.
 -  *For Example, if the width of our layout is 320, create the X location randomly between 0+margin of error, and 320-margin of error* perhaps a good starting point is
     - X: random(0+20, 320-20)
     - Y: random(0+20, 180-20)  
 -   You may need to play with this 320-(margin of error) code as you play further in the game. 


2. In the same event, Set the instance variable of the asteroid, "speed" (*integer*,) to a random number range. We'll do this so that we get some variablity in the speed at with the asteroids come at our ship. It would be boring if all asteroids were the same speed! debug the program to test how fast it runs. Adjust speed as needed. (you can even adjust the speed in the debugger to find what works best for your game)    
3. In the same event, Set the Z elevation of the asteroid to spawn "out in the distance" at the bottom of our main layour at a "-100 Z" elevation. 

Debug your game. you should now see the asteroid spawing and moving through the map, cool! 

## 2. Make the ship register a collision with an asteroid
1. Create a new system event called "For each (object)" and select asteroid as your object.
- (System > Loops > for each) 
- If look inside the code group "bullets", you'll notice that a for each loop is also used here.  
> <img width="260" alt="Screen Shot 2022-04-08 at 08 36 15" src="https://user-images.githubusercontent.com/101632496/162378356-924e520e-c052-4a08-83a2-ff1a1cc4eca9.png">

#### Loops
A "loop" is simply a line of code that repeats itself for a number of times. If we wrote a loop like this, we could randomly spawn 3 powerups on our map, rather than needing to write the same code 3x, our computer can do it for us! 
![Screen Shot 2022-09-15 at 09 01 38](https://user-images.githubusercontent.com/101632496/190336733-f154638e-93bf-4a95-bace-77f14fb553df.png)
Let's break this down...
`For "Spawn Powerup"`
-  this is a name for our loop, you can make this related to what the loop is going to do. In this case, I wanted to spawn powerups randomly, so I labelled it spawn powerup
`from 1 to 3`
- from 1 to three means that the loop will repeat 3 times. It does this by creating a loop "index". Think of the index as a "counter" for the number of times the loop has repeated itself. So in this example, our loop will:
- index start: 1
    - We start at 1, and we spawn our first food object in a random location
    - We finish all the code inside our loop, so now we add 1 to index (index = 2)
- index: 2
    - We spawn a 2nd food object at a random location
    - Again, we're finished all the code inside our loop, so we add 1 to index (index = 3)
- index: 3
    - we spawn a 3rd food object
    - we add 1 to index (index = 4)
- index: 4
    - we are now outside of the range of values we created this loop for, so we break from our loop and go onto the next block of code. 

In the context of our asteroid "for each" loop, we will create a loop that repeats and applies that code specifically for each asteroid on the screen. If we have 3 asteroids, it will repeat 3 times. If we have 1000 asteroids, it repeats 1000 times. 

2. Make a "on collision with asteroid" sub-event inside this for-each loop with 2 conditions. Adding this as a sub event means that we will check for each individual asteroid collision, rather than affecting every single asteroid at once! If we didn't add these as sub events, when our ship collided with an asteroid, all asteroids would be destroyed rather than just 1. 

    -Is Asteroid overlapping Ship
    > <img width="238" alt="Screen Shot 2022-04-08 at 08 38 40" src="https://user-images.githubusercontent.com/101632496/162378678-3f9aadf4-a0ee-4650-b224-5689575e2827.png">
    -System: value Is between 2 values. 
     - The value of the ship's Z elevation
     - is between: the +/- z elevation of the asteroid (with a range +/- the asteroid_collision_margin)
    > <img width="489" alt="Screen Shot 2022-04-08 at 08 38 19" src="https://user-images.githubusercontent.com/101632496/162378639-e2c1a290-13ea-4ccf-b72f-75984bb96642.png">
    - This is your first taste of 3D elements in a 2D engine. As our objects are on 2 different z axis values, we need to check to make sure that when our ship overlaps the object, that they are actually beside eachother. If we didn't compare the Z axis values, our ship could be overlapping an asteroid that was off in the distance, and our game would still register this as a collision event. 

## 3. Destroy the ship on enough contacts with asteroids. 
1. On collision, subtract 1 from the ship's *instance variable* "health" 
2. Set the ship's animation to play "collision" from the beginning. 
3. in the main event sheet, Add a new event :
   - if the ship's health <0: destroy ship

debug your game, can you make your ship blow up if it hits too many asteroids? 

# Extensions
As before, any extension you add must be commented on what you are adding and why. 
- Add a health instance variable to the asteroids. Can you then make the "bullet" object destroy the asteroids if it hits them enough times? (Think back to how you coded the monster health in ghost shooter) 
    - Take a look at the "Target" code group. Inside, there is a loop called "For each bullet".  see if you can mirror this in your own code, but instead of shecking for the target, check for the asteroid instead. 


<img width="558" alt="Screen Shot 2022-09-15 at 09 26 07" src="https://user-images.githubusercontent.com/101632496/190341599-4e6156ee-ec53-49e2-a537-b17c9d7b7144.png">

- Add in some animations. Make the asteroid create an object called "Big explosion" on impact with the ship, or when the asteroid is destroyed by bullets. 
- Add a new text object to the HUD, and make it display the ship's health 
    -  Remember how you have been writing 
    -  `set text to: "Score" & Score`
    -  The word "Score" is plain text. The `&` allows you to write a number as a word. In this case, `Score` was a global variable number, and by writing the above code, we can display the score. 
    -  Can you use the same setup to display the ship's health? 
- Add a different kind of enemy to randomly spawn like the asteroid. Maybe a small, fast asteroid, maybe an enemy ship? 


## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLSciZ8X4YwRXcpctolKlWReQ4L98nBoUl7X5tSjIMLQWtOcF_A/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*.  
