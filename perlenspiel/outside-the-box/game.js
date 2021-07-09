/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

var currLev = 0;
var GAME = {

    SONG1: "",
    SONG2: "",
    SONG3: "",
    SONG4: "",
    SONGEND: "",
    BACKGROUND_COLOR: 0xAEAEAE,
    PLAYER_COLOR: 0x000000,
    GOAL_COLOR: 0X8E8E8E,
    GOAL_BORDER: 0XFFFFFF,
    WALL_COLOR: 0xE0E0E0,
    CAMERA_SIZE: 16,

    // Cursor for where the camera should display
    camera_cursor_x: 0,
    camera_cursor_y: 0,

    // UPDATE these variables to reflect the boundaries of the actual map
    map_size_x: 16,
    map_size_y: 16,

    // Variables for whether or not the player can break a wall and their size
    canBreak: false,
    playerScale: 50,
    playerRound: 0,

    // Player position
    playerx: 3,
    playery: 3,

    canMove: true,

    timer: "",
    endTime: "",

    isOver: false,

    //level templates
    mapTemplate:[ //32 X 32
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],

    mapTemplate2:[ //16 X 16
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],

    //levels
    map0:[ //16 X 16
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],

    map1:[ //introduction   19 X 21 //| 16 mark
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, // 1 walls
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, //-2 false goal
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,-1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, //-1 real goal
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,//16 mark
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
    ],

    //level templates
    map2:[ //32 X 32                  | 16 Mark
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,-1,
    ],

    //level 4
    map3:[ //32 X 32                  | 16 Mark
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,1,0,0,-1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,
        0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,
        0,0,0,0,0,0,0,0,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,0,1,1,1,0,0,0,0,1,0,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,1,1,1,1,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,1,1,0,0,1,1,1,1,1,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,0,1,0,1,1,0,
        0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,2,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
    ],

    //levels
    map4:[ //introduction   19 X 21 //| 16 mark
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, // 1 walls
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, //-2 false goal
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,-1,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0, //-1 real goal
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,//16 mark
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,2,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
    ],
    map5:[ //16 X 17                  | 16 Mark
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,2,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,-1,
    ],

    map6:[ //19 X 21 //| 16 mark
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,2, // 1 walls
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0, //-2 false goal
        0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,1,1,1,1,
        0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,0,0,0,1,0,
        0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0, //-1 real goal
        0,0,0,0,0,0,0,0,1,0,0,1,0,1,1,1,1,1,0,1,0,
        0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,2,0,1,0,1,0,
        0,0,0,0,0,0,0,0,1,0,0,1,1,1,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,//16 mark
        0,0,0,0,0,0,0,0,1,1,1,1,1,0,1,0,1,1,1,1,0,
        1,1,0,0,0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,1,0,
        -1,1,0,0,0,0,0,0,1,0,0,0,1,1,1,1,1,0,0,1,0,
    ],

    map7:[ //final level 16 x 16
        0,0,0,0,0,0,0,2,1,0,1,2,1,0,1,0,2,
        0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,
        0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,
        0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,
        1,1,1,1,0,0,0,0,1,0,1,0,1,0,1,0,0,
        0,0,0,0,0,0,0,0,1,0,1,0,1,0,1,0,0,
        1,1,1,1,1,1,1,1,1,0,1,0,1,0,1,0,0,
        2,0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,
        1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
        2,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,0,1,0,0,2,2,1,0,0,0,1,0,0,-1,
    ],

    map8:[ //16 X 64
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,
        1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,1,0,
        1,1,1,1,1,1,1,2,1,0,0,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0,
        1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,0,
        1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,1,1,1,1,1,1,1,1,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,
        1,0,0,1,1,1,1,1,1,1,1,1,0,0,1,1,0,
        1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,
        1,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,0,
        1,0,0,1,1,1,0,1,0,0,1,0,0,0,1,1,0,
        1,0,0,0,0,0,0,1,0,0,1,0,0,0,1,1,0,
        1,0,1,1,1,1,1,1,0,0,1,0,0,0,1,1,0,
        1,0,1,0,0,0,0,1,0,0,1,0,0,0,1,1,0,
        1,0,1,0,1,1,0,1,0,0,1,0,0,0,1,1,0,
        1,0,1,0,1,0,0,1,0,0,1,0,0,0,1,1,0,
        1,0,1,0,1,0,1,1,0,0,1,0,0,0,1,1,0,
        1,1,1,0,1,0,0,0,0,0,1,0,0,0,1,1,0,
        1,0,0,0,1,1,1,1,1,1,1,0,0,0,1,1,0,
        1,0,1,1,1,1,1,1,0,0,1,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,1,0,0,0,1,1,0,
        1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,
        1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,
        1,0,1,0,0,0,1,1,1,1,1,0,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,1,0,0,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,1,1,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,1,1,0,0,1,1,1,1,1,1,1,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,1,1,1,1,1,1,1,1,1,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,1,0,1,0,1,1,0,
        1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,1,1,1,1,1,1,0,1,0,1,1,0,
        1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,1,0,0,0,0,0,0,1,0,1,1,0,
        1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,0,
        1,0,1,1,1,1,0,0,0,0,0,0,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,
        1,0,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,
        1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,
        1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
        -1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ],

    map9:[ //final grid
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,2,0,0,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,2,2,2,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,-1,
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,
    ],

    maps: [],
    trackingMaps: [],
    gridSize: 16,


    movePlayer : function ( x, y ) //move player
    {

        if(!GAME.canMove)
        {
            return;
        }
        let nx = GAME.playerx + x;
        let ny = GAME.playery + y;

        // If we are trying to move outside the map, abort the function
        if( ( 0 >  nx ) || ( nx > (GAME.CAMERA_SIZE - 1))  ||
            ( 0 > ny ) || (ny > (GAME.CAMERA_SIZE - 1)) )
        {
            PS.audioPlay("fx_shoot7");
            return;
        }


        // If we are trying to move into a wall
        else if(PS.data(nx, ny, PS.CURRENT) === 1)
        {
            if(GAME.canBreak)
            {
                PS.data(nx, ny, 0);
                // Update the value in the tracking map to reflect the new state of the board
                GAME.trackingMaps[currLev][(GAME.map_size_x * (ny + GAME.camera_cursor_y)) + (GAME.camera_cursor_x + nx)] = 0;
                // Change the color of the bead to the backgorund
                PS.color(nx, ny, GAME.BACKGROUND_COLOR);
                PS.borderColor(nx, ny, GAME.BACKGROUND_COLOR);
                // Shrink the player
                GAME.playerScale = 50;
                GAME.canBreak = false;
                GAME.playerRound = 0;
                PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
                PS.radius(GAME.playerx, GAME.playery, GAME.playerRound);

                // Play a destroying sound
                PS.audioPlay("fx_blast2");
            }
            else
            {
                // Play a wall hitting sound
                PS.audioPlay("fx_shoot7");
            }
            return;
        }
        //check if we are moving into right goal
        else  if (PS.data(nx, ny, PS.CURRENT) === -1)
        {
            PS.audioPlay("fx_ding"); //play triumphant sound
            currLev += 1; //go to next level
            if(currLev === 10)
            {
                GAME.isOver = true;
                GAME.end();
                return;
            }
            GAME.camera_cursor_y = 0;  //reset camera
            GAME.camera_cursor_x = 0;
            PS.color(GAME.playerx, GAME.playery, GAME.BACKGROUND_COLOR); //make player disappear
            PS.scale(GAME.playerx, GAME.playery, PS.DEFAULT);
            PS.scale(GAME.playerx, GAME.playery, PS.DEFAULT);
            GAME.playerx = 3;//reset player position
            GAME.playery = 3;

            GAME.playerScale = 50;
            GAME.canBreak = false;
            GAME.playerRound = 0;

            GAME.SetLevelDataInit(currLev);
            PS.fade(PS.ALL, PS.ALL, 30);
            PS.borderFade(PS.ALL, PS.ALL, 30);
            GAME.timer = PS.timerStart(40, GAME.tick);
            GAME.canMove = false;
            GAME.DrawMap();
//            PS.fade(PS.ALL, PS.ALL, PS.DEFAULT);
            PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
            PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
            PS.radius(GAME.playerx, GAME.playery, PS.DEFAULT);

            return;
        }
/*
        // if the player is moving into wrong goal
        else if(PS.data(nx, ny, PS.CURRENT) === -2)
        {
            GAME.ResetLevel();
            return;
        }
*/
        // if the player is moving into the powerup
        else if(PS.data(nx, ny, PS.CURRENT) === 2)
        {
            // As long as we don't have a powerup...
            if(!GAME.canBreak) {
                // Play the powerup noise  and change the player's size
                PS.audioPlay("fx_powerup6");
                GAME.playerScale = 100;
                GAME.canBreak = true;
                GAME.playerRound = 25;
                PS.radius(nx, ny, GAME.playerRound);

                // Update the tracking map
                PS.data(nx, ny, 0);
                GAME.trackingMaps[currLev][(GAME.map_size_x * (ny + GAME.camera_cursor_y)) + (GAME.camera_cursor_x + nx)] = 0;
            }
            else{
                // You can't eat TWO powerups. Don't change anything
                PS.audioPlay("fx_squish");
                PS.radius(nx, ny, PS.DEFAULT)

            }


        }

        // Camera control
        // If we are approaching the edge of the grid and the camera can move, move it
        if((nx < 2) && (GAME.camera_cursor_x > 0))
        {
            GAME.camera_cursor_x -= 1;
            GAME.SetLevelData(currLev);
            GAME.DrawMap();
            PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
            PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
            PS.radius(GAME.playerx, GAME.playery, GAME.playerRound);
            //PS.audioPlay("fx_click"); // Play a happy sound
            return;
        }

        else if((nx > (GAME.CAMERA_SIZE - 3)) && (GAME.camera_cursor_x < (GAME.map_size_x - GAME.CAMERA_SIZE)))
        {
            GAME.camera_cursor_x += 1;
            GAME.SetLevelData(currLev);
            GAME.DrawMap();
            PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
            PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
            PS.radius(GAME.playerx, GAME.playery, GAME.playerRound);
            //PS.audioPlay("fx_click"); // Play a happy sound
            return;
        }

        else if((ny < 3) && (GAME.camera_cursor_y > 0))
        {
            GAME.camera_cursor_y -= 1;
            GAME.SetLevelData(currLev);
            GAME.DrawMap();
            PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
            PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
            PS.radius(GAME.playerx, GAME.playery, GAME.playerRound);
           // PS.audioPlay("fx_click"); // Play a happy sound
            return;
        }

        else if((ny > (GAME.CAMERA_SIZE - 3)) && (GAME.camera_cursor_y < (GAME.map_size_y - GAME.CAMERA_SIZE)))
        {
            GAME.camera_cursor_y += 1;
            GAME.SetLevelData(currLev);
            GAME.DrawMap();
            PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
            PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
            PS.radius(GAME.playerx, GAME.playery, GAME.playerRound);
           // PS.audioPlay("fx_click"); // Play a happy sound
            return;
        }
        // End Camera Controle

        else
        {
            // If we are standing on a powerup and it should reappear, make it
            if(PS.data(GAME.playerx, GAME.playery, PS.CURRENT) === 2)
            {
                PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
                PS.scale(GAME.playerx, GAME.playery, 50);
                PS.radius(GAME.playerx, GAME.playery, 50);
                PS.borderColor(GAME.playerx, GAME.playery, GAME.BACKGROUND_COLOR);
            }
            else
            {// Reset the color of the bead the player was just on
                PS.color(GAME.playerx, GAME.playery, GAME.BACKGROUND_COLOR);
                PS.scale(GAME.playerx, GAME.playery, PS.DEFAULT);
                PS.radius(GAME.playerx, GAME.playery, PS.DEFAULT);
            }
            // move the player to the desired square
            PS.color(nx, ny, GAME.PLAYER_COLOR);
            PS.scale(nx, ny, GAME.playerScale);
            PS.radius(nx, ny, GAME.playerRound);
            GAME.playerx = nx;
            GAME.playery = ny;
        }


        //PS.audioPlay("fx_click"); // Play a happy sound
        //PS.debug("camera_cursor_x = " + GAME.camera_cursor_x);
        //PS.debug("camera cursor_y = " + GAME.camera_cursor_y + "\n");
    },

    // Set the ps.data values for each level, among other things
    SetLevelDataInit : function(currLev)
    {

        let currMap = GAME.maps[currLev];

        if(currLev === 1)
        {
            GAME.map_size_x = 21;
            GAME.map_size_y = 19;
        }
        if(currLev === 2)
        {
            GAME.map_size_x = 32;
            GAME.map_size_y = 32;
            PS.audioFade(GAME.SONG1, PS.CURRENT, 0.0);
            PS.audioFade(GAME.SONG2, PS.CURRENT, 1.0)
        }
        if(currLev === 5)
        {
            GAME.map_size_x = 32;
            GAME.map_size_y = 32;
        }
        if(currLev === 3)
        {
            GAME.map_size_x = 21;
            GAME.map_size_y = 19;
            PS.audioFade(GAME.SONG2, PS.CURRENT, 0.0);
            PS.audioFade(GAME.SONG3, PS.CURRENT, 1.0)
        }
        if(currLev === 4)
        {
            GAME.map_size_x = 17;
            GAME.map_size_y = 16;
        }
        if(currLev === 6)
        {
            GAME.map_size_x = 21;
            GAME.map_size_y = 19;
            GAME.camera_cursor_x = 2;
            PS.audioFade(GAME.SONG3, PS.CURRENT, 0.0);
            PS.audioFade(GAME.SONG4, PS.CURRENT, 1.0)
        }
        if(currLev === 7)
        {
            GAME.map_size_x = 17;
            GAME.map_size_y = 16;
        }
        if(currLev === 8)
        {
            GAME.map_size_x = 17;
            GAME.map_size_y = 64;
            GAME.camera_cursor_x = 0;
            GAME.camera_cursor_y = 1;
            GAME.playerx = 7;
            GAME.playery = 4
        }
        if(currLev === 9)
        {
            GAME.map_size_x = 18;
            GAME.map_size_y = 18;
            GAME.camera_cursor_x = 1;
            GAME.camera_cursor_y = 1;
            GAME.playerx = 7;
            GAME.playery = 7;
        }
        let cameray = 0;
        let camerax = 0;
        // Set the data values of every bead on the grid based on the map for the current level
        for(let curry = GAME.camera_cursor_y; cameray < GAME.CAMERA_SIZE; curry+=1)
        {
            camerax = 0;
            for(let currx = GAME.camera_cursor_x; camerax < GAME.CAMERA_SIZE; currx+=1)
            {

                let currBead = currMap[(curry*GAME.map_size_x) + currx];
                PS.data(camerax, cameray, currBead);
                camerax += 1;
            }
            cameray += 1;

        }
        // Reset the tracking map to the initial state of the level
        GAME.trackingMaps[currLev] = Array.from(GAME.maps[currLev]);
    },

    // Function to set the level data based on the camera movement
    SetLevelData : function(currLev)
    {
        let currMap = GAME.trackingMaps[currLev];
        let cameray = 0;
        let camerax = 0;
        // Set the data values of every bead on the grid based on the map for the current level
        for(let curry = GAME.camera_cursor_y; cameray < GAME.CAMERA_SIZE; curry+=1)
        {
            camerax = 0;
            for(let currx = GAME.camera_cursor_x; camerax < GAME.CAMERA_SIZE; currx+=1)
            {
                // Set the data of the current bead to the right number
                let currBead = currMap[(curry*GAME.map_size_x) + currx];
                PS.data(camerax, cameray, currBead);
                camerax += 1;
            }
            cameray += 1;

        }
    },

    //draw map
    DrawMap : function()
    {
       /* if(currLev === 8){
            PS.color(PS.ALL, PS.ALL, PS.COLOR_WHITE);
            PS.border(PS.ALL, PS.ALL, PS.COLOR_WHITE);
        } else{*/
            for(let curry = 0; curry <GAME.CAMERA_SIZE; curry+=1)
            {
                for(let currx = 0; currx < GAME.CAMERA_SIZE; currx+= 1)
                {
                    if ((PS.data(currx, curry, PS.CURRENT) === -1) || (PS.data(currx, curry, PS.CURRENT) === -2) ) //if it is a goal
                    {
                        //make the goal appear
                        PS.color(currx, curry, GAME.GOAL_COLOR);
                        PS.borderColor(currx, curry, GAME.GOAL_BORDER);
                        PS.border(currx, curry, { top : 3,  left : 3, bottom : 3,right : 3});
                        PS.radius(currx, curry, PS.DEFAULT);
                        PS.scale(currx, curry, PS.DEFAULT);
                    }
                    else if (PS.data(currx, curry, PS.CURRENT) === 1)
                    {
                        //make the specific walls appear
                        PS.color(currx, curry, GAME.WALL_COLOR);
                        PS.borderColor(currx, curry, GAME.WALL_COLOR);
                        PS.border(currx, curry, PS.DEFAULT);
                        PS.radius(currx, curry, PS.DEFAULT);
                        PS.scale(currx, curry, PS.DEFAULT);
                    }
                    else if(PS.data(currx, curry, PS.CURRENT) === 2)
                    {
                        // Make the powerups
                        PS.color(currx, curry, GAME.PLAYER_COLOR);
                        PS.radius(currx, curry, 50);
                        PS.border(currx, curry, PS.DEFAULT);
                        PS.scale(currx, curry, 50);
                        PS.borderColor(currx, curry, GAME.BACKGROUND_COLOR);
                    }
                    else if(PS.data(currx, curry, PS.CURRENT) === 0)
                    {
                        // Color in the background
                        PS.color(currx, curry, GAME.BACKGROUND_COLOR);
                        PS.borderColor(currx, curry, GAME.BACKGROUND_COLOR);
                        PS.radius(currx, curry, PS.DEFAULT);
                        PS.border(currx, curry, PS.DEFAULT);
                        PS.scale(currx, curry, PS.DEFAULT);
                    }
                }
            }
       // }
    },

    // Function to reset a level to its initial state
    ResetLevel : function()
    {
        if((GAME.timer != "") || GAME.isOver)
        {
            return;
        }
        PS.color( GAME.playerx, GAME.playery, GAME.BACKGROUND_COLOR); // make player disappear
        PS.scale(GAME.playerx, GAME.playery, PS.DEFAULT);
        PS.radius(GAME.playerx, GAME.playery, PS.DEFAULT);
        //reset camera angle
        GAME.camera_cursor_y = 0;
        GAME.camera_cursor_x = 0;

        // Reset the player's position
        GAME.playerx = 3;
        GAME.playery = 3;

        // Reset the player's powerup status
        GAME.playerScale = 50;
        GAME.canBreak = false;
        GAME.playerRound = 0;

        // Re-initialize the level
        GAME.SetLevelDataInit(currLev);
        PS.fade(PS.ALL, PS.ALL, 30);
        PS.borderFade(PS.ALL, PS.ALL, 30);
        GAME.timer = PS.timerStart(40, GAME.tick);
        GAME.canMove = false;
        GAME.DrawMap();
        PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
        PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);

    },
    tick : function()
    {
        PS.fade(PS.ALL, PS.ALL, PS.DEFAULT);
        PS.borderFade(PS.ALL, PS.ALL, PS.DEFAULT);
        PS.timerStop(GAME.timer);
        GAME.timer = "";
        GAME.canMove = true;

    },

    track1Loader( data )
    {
      GAME.SONG1 = data.channel;
    },

    track2Loader( data )
    {
        GAME.SONG2 = data.channel;
    },

    track3Loader( data )
    {
        GAME.SONG3 = data.channel;
    },

    track4Loader( data )
    {
        GAME.SONG4 = data.channel;
    },

    tickEnd : function()
    {

        PS.timerStop(GAME.endTime);
        PS.audioPlay("Outside_the_boxend", {
            fileTypes : ["wav"],
            path : "Sounds/",
            loop : 0,
            volume : 1.0, } );
        PS.statusFade(600);
        PS.statusColor(PS.DEFAULT)


    },
    end : function()
    {
        PS.fade(PS.ALL, PS.ALL, 60);
        PS.gridFade(60);
        GAME.canMove = false;
        PS.color(PS.ALL, PS.ALL, GAME.BACKGROUND_COLOR);
        PS.borderColor(PS.ALL, PS.ALL, GAME.BACKGROUND_COLOR);
        PS.gridColor(GAME.BACKGROUND_COLOR);
        PS.gridShadow(false);
        GAME.endTime = PS.timerStart(40, GAME.tickEnd);

        PS.audioFade(GAME.SONG4, PS.CURRENT, 0.0);
        PS.statusColor(GAME.BACKGROUND_COLOR);

    }
};

PS.init = function( system, options ) {
    "use strict"; // Do not remove this directive!

    //grid color and size
    PS.gridSize( 16, 16 );
    PS.gridColor(GAME.BACKGROUND_COLOR);
    PS.color(PS.ALL, PS.ALL, GAME.BACKGROUND_COLOR);
    PS.borderColor(PS.ALL, PS.ALL, GAME.BACKGROUND_COLOR);
    PS.gridShadow(true, PS.COLOR_GRAY);

    //game title
    PS.statusText( "Outside The Box" );

    // Put each map into the array of maps
    GAME.maps[0] = GAME.map0;
    GAME.trackingMaps[0] = Array.from(GAME.maps[0]);
    GAME.maps[1] = GAME.map1;
    GAME.trackingMaps[1] = Array.from(GAME.maps[1]);
    GAME.maps[2] = GAME.map2;
    GAME.trackingMaps[2] = Array.from(GAME.maps[2]);
    GAME.maps[3] = GAME.map4;
    GAME.trackingMaps[3] = Array.from(GAME.maps[3]);
    GAME.maps[4] = GAME.map5;
    GAME.trackingMaps[4] = Array.from(GAME.maps[4]);
    GAME.maps[5] = GAME.map3;
    GAME.trackingMaps[5] = Array.from(GAME.maps[5]);
    GAME.maps[6] = GAME.map6;
    GAME.trackingMaps[6] = Array.from(GAME.maps[6]);
    GAME.maps[7] = GAME.map7;
    GAME.trackingMaps[7] = Array.from(GAME.maps[7]);
    GAME.maps[8] = GAME.map8;
    GAME.trackingMaps[8] = Array.from(GAME.maps[8]);
    GAME.maps[9] = GAME.map9;
    GAME.trackingMaps[9] = Array.from(GAME.maps[9]);


    //draw map and start on level 0
    GAME.SetLevelDataInit(currLev);
    GAME.DrawMap();

    PS.color(GAME.playerx, GAME.playery, GAME.PLAYER_COLOR);
    PS.scale(GAME.playerx, GAME.playery, GAME.playerScale);
    GAME.SONG1 = PS.audioPlay("Outside_the_box1", {
        fileTypes : ["wav"],
        path : "Sounds/",
        loop : 1,
        onLoad : GAME.track1Loader,
        volume : 1.0, } );
    GAME.SONG2 = PS.audioPlay("Outside_the_box2", {
        fileTypes : ["wav"],
        path : "Sounds/",
        loop : 1,
        onLoad : GAME.track2Loader,
        volume : 0.0, } );
    GAME.SONG3 = PS.audioPlay("Outside_the_box3", {
        fileTypes : ["wav"],
        path : "Sounds/",
        loop : 1,
        onLoad : GAME.track3Loader,
        volume : 0.0, } );
    GAME.SONG4 = PS.audioPlay("Outside_the_box4", {
        fileTypes : ["wav"],
        path : "Sounds/",
        loop : 1,
        onLoad : GAME.track4Loader,
        volume : 0.0, } );

};



/*
PS.touch ( x, y, data, options )
Called when the left mouse button is clicked over bead(x, y), or when bead(x, y) is touched.
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.touch() event handler:

/*

PS.touch = function( x, y, data, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line
   // to inspect x/y parameters:

   // PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

   // Add code here for mouse clicks/touches
   // over a bead.
};

*/

/*
PS.release ( x, y, data, options )
Called when the left mouse button is released, or when a touch is lifted, over bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.release() event handler:

/*

PS.release = function( x, y, data, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to inspect x/y parameters:

   // PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

   // Add code here for when the mouse button/touch is released over a bead.
};

*/

/*
PS.enter ( x, y, button, data, options )
Called when the mouse cursor/touch enters bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.enter() event handler:

/*

PS.enter = function( x, y, data, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to inspect x/y parameters:

   // PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

   // Add code here for when the mouse cursor/touch enters a bead.
};

*/

/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits bead(x, y).
This function doesn't have to do anything. Any value returned is ignored.
[x : Number] = zero-based x-position (column) of the bead on the grid.
[y : Number] = zero-based y-position (row) of the bead on the grid.
[data : *] = The JavaScript value previously associated with bead(x, y) using PS.data(); default = 0.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exit() event handler:

/*

PS.exit = function( x, y, data, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to inspect x/y parameters:

   // PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

   // Add code here for when the mouse cursor/touch exits a bead.
};

*/

/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.exitGrid() event handler:

/*

PS.exitGrid = function( options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to verify operation:

   // PS.debug( "PS.exitGrid() called\n" );

   // Add code here for when the mouse cursor/touch moves off the grid.
};

*/

/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyDown() event handler:



PS.keyDown = function( key, shift, ctrl, options ) {
    "use strict"; // Do not remove this directive!
    switch( key ) {
        case PS.KEY_ARROW_UP:
        case 87:
        case 119: {

            GAME.movePlayer(0, -1);
            break;
        }
        case PS.KEY_ARROW_RIGHT:
        case 68:
        case 100: {
            GAME.movePlayer(1, 0);
            break;
        }
        case PS.KEY_ARROW_DOWN:
        case 83:
        case 115: {
            GAME.movePlayer(0, 1);
            break;
        }
        case PS.KEY_ARROW_LEFT:
        case 65:
        case 97: {
            GAME.movePlayer(-1, 0);
            break;
        }
        case 13: // Enter
        case 32: // Space
            if(!GAME.isOver)
            {
                GAME.ResetLevel();
            }
    }
    // Uncomment the following code line to inspect first three parameters:

    // PS.debug( "PS.keyDown(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

    // Add code here for when a key is pressed.
};



/*
PS.keyUp ( key, shift, ctrl, options )
Called when a key on the keyboard is released.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.keyUp() event handler:

/*

PS.keyUp = function( key, shift, ctrl, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to inspect first three parameters:

   // PS.debug( "PS.keyUp(): key=" + key + ", shift=" + shift + ", ctrl=" + ctrl + "\n" );

   // Add code here for when a key is released.
};

*/

/*
PS.input ( sensors, options )
Called when a supported input device event (other than those above) is detected.
This function doesn't have to do anything. Any value returned is ignored.
[sensors : Object] = A JavaScript object with properties indicating sensor status; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: Currently, only mouse wheel events are reported, and only when the mouse cursor is positioned directly over the grid.
*/

// UNCOMMENT the following code BLOCK to expose the PS.input() event handler:

/*

PS.input = function( sensors, options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code lines to inspect first parameter:

//  var device = sensors.wheel; // check for scroll wheel
//
//  if ( device ) {
//    PS.debug( "PS.input(): " + device + "\n" );
//  }

   // Add code here for when an input event is detected.
};

*/

/*
PS.shutdown ( options )
Called when the browser window running Perlenspiel is about to close.
This function doesn't have to do anything. Any value returned is ignored.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
NOTE: This event is generally needed only by applications utilizing networked telemetry.
*/

// UNCOMMENT the following code BLOCK to expose the PS.shutdown() event handler:

/*

PS.shutdown = function( options ) {
   "use strict"; // Do not remove this directive!

   // Uncomment the following code line to verify operation:

   // PS.debug( "“Dave. My mind is going. I can feel it.”\n" );

   // Add code here to tidy up when Perlenspiel is about to close.
};

*/
