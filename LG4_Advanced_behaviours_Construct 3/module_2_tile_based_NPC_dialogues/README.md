# Tile Based Movement, Functions, & Dialogues with NPC's. 

## By the end of this tutorial you should know:
1. How to write one line of code, and reuse it to accomplish the same task multiple times (or how "functions" work)
2. How to create a simple dialogue trigger
3. How to destroy specific object instances using instance variables

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

In the main event sheet, under the Dialogues group, make a new function. (A "function" is something we have seen before in other games. Basically, a function is a block of code that we can call and run as many times as we want in our code. It allows us to create 1 section of code, and use this multiple times over again, rather than needing to create new lines of code for every event. Handy!) 

This is a neat function. It allows us to trigger & create a dialogue box, and to have the text *dynamically update* depending on the character we are talking to. This is due to the "parameter" we call the function with. We call the function (or run it, but in programming we call this run command a "call". in this case, when we "call" the function, we pass it a parameter called "line" (our instance variable from the dialogue trigger sprite). Imagine we are making a phone call to this function, and the parameter we pass is what we say over the phone. For example, we could call the function with:
> dialogue_box("Hello Adventurer!") 

to produce a dialogue event with the text, "Hello Adventurer!" displayed. Using one function for our dialogue events allows us to write the code once, and use it multiple times with different dialogues each time rather than needing to re-spawn a dialogue event each time. This is the beauty of functions, repeating code we can use for the same purpose, but with slightly different outcomes in the event itself. 

- call the function "dialogue_box" 
- add a "parameter" to accept a string (right click on the function after creation). This parameter is a peice of information we need to call the function with. 

![Screen Shot 2022-04-08 at 15 45 33](https://user-images.githubusercontent.com/101632496/162448314-a9857e19-79a7-48b0-af7a-e23543c60ef0.png)

- inside the function, we need to first create an object "DialogueBox" sprite on the "Dialogue" layer. Choose the appropriate X/Y co-ordinates for the viewport. (312x240) 
- create object "Dialogue_Arrow" sprite, and locate this sprite in the bottom right corner of the now spawned dialogue box. (You can use DialogueBox.BBoxRight for the X value and DialogueBox.BBoxBottom for the Y value
- Create object "SpriteFont_Dialogue" and locate this inside the DialougeBox Sprite. You can use DialogueBox.X and DialogueBox.Y to spawn on the X/Y coordinates of this object. 
- Set the text of Sprite_font_dialogue to "line" (the parameter used at the start of the function. 

Now we have a function set up to create a dialogue box with a flashing arrow, but we havn't "called" or ran the function anywhere in the code. We can write functions, but in order to use them, we need to call them. Let's do this now. 

## 3. Create a new event "Keyboard > on key pressed > space". We'll include 2 sub events inside this event: 
###### 1. the first sub event - Creating a dialogue box
- This uses a bool variable. If the player is overlapping a dialogue trigger box while space is pressed, we should call the dialogue_box function. 
- When we call the dialogue_box function, we will pass the instance variable from the current "dialogue_trigger" in as the argument. This means that the text written inside the instance variable for the dialogue trigger will be displayed in our event. Dynamicaly updating text! 
<img width="289" alt="Screen Shot 2022-09-13 at 14 02 50" src="https://user-images.githubusercontent.com/101632496/189895963-581b183b-9b54-45eb-b3b1-33957e2db630.png">

![Screen Shot 2022-04-08 at 15 57 49](https://user-images.githubusercontent.com/101632496/162450786-87eb8c28-110f-4cde-bb91-2d00d2c5b013.png)

###### 2. The second sub event - destroying any open dialogue boxes
- Add an "else" to the subcondition above. This means that if the if the above sub-event condition is *not* true (ie, the player is not standing on a dialogue trigger), destroy the DialogueBox, SpriteFont_Dialogue, and Dialogue_arrow. We need this to be able to close our dialogue box when we are done talking to the character, otherwise it would stay around forever! 

![Screen Shot 2022-04-11 at 15 23 01](https://user-images.githubusercontent.com/101632496/162748733-f7f1a1cc-e87e-4634-ab64-3acce677174c.png)

Try out your game now. Can you walk up to the character and speak to them? 

# Extension Challenges:

- Be sure your code is fully commented, in line with our 7 rules for code comments. 
- This is your second assessed project. 
- Add in a "Pickup" item somewhere on the main layout. Perhaps it is a coin for currency, or maybe an item your character will use later in a game, or a lost artifact from an NPC quest. (you'll need to find and upload your own custom sprite for this). Then, choose one of the NPC's. They should say 1 thing when the character speaks to them *prior* to picking up the item, and something different *after* picking up the item. Use your knowledge from past tutorials to create this. 
- Add in more dialogue triggers with new characters. Create new instances of the dialogue trigger, and drag in pre-made assets from the "enemies" project folder
- How might you add a new instance variable (perhaps a dialogue "counter") to the code to create a multi-line dialogue, so the character the player is speaking to displays two different dialogue events, one after another? 
- How might you use the "random" or "choose" methods we learned about last module, to make an NPC display a random dialogue line for the player? <img width="333" alt="Screen Shot 2022-04-12 at 14 02 02" src="https://user-images.githubusercontent.com/101632496/162958303-2530cd7a-7df3-4412-bfc0-966febdb576c.png">

