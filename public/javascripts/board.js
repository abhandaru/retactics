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

function TacticsBoardTile(game, size, chip, row, col) {
  /* instance variables */
  this.game = game;
  this.row = row;
  this.col = col;
  this.isValid = false;
  this.element = null;
  this.unit = null;

  /* init methods */
  var isValidTile = function() {
    /* get distance cut-offs from corners */
    var topLeft = (row + col) < chip;
    var bottomLeft = ((size - 1 - row) + col) < chip;
    var topRight = (row + (size - 1 - col)) < chip;
    var bottomRight = ((size - 1 - col) + (size - 1 - row)) < chip;
    if(topLeft || bottomLeft || topRight || bottomRight)
      return false;
    return true;
  }
  var initDOM = function(tile) {
    var $tile = $('<div />')
      .addClass('TacticsBoardTile')
      .addClass((tile.isValid) ? 'valid' : 'invalid')
      .css('left', BOARD_LEFT + BOARD_TILE_SIZE * col)
      .css('top', BOARD_TOP + BOARD_TILE_SIZE * row)
      .css('z-index', row + col)
      .attr('title', '('+row+','+col+')')
      .click(function() { clickTileHandler(tile); });
    return $tile;
  }
  this.isValid = isValidTile();
  this.element = initDOM(this);

  /* event handlers */
  var clickTileHandler = function(tile) {
	var optionMove = tile.element.hasClass(OPTION_MOVE);
	var optionAttack = tile.element.hasClass(OPTION_ATTACK);
	var shouldDeselect = !tile.isValid || (!tile.unit && !optionMove && !optionAttack);
    var shouldSelectUnit = tile.unit && !optionAttack && !optionMove;
	if(shouldDeselect) {
	  tile.game.deselectUnit();
	} else if(shouldSelectUnit) {
	  tile.game.selectUnit(tile.unit);
	} else if(optionMove) {
	  tile.game.selectedUnit.doMove(tile.row, tile.col);
	} else if(optionAttack) {
	  tile.game.selectedUnit.doAttack(tile.row, tile.col);
	}
  }
}