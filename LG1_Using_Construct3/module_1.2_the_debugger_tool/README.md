# The Debugger Tool:
Testing and Re-testing projects again and again is a key part of the design cycle, and a key part of game design. Today, we'll learn a useful tool for testing our games to help solve problems encountered in our code. We'll be using the finished ghost shooter game we made previously. As you follow through this tutorial, open up the debugger as you go, to see how these tools interact. 

## By the end of this tutorial you should know:
1. What the debugger tool is
2. Why it's important to use, often moreso than the "preview layout"
3. How to view game performance summaries
4. How to use a "breakpoints" to isolate a specific problem area of your code
5. Discover an instance's individual *UID* 
6. How to change variables & ingame values while the game is running in debugger mode 

# Tutorial
The tutorial below is taken from the main documentation, and various sub articles [here](https://www.construct.net/en/make-games/manuals/construct-3/interface/debugger). It has been modified and reduced to better fit the scope of this course. 

## What is a "bug"? 
Bugs refer to software defects - things not working as you expected in your game or app. *Generally* speaking, bugs in your app are caused by a programmer error, i.e. *you*, and not the game engine being "buggy" itself. Debugging refers to the process of fixing these issues. Construct's debugger is a tool to help you find and fix bugs in your game.
The debugger has three tabs: Inspect, CPU Profiler and GPU Profiler.

Do not simply read this tutorial. Follow through with the steps in your ghost shooter game, open in a new window. We learn by *doing*, not by reading. 

## Running the debugger
The debugger appears when you choose the Debug preview mode. This can be reached via the main toolbar, the main menu, the Project Bar or using the keyboard shortcut CMD + F5. The debugger works much like an ordinary preview, except that an extra panel appears alongside the game showing lots of information and some diagnostic tools.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/167115661-6b85d374-1a52-414f-8680-1ef3452a4707.png">

## Main debugger commands
Alongside the pop-out button are some other useful tools:

- **Pause**: pause the game so it is no longer progressing. This is useful to spend a while inspecting some information at a particular moment.
- **Step**: can only be used when paused. It advances the game by a single frame. This can be useful to inspect a moment frame-by-frame and watch how an event like a collision is handled.
- **Save and Load**:  make a temporary savegame
- **Restart**: simply refresh the game

## Performance summary
Some details about the performance of the game appear in the debugger's main title bar, and in the Inspect tab area for the System object, which is displayed initially. 

- **The object count** (e.g. 500 objects): how many objects are currently created. Using too many objects can degrade performance.
- **The framerate** (e.g. 60 FPS): how many frames per second the game is running at. Try to shoot for 60, and watch for any big 
- **CPU time** (e.g. 20% CPU): an estimate of how much CPU time is being spent in the logic of the game. This is not always accurate. 
- **GPU time** (e.g. 20% GPU): an estimate of how much GPU time is being spent in the rendering of the game. This is also an estimate based on hardware timers in the GPU.
- **estimated image memory use** (e.g. 32.5mb images): an estimate of how much memory is being used by the currently loaded images in the game. Images typically use up the most memory in a game, but note this value excludes everything else, such as memory required to run the logic of the game or to play music and sound effects. If you're developing for mobile, try to keep this smaller. 

## Breakpoints
Breakpoints are an advanced feature that allow you to pause execution of the event sheet on a specific event, condition or action when running in the debugger. This can be a significant aid to debugging, since the full capabilities of the debugger can be used while stepping through events, conditions and actions one-by-one.

### Setting a Breakpoint
Breakpoints can be toggled on and off for the selected event block, condition or action by right-clicking them and selecting Toggle breakpoint or pressing the F3 keyboard shortcut. Breakpoints can also be toggled while debugging. When a breakpoint is set on an event, condition or action, a breakpoint icon appears beside it.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/167116486-70928fe6-b090-4505-baa5-138eb69dad85.png">

### Pausing on a breakpoint
When running the debugger, **the game will automatically pause just before it runs an event, condition or action with a breakpoint.**

It's best if you run the debugger in a separate window, with your code eventsheet in the background. You'll notice that the line of code that is "broken" at, will be highlighted, allowing you to run code while your game is currently running.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/206165909-2f198675-b097-44e2-a931-a10925d87c61.png">

For events, this means it pauses just before it tests the first condition. It is usually useful to place event breakpoints on sub-events, since they will only pause when the parent events have been run. When paused on a breakpoint, the event has a dashed outline and the icon changes to an arrow.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/167116632-f36ca268-1d40-4a21-ab76-47925b9af229.png">

For conditions, this means it pauses **just before it tests the condition**. Since the condition has not yet been tested, the debugger does not know whether the condition will return true or false; you must resume execution to be able to tell. When paused on a condition, it is also indicated with a dashed outline, an arrow and also a changed background color.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/167116750-002dd152-45f2-4aa7-bbde-8be63e0ed157.png">

For actions, this means it pauses **just before the action runs**. Placing a breakpoint on the first action in an event is often more useful than placing a breakpoint on the event itself, since it will only pause when all the conditions have been met and before any actions have run, as opposed to just before it starts checking any conditions. When paused on an action, it is indicated similarly to a condition.

<img width="500" alt="Screenshot 2022-12-07 at 12 18 58" src="https://user-images.githubusercontent.com/101632496/167116833-dd15bc93-ca63-4ad0-9bd8-29d581ee173a.png">

## You're at a breakpoint pause, now what?
When paused on a breakpoint, the debugger can be used as normal to inspect or edit values. However the Pause and Step buttons change in to Continue and Next. 
- Pressing Continue resumes until the next breakpoint is hit. Remember you can still toggle other breakpoints while paused on a breakpoint.
- Pressing Next will step to the next event, condition or action in sequence in the event sheet. This is useful for stepping through an event action-by-action and watching what happens in the debugger's inspector.

## Using breakpoints
Breakpoints can be incredibly useful to learn more about how your own events work and to help track down problems. They may take some getting used to in order to get the most out of them, but once familiar they can be indispensable.

## Unique ID's (UID) and instances
Remember back to Module 1, we created insances, or new clones, of monster. How does construct 3 handle these? We can easily see in the debugger's *Inspector Panel*, under "Monster", we presently have 18 instances (0-17) of the monster, with 18 different Unique ID's (UID). 

<img width="500" alt="Screen Shot 2022-05-06 at 14 48 47" src="https://user-images.githubusercontent.com/101632496/167135132-79fb3c3e-c7fa-4291-901b-01a88e5e397b.png">

Looking down, we can see I am currently selected on UID 3, and the main screen highlights the selected instance in a red-stroked yellow box. We can also see all the associated instance variables with each UID, in this case, our UID 3 monster's health is at 5. 

<img width="500" alt="Screen Shot 2022-05-06 at 14 48 47" src="https://user-images.githubusercontent.com/101632496/167135432-ecf2a15f-0236-42e6-b734-c8739e962787.png">

## Changing variables in the debugger
If in the inspector panel, we select an object, we can see all the associated properties affecting that object or UID. 
- **Common**: Name of object, and UID's
- **Layout**: Layout properties, like X/Y position, angle, visibility, etc. 
- **Instance Variables**: The current value of the selected UID's instance variable. 

Interestingly, we can even *change instance variables in game!* If we click on the health, we can change our monster's health, speed, etc. Keep in mind, this only affects the debugger game, *it will not change any programmed values in your event sheets*. 

<img width="500" alt="Screen Shot 2022-05-06 at 14 56 05" src="https://user-images.githubusercontent.com/101632496/167135661-3080fba9-18d6-4e5d-9b16-f0c50a4c4206.png"> 
