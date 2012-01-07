/*
 * constants and paramenters
 */

/* path names */
var PUBLIC = '../';

/* turn phases */
var TURN_MOVE = 1;
var TURN_ATTACK = 2;
var TURN_DIR = 3;
var TURN_WAIT = 4; 

/* directions */
var DIR_UP = 'up';
var DIR_DOWN = 'down';
var DIR_RIGHT = 'right';
var DIR_LEFT = 'left';
var DIR_BUTTON_SIZE = 20;

/* cell highlighting */
var OPTION_ATTACK = 'optionAttack';
var OPTION_MOVE = 'optionMove';
var OPTION_TURN = 'optionTurn';

/* unit colors */
var UNIT_GREEN = 'green';
var UNIT_ORANGE = 'orange';

/* board formatting */
var BOARD_TOP = 145;
var BOARD_LEFT = 120;
var BOARD_TILE_SIZE = 40;

/* test data */
var aduPlayer = { // will be loaded via JSON later
  id: 1,
  username: 'adu',
  rating: 960,
  wins: 42,
  losses: 2,
  ties: 1,
  formation: [
    {type: 'KnightUnit', row: 1, col: 1},
    {type: 'AssassinUnit', row: 6, col: 5},
    {type: 'KnightUnit', row: 6, col: 6}
  ],
  color: UNIT_GREEN
}
var nubPlayer = {
  id: 2,
  username: 'nubber',
  rating: 730,
  wins: 17,
  losses: 22,
  ties: 1,
  formation: [
    {type: 'KnightUnit', row: 3, col: 9},
    {type: 'KnightUnit', row: 4, col: 10}
  ],
  color: UNIT_ORANGE
}