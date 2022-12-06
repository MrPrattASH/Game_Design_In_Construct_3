# Platformer Game Extensions
Time for more modding and making the game your own. 

## Adding and Modding Extensions

Below are a list of ideas you might try to add to your game to modify and make it your own. You must complete at least 3 optional extensions. Below the list of ideas are "hint" instructions. This list is not extensive, and you are more than welcome to create your own This means that I won't tell you exactly how to complete the extension, but I will give you tips and hints for how to complete the task. All of these extension ideas build upon previous skills you learned back in the initial tutorial. It is suggested to take 1 class to complete these extensions. 

### Extension Seed Ideas:
* add a "health" or "lives" instance variable to the player
* make the player's animation change to "bounce" after jumping off of an enemy
* make a "game over" screen/condition or a "start" menu
* make a new flying-enemy using the "bullet" behaviour from the previous game
* change how the playerbox platform "jump" parameters interact, adding in double jump, making them jump higher, etc. 
* add a new "hazards" layer and add a clone of the tilemap to create more enemys, more platforms, or environmental hazards like lava or poison pits. Add in hotboxes for each of these environmental actions. 
* add background music (into the "music" folder) or sound effects (into the "sounds" folder) 
* add sound effects for the gem collect or jumps (into the "sounds" folder)
* Add your own Extensions!


# Optional Extension Seed Hints 
* Make the player get points for hitting monsters as well as killing them. You can adjust the score gained for each case.
    * Presently, we only add score when the condition "monster's health <0" is true. How can you use this same code, but on the "bullet collides with monster" event? 


* Make the monsters slowly speed up over time, so they're harder to hit and avoid.
    * monster speed is currently a global number of "80". Add a new event for "system - every X seconds". How might you *add* to this global number? 
    * <img width="256" alt="Screenshot 2022-12-01 at 15 44 57" src="https://user-images.githubusercontent.com/101632496/205082244-6eddbd27-af9e-45ee-9295-d46a2c9fa2a8.png">


* Add another kind of enemy!
    * can you add a new sprite object, and copy the behaviours from your monster sprite over to this new enemy? You'll also need to copy all relevant code for bullet overlaps, player overlaps, to apply to this new enemy sprite as well.


* Add an alternative kind of weapon, which uses a different mouse button or keyboard control.
    * can you add a new sprite object, and copy the behaviours from your bullet sprite over to this new weapon? You'll also need You'll also need to copy all relevant code for monster overlaps to apply to this new enemy sprite as well. 


* Add the Audio object, import some sound files, and add sound effects or music.
    * Similar to adding a sprite, double click on any layout to add the audio object. 
    * go to [zapsplat.com](https://zapsplat.com) to find great, creative commons sound effects
    * Upload the sound effect to the "sounds" folder in your project panel. (Right click the folder, "+Import Sounds")
    * <img width="300" alt="Screenshot 2022-12-01 at 15 49 41" src="https://user-images.githubusercontent.com/101632496/205083350-2e6acdf8-4194-4ef8-b88b-0cbe1f0e6021.png">
    * As an action to an event (perhaps on bullet hitting a monster for bullet sounds, or on your player's death when collide with monster), "Audio - Play" and select your track. 
    * <img width="500" alt="Screenshot 2022-12-01 at 15 51 24" src="https://user-images.githubusercontent.com/101632496/205083891-87ab10b9-92ca-4d36-9304-1e129234258d.png">


* Introduce some scenery or obstacles in the level design.
    * for these new sprites, add the "solid" behaviour to them. This will cause monsters and your player to collide with them. 
    * <img width="104" alt="Screenshot 2022-12-01 at 15 52 13" src="https://user-images.githubusercontent.com/101632496/205084109-21a994ec-7870-480a-9aac-327bed05559b.png">

