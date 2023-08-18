# Basic Programming Terminology

Prior to moving on to any more tutorials, it will be helpful for us to learn several new terminologies used in programming. Let's learn about:
- Integers
- Floats 
- Strings 
- Booleans
- Loops
- Methods

All of these concepts are fundamental to all programming languages (sans methods), such as Python, C++, Java, Javascript, and Construct 3. If you already know what an integer, float, string, boolean, loop, and methods are, there is no need to read though this terminology section and you are free to move forward onto the next module.  

## Integers & Random Number Generation
In Code, number variables are called "integers" (I'm sure you know this from your previous math lessons in elementary school). 
- 8,9,0 - Whole numbers are an example of an integer
- 8.3, 23.3213 - Decimal numbers are an example of a "float", or a floating point integer/number. 


### The Random Method
In game design, often times we want to be able to make random events happen. Let's say for example we wanted to spawn food on the map at a random times throughout the game. In construct 3, we can use the "random" method to do this. (A method is a built in "function" to the game engine that applies some logic for us). We could say System every X seconds, were X = random(1,4) seconds. In this case, we would spawn food every 1-4 seconds. 

> (random(LowValue,HighValue))
> 
<img width="300" alt="Screen Shot 2022-04-08 at 08 34 01" src="https://user-images.githubusercontent.com/101632496/162378077-818f2a1c-48fc-4ac5-8eae-2189540461b7.png">
- accepts arguments as integers (0,-5,32, etc) and floats (or a "floating" number) (0.12, -3.4932) 



## Boolean Variables

A **boolean or "bool"** is like a "light switch", it is either on, or off; Booleans are either **True** or **False**. Often times booleans are referred to as "boolean flags" to "flag" or signal our game that a condition is true.

For Example, let's assume we have a  player sprite that has a boolean instance variable called "inviciblity". 
When the player gets hit by an enemy. There are 2 outcomes:
> 
> Condition: invincibility is true:
> 
>     Action: player takes no damage
>   
> Conditition: invincibility is false:
> 
>     Action: player  -1 from health

In this case, if the player is currently invincible (that is, the boolean flag is True or "set"), they take no damage and If they are not, they take 1 damage. Boolean flags are incredibly useful for game design, as they allow for conditions to be true, or false, and events to happen based on these boolean variables. 

Imagine some ways you could use true/false logic for creating games. They could relate to:
- player is moving (play animation, hit a speed powerup in a racing game)
- player is stopped (player can now open their menu or backpack)
- player is jumping (player can collect object only if they're in the air)
- player is interacting with an event (player wants to talk to a character)
- player collided with another sprite (enemy, power up, coins, collectables, boss key, etc)

and so much more. Booleans and events will be used extensively in your games, in fact, you have probably seen boolean variables used in past modules already. 

## Strings
A string is a *word* or *text* variable. For example the below are all string variables ,
> "one"
> "word"
> "this is an entire sentence"
> "1"
> "512432"
> "False" 
> "True

anything that is in between the "double" quotations will be considered to be a string variable. For example, the following are all NOT string variables, because they are not surrounded by "double quotes":

> Not
> True
> False
> 1234
> 0.431

This means that these two variables are different. 
> 1 and "1"

the integer *1* and the string *"1"*, are treated as two different things by the computer, despite the fact that they are both "numbers". The fact that it is inside double quotes means it is treated as a string, or "word" "1", rather than as a number. 

### String Concatenation

String concatenation is the process of joining or adding strings together to one another.

For example, in string concatenation we would join these two strings to become:  (note, we use "&" as a "+" symbol)
> "hello " & "world" = "hello world"
> 
> "hello" & "world" = "helloworld"
> 
(note the space in first example, as spaces are not added for you automatically)

Interestingly, when we treat numbers as string values, these two lines of code now produce different outcomes:
> adding integers, leads to a starndard outcome:
> 
> 1 + 1 = 2 

> "adding" string numbers however, produces interesting results:
> 
> "1" + "1" = "11"


## Loops
A "loop" is simply a line of code that repeats itself for a number of times. Let's say we want to randomly spawn 3 powerups on a map. Rather than needing to write the same code 3x, our computer can do it for us with a loop! 

<img width="800" alt="Screen Shot 2022-04-08 at 08 34 01" src="https://user-images.githubusercontent.com/101632496/190336733-f154638e-93bf-4a95-bace-77f14fb553df.png">

Let's break this down...

`For "Spawn Powerup"`

-  this is a name for our loop. In this case, I wanted to spawn powerups randomly, so I labelled it "spawn powerup"

`from 1 to 3`

- from 1 to 3 means that the loop will repeat 3 times. It does this by creating a loop "index". Think of the index as a "counter" for the number of times the loop has repeated itself. Each "loop", the index will add 1 to itself. So in this example, our loop will:
- loop start: index = 1
    - We start our loop counting at 1, and we spawn our first food object in a random location
    - We finish all the code inside our loop (as it's only one line), so now we add 1 to index (index = 2)
- index = 2
    - We spawn a 2nd food object at a random location
    - Again, we're finished all the code inside our loop, so we add 1 to index (index = 3)
- index: = 3
    - we spawn a 3rd food object
    - we add 1 to index (index = 4)
- index: = 4
    - we are now outside of the range of values we created this loop for, so we break from our loop and go onto the next block of code. 


