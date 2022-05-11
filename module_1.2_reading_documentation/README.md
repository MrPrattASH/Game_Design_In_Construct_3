# Official Construct 3 Documentation
This is likely one of the most important modules in our game design course; how to read official documentation of the construct 3 game engine. While there is a lot that this course can teach you, the nature of game design is that you will need to solve how to program a lot of these things yourself, because *many of the solutions you seek are specific to your game, and do not exist as a readily made "package" online*. 

The reality of game design is that there are 500+ ways of solving every coding problem/challenge, and it's up to you to find *a solution* (not **the solution**) that works for your game. While you may have your own intricacies with your game, there are some starting points and similar programming concepts (as well as pre-made behaviours) that will get your started with solving your problem. Reading the official documentation will help with this challenge in helping you figure out how to find answers to your problems, and an answer to the question, *how do I do this in construct 3?*

## By the end of this tutorial you should know:
1. What "official documentation" is
2. The importance of referencing documentation when programming
3. How understanding official documentation can help you self-teach & understand how to do certain things in construct 3

## Self-Assessment Quiz:
Your self assessment quiz will be baked into this module's tutorial. 

# Tutorial
You will find the official documentation for construct 3 [here](https://www.construct.net/en/make-games/manuals/construct-3). I highly suggest you bookmark this page, as you'll be referring back to it constantly. There are a few main points you'll likely refer back to constantly:

- **Behaviour Reference:** Provides a reference of all the official behaviors (typically "sprite" behaviours: Bullet, scroll to, 8-direction movement, Bound to Layout etc, we learned about these in Module 1). Each has an overview of its use, a list of its properties, and a detailed list of the actions, conditions and expressions specific to that behavior. This can be useful for figuring out what a behaviour is capable of, and not capable of. 
- **Plugin Reference:** Provides a reference of all the official plugins ("system" objects in layouts:  Keyboard, Text, Button, etc). Each has an overview of its use, a list of its properties, and a detailed list of the actions, conditions and expressions specific to that plugin. This can be useful for figuring out how to change text properties, change button appearances, etc. 
- **System Reference** It provides features to access the runtime engine, and utilities that are useful for most projects. Split into 3 categories
    - System Conditions: These are the initial "if condition is true" sections in code. These can check angles, global/local variables, loops, layers, instances, save/load games, and time. 
    - System Actions: if condition is true, you need to choose actions to carry out. Things like impacting layers or changing layouts, creating or destorying objects, changing the game's timescale (slow-mo or hyper-speed) 
    - System Expressions: the "math" inside the actions. Things like checking X,Y coordinates of objects, a lot of mathematics algorithms (most commondly used for our course would be ceil, distance, floor, lerp, round, random). This reference is useful to solving what math equation might help you, or discovering how construct parses the "random" method itself.  

## Documentation Scavenger Hunt
To better discover how to use the manual, we're going to do a scavenger hunt of the manual to find some of the more common conditions, actions, and expressions that we will use throughout this course. Remember, there is a search function inside the manual, though sometimes you may need to visit the relevant sections of the manual if you forget keywords. 

[This quiz](https://docs.google.com/forms/d/e/1FAIpQLSfT_e2bTWljXFKrj435hZXhGmT2ZlX9J4xaxn4nLVasun5xQw/viewform?usp=sf_link) is both your self-assessment for this module, and this module's main activity. As you go through the activity, you'll be presented with screenshots of semi-relevant code, though it won't give you the answer. The screenshot is there to remind you of where you'd find associated conditions, actions, and expressions inside of the game engine itself. To answer all the questions, you'll need to read the official documentation. 