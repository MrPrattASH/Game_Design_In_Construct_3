# String Variables, String Concatenation, and Basic Dialogue Triggers

This tutorial will teach you about string variables, their differences from booleans and integers(numbers), and how to create basic, single dialogue events in the context of a shop keeper presenting different items to your character. As always, play through the example .c3p finished file to get an idea of what you'll be creating. (WASD and Space for controls). 

## By the end of this tutorial you should know:
1. What a *string* or *str* variable is
2. How to add strings together, and how this is different from adding ints and floats
3. Why "1" + "1" = "11", not "2"
4. How to make functions "dynamic" by giving them information from their environment (parameters) 
5. How to create a simple dialogue trigger
6. How to destroy specific object instances using instance variables

## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLSeixlqST6KOlDjHdqWhwDH4oNY91zj1Z909mxjOlCg3ZhO9_Q/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*.  

## String Variables

Last tutorial we learned that an **boolean or "bool"** is a true/false switch. In contrast, a string is a *word* or *text* variable. For example the below are all string variables ,
> "one"
> "word"
> "this is an entire sentence"
> "1"
> "512432"
> "False" 
> "True


anything that is in between the "double" quotations will be considered to be a string variable. For example:

> Not
> True
> False
> 1234
> 0.431

Are all not string variables. 

This means that these two variables are different. 
> 1 and "1"

the integer *1* and the string *"1"*, are treated as two different things by the computer, despite the fact that they are both "numbers". the fact that it is inside double quotes means it is treated as a string, or "word" "1", rather than as a number. 

## String Concatenation

String concatenation is the process of joining strings together to one another. (basically, addition, but with string variables. )

For example, in string concatenation we would join these two strings to become: (note the space in 1 of the examples, as spaces are not added for you)
> "hello " + "world" = "hello world"
> "hello" + "world" = "helloworld"

interestingly, when we treat numbers as string values, these two lines of code now produce different outcomes:
> adding integers, adds as one would expect
> 
> 1 + 1 = 2 


> "adding" string numbers however, produces interesting results. 
> 
> "1" + "1" = "11"

# Strings for Basic Dialogues
In this tutorial, you'll be using a pre-made game as a base and building on top of it.  In the construct editor, please open the corresponding module's construct folder. As with the last module, you don't need to change anything in the yellow code-group, only the green code. 

## 1. Create a dialogue trigger
Make a new sprite called "dialogue trigger". Give it 3 instance variables:
- String called "character_name"
- boolean called "Event"
- strong called "line"

Add this sprite "dialogue trigger" on the Objects layer. We'll use this as a "dialogue hitbox" for our player to collide into, similar to our player hitbox that we pin our player animation to, or the collision objects we use for making enemy sprites patrol back and forth. 

- place this sprite in front of a character in the shop. 
- On this sprite's instance variables,(not the character's animation instance variable!)
 - give the "character" string a name
 - the "line" variable will be what we use for the characters dialogue line. 

## Setting up Dialogues
We need to inform the player that a dialogue is possible with a character on screen. We'll do this by adding in a collision event, so that when our player overlaps a dialogue box, we'll display a little triangle to hover over the player. Add these 2 events inside the Dialogues code group. 

<img width="827" alt="Screen Shot 2022-09-13 at 13 59 43" src="https://user-images.githubusercontent.com/101632496/189895333-aa2e7300-c917-4344-977e-a7c66ce82d72.png">

We've also toggled our "Event" local bool, we'll use this below to know which character we are talking to. 

## 2. Dialogue Functions
In the main event sheet, under the Dialogues group, make a new function. (A "function" is something we have seen before in other games. Basically, a function is a block of code that we can call and run as many times as we want in our code. It allows us to create 1 section of code, and use this multiple times over again, rather than needing to create new lines of code for every event. Handy!) 

This is a neat function. It allows us to trigger & create a dialogue box, and to have the text *dynamically update* depending on the character we are talking to. This is due to the "parameter" we call the function with. We call the function (or run it, but in programming we call this run command a "call". in this case, when we "call" the function, we pass it a parameter called "line" (our instance variable from the dialogue trigger sprite). Imagine we are making a phone call to this function, and the parameter we pass is what we say over the phone. For example, we could call the function with:
> dialogue_box("Hello Adventurer!") 

to produce a dialogue event with the text, "Hellow Adventurer!" displayed. Using one function for our dialogue events allows us to write the code once, and use it multiple times with different dialogues each time rather than needing to re-spawn a dialogue event each time. This is the beauty of functions, repeating code we can use for the same purpose, but with slightly different outcomes in the event itself. 

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

# Extension ideas:

- Add in more dialogue triggers with new characters. Create new instances of the dialogue trigger, and drag in pre-made assets from the "enemies" project folder
- How might you add a new instance variable (perhaps a dialogue "counter") to the code to create a multi-line dialogue, so the character the player is speaking to displays two different dialogue events, one after another? 
- How might you use the "random" method we learned about last module, to make an NPC display a random dialogue line for the player? You may want to look into a method of random called "choose" when it comes to text based tags. <img width="333" alt="Screen Shot 2022-04-12 at 14 02 02" src="https://user-images.githubusercontent.com/101632496/162958303-2530cd7a-7df3-4412-bfc0-966febdb576c.png">

