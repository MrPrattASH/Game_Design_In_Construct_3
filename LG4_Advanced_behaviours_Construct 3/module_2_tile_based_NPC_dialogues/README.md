# Tile Based Movement, Functions, & Dialogues with NPC's. 

## By the end of this tutorial you should know:
1. How to write one line of code, and reuse it to accomplish the same task multiple times (or how "functions" work)
2. How to create a simple dialogue trigger
3. How to destroy specific object instances using instance variables

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/101632496/227128917-a2cf72a3-a5a4-4b78-9cbb-785abd4d2d1d.gif)

# Using Strings to create Basic Dialogues
We're going back to the barebones example browser template. Open up the "Tile-Based" game. Before moving on to the tutorial, be sure you understand how the game logic works:
- How does tile based movement differ from 8 direction movement? Are diagonal movements possible? 
- Why is one tilemap "solid" vs. one being the background? 

<img width="269" alt="Screenshot 2023-03-22 at 07 56 59" src="https://user-images.githubusercontent.com/101632496/226825406-baa0bf82-f2ca-4fdd-afdd-a046eccb8263.png">

## Create a Dialogue "Trigger" Hitbox
Lets make a sprite that will notify our player that a conversation is possible, or a dialogue event (say reading a signpost) is actionable. 

1. Make a new sprite called "dialogue trigger". This will be another invisible coloured box (a concept well known to you by now). Give it two instance variables:
- boolean called "Event"
- string called "line"

2. Set the origin of this sprite (in the animations editor) to the top left. ALL objects in our tilebased game need to have a top left origin. If you don't set this, the tiles wont "align" on the grid properly, and they'll be offset. Resize this sprite to be our default tile size, 32x32, and make it not initially visible. 

<img width="600" alt="Screenshot 2023-03-22 at 08 05 58" src="https://user-images.githubusercontent.com/101632496/226826974-b6036e0f-23ac-46e9-82e1-c7b5cc6e0c64.png">

3. Add a new layer called "dialogue_events" and add this sprite to this layer. We'll use this as a "dialogue hitbox" for our player to collide into, similar to our player hitbox that we pin our player animation to, or the collision objects we use for making enemy sprites patrol back and forth. Go ahead and place this dialogue trigger somewhere interesting, maybe on a pile of rocks to show the player a "hidden item" exists here? 

4. Make a new sprite called "Dialogue_Arrow". Make it a small arrow (16x16) (edit this in the properties panel on the left, dragging corners to resize wont work) and place this in the top left corner of our screen, outside of the layout. We need to create a "placeholder" sprite with the correct size before we spawn it on the map. If we were to not have this placeholder sprite, our arrow would spawn as a gigantic sprite and not the size we want. Be sure to crop your sprite after creating to remove the blank transparent space around your sprite. 

<img width="600" alt="Screenshot 2023-03-22 at 08 05 58" src="https://user-images.githubusercontent.com/101632496/226847121-5e67f4ed-6b39-4187-9692-06c65f568908.png">

5.This sprite will inform our player that an object is interactable. Make a new event for player box overlapping the dialogue trigger, and system create object. 

<img width="600" alt="Screenshot 2023-03-22 at 08 05 58" src="https://user-images.githubusercontent.com/101632496/226847563-08ad7b3c-d0de-4202-afcb-11d58fef171e.png">

Now, whenever our player overlaps the dialogue trigger, an "arrow" will pop up 1 tile space above the trigger, letting our player know that they can interact with something on this space. 

6. Add an "else" condition to destroy our dialogue_arrow if the player is not overlapping a dialogue_trigger. 

<img width="600" alt="Screenshot 2023-03-22 at 08 05 58" src="https://user-images.githubusercontent.com/101632496/226848142-abc5a87d-c697-4d9f-8df2-13d73b1edf25.png">

7. We also need a way of knowing which dialogue box is being interacted with at any point in time. We'll use our boolean varialbe to do this. (so that ONLY the dialogue trigger we are overlapping with will display it's "line" variable later in the code. 

<img width="500" alt="Screenshot 2023-03-23 at 08 01 40" src="https://user-images.githubusercontent.com/101632496/227127619-27d26078-ba90-461e-97b6-4cc2c5757fb6.png">

Test out your game. You should walk over the dialogue trigger and an arrow should display. Once you walk away from the item, the arrow should disappear. 

# Creating the Dialogue Box

1. Create a new layer called Dialogues, and set the layer's paralax properties to 0x0%, similar to what you've done in the past to make a UI or HUD layer. Additonally, set this layer's "initially visible" property to false. 

<img width="368" alt="Screenshot 2023-03-22 at 08 19 50" src="https://user-images.githubusercontent.com/101632496/226829364-d9e3091b-772d-4351-af7b-073c9322245f.png">

2. Make two new sprites. Format them to your liking. You may see my example below. 
- One is a black background for our text called DialogueBox.  
- The second is a text object for where our dialogue lines will be displayed

<img width="368" alt="Screenshot 2023-03-22 at 08 19 50" src="ttps://user-images.githubusercontent.com/101632496/226922048-df658e33-fc09-4ac2-b3b3-026a3e85ee3b.png">

3. Before we make our dialog text spawn, we need to have our words that will show displayed. We're doing two things. 
- Duplicate your dialogue_trigger and place this second one somewhere on your map
- Write some text in the "line" instance variable on both triggers. be sure the text is different. 
- 
![Screenshot 2023-03-22 at 14 47 44](https://user-images.githubusercontent.com/101632496/226924360-f66d73c1-37e0-4a23-899d-027aec524164.png)

![Screenshot 2023-03-22 at 14 47 52](https://user-images.githubusercontent.com/101632496/226924386-51d476f3-8337-48fb-ae8a-6e6a4d623f97.png)

## Making a Reusable Dialogue Function
Time to make our code reusable, in the form of a function. Essentially, we can write code once and have it create different outcomes. So we will write one function to display dialogyue, and from then on, all we need to do is write new lines and our dialogue displays automagically.

A "function" is something we have seen before in other games. Basically, a function is a block of code that we can call and run as many times as we want in our code. It allows us to create 1 section of code, and use this multiple times over again, rather than needing to create new lines of code for every event. Handy!

1. Make a new function by rightclicking, add new function called "Display_Dialogue". 

<img width="328" alt="Screenshot 2023-03-23 at 07 49 16" src="https://user-images.githubusercontent.com/101632496/227125204-8d36af53-c1bd-4bbd-bdab-84ab2caabd66.png">

2. Right click on the function and select "add parameter". Add a string parameter called "line". 
<img width="500" alt="Screenshot 2023-03-23 at 07 50 46" src="https://user-images.githubusercontent.com/101632496/227125481-2364b3ce-2950-47ad-83a7-add4d969737f.png">

Having a parameter will allow our dialogue text to *dynamically update* depending on the character we are talking to. This is due to the "parameter" we call the function with. We call the function (or run it, but in programming we call this run command a "call". When we "call" the function, we pass it an argument called "line". The argument we pass to the parameter (or the value we call our function with) will be our instance variable from the dialogue trigger sprite. Imagine we are making a phone call to this function, and the parameter we pass is what we say over the phone. For example, we could call the function with:
> dialogue_box("Hello Adventurer!") (where "Hello Adventurer" is the value that the parameter "line" is assigned)

to produce a dialogue event with the text, "Hello Adventurer!" displayed. Using one function for our dialogue events allows us to write the code once, and use it multiple times with different dialogues each time rather than needing to re-spawn a dialogue event each time. This is the beauty of functions, repeating code we can use for the same purpose, but with slightly different outcomes in the event itself. 

3. Add a few actions to the dialogue function. First, we show the dialogue layer, then we typewriter "line" in the UI text box. It may seem silly to make a function for such a small amount of code, but imagine you have 30 characters in your game. Is it more efficient to write "show dialogue layer, display text" for 30 characters? Or is it more efficient to simply call a "show dialogue function" with one argument? Functions save time! 


<img width="500" alt="Screenshot 2023-03-23 at 07 57 25" src="https://user-images.githubusercontent.com/101632496/227126815-03edfcd2-c195-43f7-a09c-11b23b7151f5.png">

<img width="500" alt="Screenshot 2023-03-23 at 07 57 11" src="https://user-images.githubusercontent.com/101632496/227126775-d6098cb2-d7a2-4e8d-b79a-c1c702ac93d1.png">


## Make the Dialogue Box Display Dialogue
Now we have a function set up to create a dialogue box with an arrow, but we havn't "called" or ran the function anywhere in the code. We can write functions, but in order to use them, we need to call them. Let's do this now. 

1. Create a new event for on space pressed. We'll use the space key to both show and hide dialogues. 
- If our dialogue layer is currently showing and the player is pressing space, they want to "end" the dialogue and close it. 
- If they're overlapping a dialogue trigger and want to talk to it, it should display the "line" from the correct dialogue trigger. (with the Dialogue_trigger.line argument, or rather, the line from the dialogue trigger we are currently overlapping) 

<img width="600" alt="Screenshot 2023-03-23 at 08 05 03" src="https://user-images.githubusercontent.com/101632496/227128217-8ccc8a1e-cb27-4103-8fe1-0ec621ba13fd.png">

Try out your game now. Can you walk up to the specific areas and speak to them? You should also notice that the text displays different dialogues each time. 

![ezgif com-video-to-gif](https://user-images.githubusercontent.com/101632496/227128917-a2cf72a3-a5a4-4b78-9cbb-785abd4d2d1d.gif)


