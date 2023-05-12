# Arcade Game Upload Instructions (ASH ARCADE Master Instructions)
* Open Master Arcade project
	* In game_list.json, 
		* Collumns:
			* 1: Game name. This NEEDS to be the same as the initial layout for the game. We go to layout by name when selecting. 
			* 2: description
			* 3: student name
			* 4: student help. Usually music designer
	* on Level select layout:
		* Game_Image Sprite: Add new animation with screenshot from game. Rename animation as same in column 1 in game_list.json
	* In project folder structure:
		* make new folder for game name in layouts, event sheets, and objects. 
* Open 2nd project.
	* Rename all sprites to be tagged with game name. Ex:
		* Player > Player_cd
		* This stops duplicate sprites screwing up the copy/paste process. 
	* Rename main “Start page” layout as the same value as was in game_list.json
	* Rename rest of the layouts/event sheets with a game name tag. 
	* Copy all game objects to respective object folders
	* copy all layouts
	* copy all event sheets
* With the game copied over:
	* In all event sheets, include the “LEvel_switch_button_funcs” event sheet. 
		* this allows for the esc. Key to home button to trigger. 
	* replace any keybindings that are incorrect. 
	* Add in button artwork for games that need it on instructions pages. 
	* For all game layouts, re-tie layouts and event sheets. (As they transfer with none) 
