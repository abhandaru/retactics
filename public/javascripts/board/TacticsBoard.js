function TacticsBoard(game, size, chip) {
  /* instance variables */
  this.size = size;
  this.chip = chip;
  this.element = null;
  this.game = game;
  this.board = null;

  /* init methods */
  var initDOM = function() {
    var $board = $('<div />').addClass('TacticsBoard');
    return $board;	
  }
  var initBoard = function($board) {
	var board = new Array(size);
	for(var i = 0; i < size; i++) {
	  board[i] = new Array(size);
	  for(var j = 0; j < size; j++) {
	    board[i][j] = new TacticsBoardTile(game, size, chip, i, j);
	    $board.append(board[i][j].element);
	  }
	}	
	return board;
  }
  this.element = initDOM();
  this.board = initBoard(this.element);

  /* public methods */
  this.getTile = function(row, col) {
	if(row < 0 || row >= this.size) return null;
	if(col < 0 || col >= this.size) return null;
    return this.board[row][col];	
  }
  this.canOccupy = function(row, col) {
    var tile = this.getTile(row, col);
    if(!tile) return false;
    if(!tile.isValid) return false;
    if(tile.unit) return false;
    return true;	
  }
}