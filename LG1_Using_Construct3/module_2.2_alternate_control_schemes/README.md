# Alternative Control Schemes
Up to this point, we've only made games that are controllable via computers, and using the arrow keys for movement. Let's change that, and learn how to control our characters with WASD, and even control them using touch screens like our phones. 

## By the end of this tutorial you should know:
1. What the *Touch* system object is
2. How the *Mouse* and *Touch* system objects interact with one another, and how the provide similar funcionalities
3. How to create basic onscreen controls
4. What a *Parallax* HUD (Heads up Display) Layer is
5. How to dynamically change control schemes based on user device input. 
    - *for example, you can program the same game to be playable on either touch screens or on desktop computers.*
6. How to play your games on your phone. 

# Tutorial
This tutorial builds upon the platformer game you made in module 2.0. 

## Touch Screen Controls
It's time to introduce you to a new skill: reading through someone else's programs (and code comments) to discover how features are implemented. This is a skill you will use ALL the time in game design (and coding in general). You notice how someone did something, and you want to be able to do that to, so you open their code and examine how they created it. Rather than teaching you step by step this time around, I'll give you hints on how to disect someone else's code. However, if you get stuck, please ask for help along the way. You'll also notice that this game won't translate *perfectly* to your platformer. We're going to examine an 8 direction game, and it's up to you to know/discover how to adapt this to control a platformer game. 

Your goal: Discover how to implement touch controls from the example, then implement these touch controls into your platformer game. 

## The Construct 3 Example Browser
Construct 3 has an "example browser", a collection of fully commented games that you can build off of and remix for your own games. For now, I've selected an example for you to find and dissect, but we'll come back to letting you choose your own example game later. 

1. navigate to [editor.construct.net](https://editor.construct.net) and select the example browser. 

<img width="500" alt="Screenshot 2022-12-08 at 10 51 49" src="https://user-images.githubusercontent.com/101632496/206417349-5417f836-ba95-4e79-a8ca-85fd2bb4dc66.png">

2. In the search bar, search for "Detecting Input Method". (Be sure to turn *off* your "recommended" filter

<img width="500" alt="Screenshot 2022-12-08 at 10 52 15" src="https://user-images.githubusercontent.com/101632496/206417471-11a5e820-bb5c-4677-9c81-8afff846d47a.png">

3. Click on the folder button to open the game in a new editor window. 

<img width="418" alt="Screenshot 2022-12-08 at 10 51 26" src="https://user-images.githubusercontent.com/101632496/206417592-fa8cb3a5-b92e-4a52-8cb6-b1d330ac5d23.png">

Preview this game in 2 ways. 
* standard preview using your keyboard/mouse. You should notice you control the standard way as game #1. 
* Use "Remote Preview". A QR code will launch on your screen. Scan this with your phone (or a partners) and play the game on your device. You should now have touch screen controls. (also, you can preview games on your phone! How cool is that?)

<img width="500" alt="Screenshot 2022-12-08 at 11 08 55" src="https://user-images.githubusercontent.com/101632496/206419745-4efe67d9-b318-4b25-933e-ae1f3486112e.png">


# Dissecting & Examining Game Code
1. When opening someone else's game, the first thing I do is open up all of the existing game layouts (or "level maps" so to speak). This game has 2 layouts: Game, Title. 

While I have the layouts open, I'm looking for:
* What text objects are on screen, and what are they called? 
* What sprites are on screen, and what are they called?

Then, in the properties panel, I reference what object types exist in the game. This is also where control schemes come in. You'll notice 3 in this game, 1 of which is new to you (Touch, Keyboard, Mouse). 

<img width="456" alt="Screenshot 2022-12-08 at 11 02 32" src="https://user-images.githubusercontent.com/101632496/206418343-98bf78c7-ae67-4ccc-a055-3f39e28f81f1.png">

2. After looking through the layouts and how the levels is designed, I then go through the event sheets 1by1. For this game, each layout has it's own event sheet, but this isn't always the case. With a layout selected in the proejct panel, look in the Properties panel to discover which event sheet this layout is using as it's code. 

<img width="500" alt="Screenshot 2022-12-08 at 11 06 15" src="https://user-images.githubusercontent.com/101632496/206419082-18f6e0e8-4657-4534-a655-1598a309af4a.png">

3. Let's start examing the "Title events" first. First, I read through code comments. These are short explanations that programmers use to explain what is happening. They'll give you insight into how the code on this event sheet works.

<img width="500" alt="Screenshot 2022-12-08 at 11 10 55" src="https://user-images.githubusercontent.com/101632496/206420177-41e0dcc3-e167-45c4-8b35-bd60f13cfd78.png">

Through examining this event sheet, you should know:
* What the "global string" (word variable) is and how it is changed based on touch/click/keyboard presses
    * this Global string means that ALL event sheets can use/access this string variable, rather than just the "title events" sheet. 
* When in layouts switch
* Tocuh comment: To discover what is meant by the code comment on this screen, select the "Touch" object in your project panel. Then in the properties panel, look for a checkbox "use mouse input". (this means the "touch" object can optionally use mouse clicks as well)

4. Now let's examine the "Game events" sheet. Through examining, you should know:
* How the "touch controls" 0x0% Parralax layer "Touch controls" is shown/hidden, based on what the global string variable is set to. 
    * Note: in the layer's properties panel, this layer is "initially invisible"
* What "activating" a groups does. 
    * a code "group" is a section of code under the large header. On this event sheet there 2 groups: Desktop Controls, Mobile Controls. By setting a group deactivated, it turns OFF that code inside the group from running. 
* How desktop controls are simulated using arrow keys or WASD with an OR condition block.
    * You can make a condition "OR" by right clicking on the condition/event, and selecting "Make OR Block" 
    * **Note that the input events must be continually true, i.e. using "Key is *down*" and not "On key pressed".** If we selected "On Key Pressed", we would only simulate control for each individual press of the key, rather then holding down the key. 
* How a touch input event "knows" which sprite is being touched
* How a single "TouchControl" arrow sprite uses an instance variable to decide which arrow is currently being touched. 

Before moving on, you should know 100% how these controls are implemented. If you're confussed and unsure how the code-logic works, ask for assistance. 

# Putting Your New Skills to the Test:
Now that you know how to examine a game's code, we can use this code/setup to add touch controls to our platformer game from module 2.0. In your platformer game you need to:

1. Add a title screen layout/event sheet "menu screen". 
2. Add a global string variable for ControlMethod
3. Add the "touch" object to one of your layouts. 
4. Add a "TouchControls" 0x0% Parallax layer to your game level layout
5. Add a new sprite (arrow) and add a direction string instance variable
6. Add in all relevant code for controlling:
    * your player should move with WASD and arrow keys (right click an event, "make OR block"
    * <img width="298" alt="Screenshot 2022-12-08 at 11 31 48" src="https://user-images.githubusercontent.com/101632496/206424394-a08fa098-9456-4b55-8b03-3453c99a8087.png">
    * your player should move with touch controls, provided your user is using a touch screen device.
    * Note: The example above uses 8-direction control. You'll need to adapt the actions to suit your game's needs.  

After you're done, your game should dynamically show/hide touch screen controls, depending on what sort of device your player is using. Test your game in keyboard preview & remote preview to be sure your game functions as intended. 



