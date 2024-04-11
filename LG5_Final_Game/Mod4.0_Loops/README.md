# Using Loops in Construct 3

When we're programming, there are several ways that we can create levels, enemies, pickups, etc. We can manually place all of these items, enemies, etc, like those of traditional platformers or First Person Shooters, Or, we can take the "Roguelike" Metroid route and Proceduraly Generate Levels. This means we can use our code to create all of our enemies, platforms, pickups, or more. This inherent randomness makes games much more exciting to play, as every playthrough is different, and it also makes designing levels easier, because our game makes everything* for us. 

We can do this through the concepts of loops, or iteration. A loop simply takes a *condition* and repeats a number of actions inside this loop. 

![image](https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/b7fb1ada-575c-4600-b85b-6cc0ca2a4a19)

*[credit codingalpha.com](https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Iw9a_QgiTIEJtCAdeIlwAwHaHH%26pid%3DApi&f=1&ipt=e69fcb50a86774feec2fe7cdb251c68095c404a6b4e709c0a35db89d3c279910&ipo=images)*

Let's say we were making a Mario style platformer game, and wanted to randomly spawn coins around the map for the player to pickup. Looking at this code:

![Screenshot 2024-04-11 at 12 57 33](https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/5c9e7e62-0d2c-4f66-bb38-44c9745d79a6)

Repeat 30 times: Randomly create a coin sprite anywhere within 0>the Layout width and within 0 > Layout Height. 

After this loop, we would have 30 different coins randomly created on our level. 

## Tutorial #1: Randomly Spawn objects around the map
Watch & follow along with [this video tutorial.](https://drive.google.com/file/d/15DNaXNhHWkuWm_VCGJEYQG7uFeGYa9ec/view?usp=drive_link). It will teach you how to randomly spawn coins around a top-down controlled map, and how to ensure that these coins don't spawn in areas that are impossible to reach for the player (ie, spawned on top of other objects)

### Challenge #1: Randomly Spawn Enemies around a map
After completing this first video tutorial, go back to your ghost shooter game and modify it's code. You need to:
* On start of layout: Randomly spawn 5-10 enemies around the map




## Tutorial #2: Spawn objects in a grid pattern (Brick Breaker) 
Watch & follow along with [this video tutorial.](https://drive.google.com/file/d/1iIn-6AZEPs6jGaBpFRN6SYoZs4puwQoQ/view?usp=drive_link) It will teach you how to spawn objects in a grid, like those scene in classic "brick breaker" type games, or cards in a puzzle game. 

### Challenge #2: Spawn coins in a Grid
After completing the second video tutorial, go back to your platformer game and modify it's code. You need to:
* Somewhere on your level, create a 8x8 "grid" of coins spawned, similar to how Mario has "coin collection" bonus levels.
![image](https://github.com/MrPrattASH/Game_Design_In_Construct_3/assets/101632496/c1939017-d9b4-4e2a-a21f-4c5ca16715bf)


# Advanced Example
If you wanted to randomly generate a level on a grid, like a rogue-like level, take a look at nested loop implementations [here](https://github.com/MrPrattASH/Game_Design_In_Construct_3/blob/master/Bonus_Learning_Material/Randomly_Generated_Level_example.c3p). Download this .c3p file and open it up in the construct editor. 
