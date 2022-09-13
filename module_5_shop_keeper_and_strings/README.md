# String Variables, String Concatenation, and Basic Dialogue Triggers

This tutorial will teach you about string variables, their differences from integers and floats, and how to create basic, single dialogue events in the context of a shop keeper presenting different items to your character. As always, play through the example .c3p finished file to get an idea of what you'll be creating. (WASD and Space for controls). 

## By the end of this tutorial you should know:
1. What a *string* or *str* variable is
2. How to add strings together, and how this is different from adding ints and floats
3. why "1" + "1" = "11", not "2"
4. How to make functions "dynamic" by giving them information from their environment (parameters) 
5. How to create a simple dialogue trigger
6. How to destroy specific object instances using instance variables

## Self-Assessment Quiz:
Complete [this self-assessment quiz](https://docs.google.com/forms/d/e/1FAIpQLSeixlqST6KOlDjHdqWhwDH4oNY91zj1Z909mxjOlCg3ZhO9_Q/viewform?usp=sf_link) after completing the tutorial. If after completing the self-assessment form, you find you are still missing content knowledge, go back through that section of the tutorial to solidify that knowledge *before moving on to the next module*.  

## String Variables

Last tutorial we learned that an **integer or "int"** is a number. In contrast, a string is a word variable. For example the below are all string variables ,
> "one"
> "word"
> "this is an entire sentence"
> "1"

anything that is in between the "double" quotations will be considered to be a string variable. This means that 
> 1 and "1"

would the int *1* and the string *"1"*, despite it being a number, the fact that it is inside double quotes means it is treated as a string, or "word" "1", rather than as a number. 

## String Concatenation

String concatenation is the process of joining strings together to one another. (basically, addition, but with strings. 

For example, in string concatenation we would join these two strings to become:
> "hello " + "world" = "hello world"

interestingly, when we treat numbers as string values, these two lines of code now produce different outcomes:
> adding integers, adds as one would expect
> 
> 1 + 1 = 2 


> "adding" string numbers however, produces interesting results. 
> 
> "1" + "1" = "11"

# Strings for Basic Dialogues
In this tutorial, you'll be using a pre-made game as a base and building on top of it.  In the construct editor, please open the corresponding module's construct folder. As with the last module, you don't need to change anything in the yellow code-group, only the green code. 

## 1. Create a new instance of the sprite "dialogue trigger" on the Objects layer

- place this sprite in front of a character. 
- On this sprite's instance variables,
 - give the "character" string a name
 - the "line" variable will be what we use for the characters dialogue line. 

## 2. In the main event sheet, under the Dialogues group, make a new function

This is a neat function. It allows us to trigger & create a dialogue box, and to have the text *dynamically update* depending on the character we are talking to. This is due to the "parameter" we call the function with, in this case "line". For example, we could call the function with:
> dialogue_box("Hello Adventurer!") 

to produce a dialogue event with the text "Hellow Adventurer!" displayed. Using one function for our dialogue events allows us to write the code once, and use it multiple times with different dialogues each time rather than needing to re-spawn a dialogue event each time. This is the beauty of functions. 

- call the function "dialogue_box" 
- add a "parameter" to accept a string (right click on the function after creation)

![Screen Shot 2022-04-08 at 15 45 33](https://user-images.githubusercontent.com/101632496/162448314-a9857e19-79a7-48b0-af7a-e23543c60ef0.png)

- inside the function, we need to first create object "DialogueBox" sprite on the "Dialogue" layer. Choose the appropriate X/Y co-ordinates for the viewport. (312x240)
- create object "Dialogue_Arrow" sprite, and locate this sprite in the bottom right corner of the now spawned dialogue box. (You can use DialogueBox.BBoxRight for the X value and DialogueBox.BBoxBottom for the Y value
- Create object "SpriteFont_Dialogue" and locate this inside the DialougeBox Sprite. You can use DialogueBox.X and DialogueBox.Y to spawn on the X/Y coordinates of this object. 
- Set the text of Sprite_font_dialogue to "line" (the parameter used at the start of the function. 

## 3. Create a new event "on space pressed" that includes 2 sub events. 
###### 1. the first sub event - Creating a dialogue box
- This uses a bool variable, which we'll get into more during the next module. Essentially, if the player is overlapping a dialogue trigger box while space is pressed, we should call the dialogue_box function. 
- When we call the dialogue_box function, we will pass the instance variable from the current "dialogue_trigger" in as the argument. This means that the text written inside the instance variable for the dialogue trigger will be displayed in our event. 

![Screen Shot 2022-04-08 at 15 57 49](https://user-images.githubusercontent.com/101632496/162450786-87eb8c28-110f-4cde-bb91-2d00d2c5b013.png)

###### 2. The second sub event - destroying any open dialogue boxes
- Add an "else" to the subcondition above. This means that if the if the above sub-event condition is *not* true (ie, the player is not standing on a dialogue trigger), destroy the DialogueBox, SpriteFont_Dialogue, and Dialogue_arrow. 

![Screen Shot 2022-04-11 at 15 23 01](https://user-images.githubusercontent.com/101632496/162748733-f7f1a1cc-e87e-4634-ab64-3acce677174c.png)


# Extension ideas

- Add in more dialogue triggers with new characters. Create new instances of the dialogue trigger, and drag in pre-made assets from the "enemies" project folder
- How might you add a new instance variable (perhaps a dialogue "counter") to the code to create a multi-line dialogue, so the character the player is speaking to speaks twice? 
- How might you use the "random" method we learned about last module, to make an NPC display a random dialogue line for the player? You may want to look into a method of random called "choose" when it comes to text based tags. <img width="333" alt="Screen Shot 2022-04-12 at 14 02 02" src="https://user-images.githubusercontent.com/101632496/162958303-2530cd7a-7df3-4412-bfc0-966febdb576c.png">

