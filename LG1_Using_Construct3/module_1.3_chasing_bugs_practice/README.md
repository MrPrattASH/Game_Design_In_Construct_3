# The Debugger Tool:
Let's put your skills to the test. On this folder, I've uploaded a buggy version of the Ghost Shooter game. Can you help me fix the bugs? 

This tutorial is a practical experience in using the debugger. In construct 3, Open up this construct folder from this cloned repo back in LG0. (Local File Path: LG_1_Using_Construct_3 > module_1.3_Chasing_bugs > bug_construct_folder)

INSERT SCREENSHOT HERE


Be sure to read through my code comments to see why wrote lines of code. Code comments are like "breadcrumbs" to let programmers know what/why things are happening in the game. 

Fill out the "bug finding" sheet on the BrightSpace assignment page while you debug. All of these bugs are common errors that will happen to you throughout your programming time. Be sure to use the "debugger" preview while playing to solve problems. 

# Bugs to Find

### Game Over text always visible
When I start the game, my gameover text is visible, but I haven't lost yet. That's not right. Maybe I toggled something disabled, then forgot to re-enable it again?
* Look for toggled disabled events. 
* on the layout, check the properties for "is initially visible"

### 7million monster wave
I *want* to have monsters spawn every 3 seconds. Presently, when I start the game, I get 7 million spawning in a gigantic terrifying wave. My game is running at 60 frames per second, and presently, 60 monsters are spawning per second...
* look for a "sequencing" error. I have a "create object > green monster" attached to an incorrect condition presently.  

### Behaviour conflicts 
When my monster leaves the layout, they should turn around and re-face the player. But right now, they disapear when outside of the layout. Why?
* look at line 6 in the code. 
* look for added behaviour conflicts on a sprite. 

### Missing Code
When a monster collides with the player, the player stays around, but can't move. What's happening, and what needs to change? 
* Take a look at the "player on collision with green monster" event. 
* You'll need to replace a line of code. 

### Speedy Monster
One monster is insanely fast. Why is that? 
* Debug preview the game. immediately, press pause. 
* On the System inspector panel (left side) go to green monster and cycle through UID's until you find/select the fast monster. 
* What values on this monster are different than other UIDs of other monsters? He is pretty *speed*y
