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