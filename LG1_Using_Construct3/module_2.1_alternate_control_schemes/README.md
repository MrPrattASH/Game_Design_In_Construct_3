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

### Alternative Keyboard Controls 
By default, user-controlled movement behaviors use a standard set of controls, based around the arrow keys. To change these:

1. Select your main player (in our case, the player box) and disable the Default controls property in the properties panel. This will stop your player from being able to be controlled using the arrow keys. 

<img width="498" alt="Screenshot 2022-12-08 at 10 45 20" src="https://user-images.githubusercontent.com/101632496/206414525-7a4e2418-6882-43f1-abbb-e1e5fa51fcb5.png">

2. In your event sheet, set up some events using the Simulate control action. The following events show how to use the W, A and D keys to control the Platform movement.

![image](https://user-images.githubusercontent.com/101632496/206414681-e377205d-f513-4f99-8174-80d4972be361.png)

**Note that the input events must be continually true, i.e. using "Key is *down*" and not "On key pressed".** If we selected "On Key Pressed", we would only simulate control for each individual press of the key, rather then holding down the key. 

### Touch Screen Controls
It's time to introduce you to a new skill: reading through someone else's programs (and code comments) to discover how features are implemented. This is a skill you will use ALL the time in game design (and coding in general). You notice how someone did something, and you want to be able to do that to, so you open their code and examine how they created it. Rather than teaching you step by step this time around, I'll give you hints on how to disect someone else's code. However, if you get stuck, please ask for help along the way. 

Your goal: Discover how to implement touch controls from the example, then implement these touch controls into your platformer game. 

### The Construct 3 Example Browser
Construct 3 has an "example browser", a collection of fully commented games that you can build off of and remix for your own games. For now, I've selected an example for you to find and dissect, but we'll come back to letting you choose your own example game later. 

1. navigate to [editor.construct.net](https://editor.construct.net) and select the example browser. 

<img width="500" alt="Screenshot 2022-12-08 at 10 51 49" src="https://user-images.githubusercontent.com/101632496/206417349-5417f836-ba95-4e79-a8ca-85fd2bb4dc66.png">

2. In the search bar, search for "Detecting User Input".

<img width="500" alt="Screenshot 2022-12-08 at 10 52 15" src="https://user-images.githubusercontent.com/101632496/206417471-11a5e820-bb5c-4677-9c81-8afff846d47a.png">

3. Click on the folder button to open the game in a new editor window. 

<img width="418" alt="Screenshot 2022-12-08 at 10 51 26" src="https://user-images.githubusercontent.com/101632496/206417592-fa8cb3a5-b92e-4a52-8cb6-b1d330ac5d23.png">

Preview this game in 2 ways. 
* standard preview using your keyboard/mouse. You should notice you control the standard way as game #1. 
* Use "Remote Preview". A QR code will launch on your screen. Scan this with your phone (or a partners) and play the game on your device. You should now have touch screen controls. (also, you can preview games on your phone! How cool is that?)

<img width="712" alt="Screenshot 2022-12-08 at 11 08 55" src="https://user-images.githubusercontent.com/101632496/206419745-4efe67d9-b318-4b25-933e-ae1f3486112e.png">


### Dissecting & Examining Game Code
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
* What "activating" a groups does. 
    * a code "group" is a section of code under the large header. On this event sheet there 2 groups: Desktop Controls, Mobile Controls. By setting a group deactivated, it turns OFF that code inside the group from running. 
* How desktop controls are simulated using arrow keys or WASD with an OR condition block.
    * You can make a condition "OR" by right clicking on the condition/event, and selecting "Make OR Block" 
* How a single "TouchControl" arrow sprite uses an instance variable to 







