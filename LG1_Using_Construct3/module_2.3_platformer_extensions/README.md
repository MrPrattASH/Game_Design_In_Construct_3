# Platformer Game Extensions
Time for more modding and continuing to make the game your own. Don't browse over these extensions. Tutorials are important, yes, but being able to create your own code (modelled off previous learning or new learning) is where the real experience of Game-Dev comes into practice. 

## Adding and Modding Extensions

Below are a list of ideas you might try to add to your game to modify and make it your own. Below the list of ideas are "hint" instructions. This list is not extensive, and you are more than welcome to create your own This means that I won't tell you exactly how to complete the extension, but I will give you tips and hints for how to complete the task. All of these extension ideas build upon previous skills you learned back in the initial tutorial. 

It is suggested to take 1 class to complete these extensions. You must complete at least 3 optional extensions. 

### Extension Seed Ideas:
* add a "health" or "lives" instance variable to the player, and a text object on the HUD to inform the player of their life. 
* make the player's animation change to "bounce" after jumping off of an enemy
* make a "game over" screen/condition or a "start" menu
* make a new flying-enemy using the "bullet" behaviour from the previous game
* change how the playerbox platform "jump" parameters interact, adding in double jump, making them jump higher, etc. 
* add a new "hazards" layer and add a clone of the tilemap to create more enemys, more platforms, or environmental hazards like lava or poison pits. Add in hotboxes for each of these environmental actions. 
* add background music (into the "music" folder) or sound effects (into the "sounds" folder) 
* add sound effects for the gem collect or jumps (into the "sounds" folder)
* Add your own Extensions!


# Optional Extension Seed Hints 
* add a "health" or "lives" instance variable to the player, and a text object on the HUD to inform the player of their life. 
    * be sure to update this text object every tick. 

* make the player's animation change to "bounce" after jumping off of an enemy
    * you know how to change animations now, where in your code presently can you add in a bounce animation? 
    
* make a "game over" screen/condition or a "start" menu
   * you should know how to complete this task already from mod1.1 extensions

* change how the playerbox platform "jump" parameters interact, adding in double jump, making them jump higher, etc. 
    * on a game layout, with your playerbox sprite selected, look in the properties panel on the left side of your browser. How can you modify the default values for the platformer behaviour? 

* Add another kind of enemy!
    * can you add a new sprite object, and copy the behaviours from your monster sprite over to this new enemy? You'll also need to copy all relevant code for bullet overlaps, player overlaps, to apply to this new enemy sprite as well.

* add a new "hazards" layer and add a clone of the tilemap to create more enemys, more platforms, or environmental hazards like lava or poison pits. Add in hotboxes for each of these environmental actions. 
   * create a new layer called "obstacle tile map". 
   * on this layer, add in a new tile map object. Import your same tilemap into this. Add the solid behaviour to your 2nd tile map. 
   * we now have 2 layers and 2 separate tile maps. Both are solid, which means the player can interact with them. We keep them as separate layers as now we can easily lock layers so we don't move things around
   * Draw out your Hazard tiles on the main layout. 
   * in your event sheet, add in an event for when your playerbox overlaps the hazard tilemap. What should happen? (Remember, you have both a hitbox AND a player animation sprite. 
   * <img width="527" alt="Screenshot 2022-12-09 at 09 13 08" src="https://user-images.githubusercontent.com/101632496/206655779-0b6f99dc-1aef-40e0-8a80-c7dcf9ebdbf2.png">


* Add the Audio object, import some sound files, and add sound effects or music.
    * Similar to adding a sprite, double click on any layout to add the audio object. 
    * go to [zapsplat.com](https://zapsplat.com) to find great, creative commons sound effects
    * Upload the sound effect to the "sounds" folder in your project panel. (Right click the folder, "+Import Sounds")
    * <img width="300" alt="Screenshot 2022-12-01 at 15 49 41" src="https://user-images.githubusercontent.com/101632496/205083350-2e6acdf8-4194-4ef8-b88b-0cbe1f0e6021.png">
    * As an action to an event (perhaps on bullet hitting a monster for bullet sounds, or on your player's death when collide with monster), "Audio - Play" and select your track. 
    * <img width="500" alt="Screenshot 2022-12-01 at 15 51 24" src="https://user-images.githubusercontent.com/101632496/205083891-87ab10b9-92ca-4d36-9304-1e129234258d.png">


