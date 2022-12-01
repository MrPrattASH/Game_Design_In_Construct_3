# Top Down Shooter Game Extensions
Making games via a tutorial is OK, but it is so much more fun to make your own games. We'll get some practice doing to by "modding" or "remixing" our top-down shooter game that we just created. Essentially, we're going to be adding more functionality to the base game and make it more of our own. 

## Adding and Modding Extensions

Below are a list of ideas you might try to add to your game to modify and make it your own. You must complete the mandatory extension, and choose at least 2 of the optional extensions. Below the list of ideas are "hint" instructions. This means that I won't tell you exactly how to complete the extension, but I will give you tips and hints for how to complete the task. All of these extension ideas build upon previous skills you learned back in the initial tutorial. It is suggested to take 1 class to complete these extensions. 

### Mandatory Extension
Add a "Start Screen" to your game. 

### Optional Extension Ideas:
* Make the player get points for hitting monsters as well as killing them. You can adjust the score gained for each case.
* Make the monsters slowly speed up over time, so they're harder to hit and avoid.
* Add another kind of enemy!
* Add an alternative kind of weapon, which uses a different mouse button or keyboard control.
* Add the Audio object, import some sound files, and add sound effects or music.
* Add a title screen. Use the System object Go to layout action to switch between them.
* Introduce some scenery or obstacles in the level design.
* Add a "Game over" screen, or make something else happen when the player dies.
* Add your own Extensions!

## Mandatory Extension Tutorial
1. We'll first need to add a new layout to our game. Each "layout" is like a different level for our game. We'll now have a main game layout, and a start screen layout. In your project panel, right click on the "layouts" folder and select add layout. You'll also want to add an event sheet. Each layout has it's own event sheet/code, so that our game logic events don't "transfer" between levels. We certainly wouldn't want monsters spawning on our title screen! (that said, multiple layouts can indeed *share* the same event sheet, but we don't want to do this for our start screen)

<img width="500" alt="Screenshot 2022-12-01 at 15 03 48" src="https://user-images.githubusercontent.com/101632496/205073095-61f1cb31-ef9f-43f3-9d5f-62bead264b27.png">

<img width="500" alt="Screenshot 2022-12-01 at 15 03 53" src="https://user-images.githubusercontent.com/101632496/205073236-5a0bae02-992e-4810-bcad-ac2b9f34dbb3.png">

2. Change the name of *both of your layouts* to something more relevant via the properties panel. Select each layout and rename them appropriately. You're welcome to do the same to your event sheets as well if you wish. 

<img width="500" alt="Screenshot 2022-12-01 at 15 04 05" src="https://user-images.githubusercontent.com/101632496/205073584-e540b5ff-832b-44bc-b940-70919e241ba6.png">

<img width="500" alt="Screenshot 2022-12-01 at 15 08 47" src="https://user-images.githubusercontent.com/101632496/205073789-9390a79c-d91a-401b-a0a9-d054967812d5.png">

3. On your main menu layout, add a new object (double click) and select the "button" object. Resize the button on your layout, then in the properties panel under the button's "text" parameter, change this to be "Start Game". 

<img width="150" alt="Screenshot 2022-12-01 at 15 09 20" src="https://user-images.githubusercontent.com/101632496/205073933-673a6f1f-3a9a-46a3-9487-8f457b17bcdb.png">

<img width="150" alt="Screenshot 2022-12-01 at 15 09 55" src="https://user-images.githubusercontent.com/101632496/205074077-cf588ee4-33c4-4d76-b9b6-bcec2df59157.png">

<img width="500" alt="Screenshot 2022-12-01 at 15 10 44" src="https://user-images.githubusercontent.com/101632496/205074264-5e5624c8-4fbc-4ef0-a682-0e010561d2af.png">

4. Now that we have the button, it is a little boring to have a grey background. Let's drag on our current tiled background to our start screen layout. You'll notice that this hides or "overlaps" your button. Right click on the tiled background, select Z-order, and send your tiled background to the bottom of the layer. This will move it behind all of our objects. Lock the tiled backdrop so we can't select it anymore.  

<img width="500" alt="Screenshot 2022-12-01 at 15 11 16" src="https://user-images.githubusercontent.com/101632496/205074383-beb1eba2-e66e-41f3-8586-4a52e726f461.png">

5. Add a new object and select the "text" object. With the text object selected, in the properties panel modify the parameters of the text to suit your liking. I chose a size 50, bolded, Futura Font, but you may like something different. (You may need to scrool down on the properties panel to find the text object properties)

<img width="500" alt="Screenshot 2022-12-01 at 15 14 11" src="https://user-images.githubusercontent.com/101632496/205075067-51629ea7-8d32-46bc-8856-d3273e33e7a2.png">

6. Now it's time to add some game events to make our game swap layouts. 

* Add a new "button event - on clicked"
* as an action when this event occurs, "System Action - go to layout Main Level".

<img width="500" alt="Screenshot 2022-12-01 at 15 16 49" src="https://user-images.githubusercontent.com/101632496/205075652-c360a509-adad-47b6-8fd5-b67613f450b1.png">

7. Preview the layout and test that your button click works. 
8. Finally, let's modify the code on our main game event sheet. We want to send our player back to the menu screen upon death. At the very bottom of our main level event sheet:

* make a  "Keyboard event - on key pressed - space"
* as a 2nd condition to the *same event* (Right click, add another condition) "System - compare 2 values - "player.count" is equal to "0""
* as an action of these 2 conditions "System - go to layout - start menu"

<img width="500" alt="Screenshot 2022-12-01 at 15 20 26" src="https://user-images.githubusercontent.com/101632496/205076524-c959f903-f455-4843-9cd5-ab7b7eeadb56.png">

<img width="500" alt="Screenshot 2022-12-01 at 15 21 44" src="https://user-images.githubusercontent.com/101632496/205076811-4645d6f9-65d7-4c06-b3b7-e1c735312b39.png">

Notes on these conditions: 
* We now have *2 conditions* that BOTH must be true in order for this event to happen. previously we had only been writing conditions that accept 1 event or condition. 
* This second event "player.count" compares how many players exist presently. If we have 0 players, then when we press space, we'll restart the game. If a player exists (ie, we have not died yet), then pressing space does nothing.



## Option Extension Seed Hints. 
* Make the player get points for hitting monsters as well as killing them. You can adjust the score gained for each case.
* Make the monsters slowly speed up over time, so they're harder to hit and avoid.
* Add another kind of enemy!
* Add an alternative kind of weapon, which uses a different mouse button or keyboard control.
* Add the Audio object, import some sound files, and add sound effects or music.
* Add a title screen. Use the System object Go to layout action to switch between them.
* Introduce some scenery or obstacles in the level design.
* Add a "Game over" screen, or make something else happen when the player dies.

