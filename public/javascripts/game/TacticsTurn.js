function TacticsTurn(game, number, player) {
  /* instance variables */
  this.number = number;
  this.game = game;
  this.player = player;
  this.phase = TURN_MOVE;
  this.unit = null;
  this.unitPos = null;
  this.hasMoved = false;
  this.hasAttacked = false;
  this.hasTurned = false;
  this.finished = false;
  this.element = null;

  /* init methods */
  var initDOM = function(turn) {
    var $turn = $('<div />').addClass('TacticsTurn')
      .attr('id', 'TacticsTurn-' + turn.number);
    var $title = $('<div />').addClass('title')
      .text('Turn ' + turn.number + ' (' + turn.player.username + ')');
    var $status = $('<div />').addClass('status').text('In progress.');
    $turn.append($title).append($status);
    return $turn;	
  }
  this.element = initDOM(this);

  /* private methods */
  var updateStatusDOM = function(turn) {
    var $status = turn.element.find('.status');
    if(turn.noMoves)
      $status.html('Player made no moves.');
    else {
	  $status.html(turn.unit.name+' ('+turn.unitPos.row+','+turn.unitPos.col+')');
	  if(turn.hasMoved)
	    $status.append(' moves to ('+turn.hasMoved.row+','+turn.hasMoved.col+'), ');
	  if(turn.hasAttacked)
		$status.append(' attacks ('+turn.hasAttacked.row+','+turn.hasAttacked.col+'), ');
      if(turn.hasTurned)
      	$status.append(' turns '+turn.hasTurned+', ');
	  $status.append('end.');
    }	
  }

  /* public methods */
  this.endTurn = function() {
    this.finished = true;
    this.noMoves = (!this.unit) ? true : false;
    updateStatusDOM(this);
    this.game.nextTurn();
  }
  this.switchToMove = function() {
    if(this.hasMoved) return;
    this.phase = TURN_MOVE;
    this.game.refreshSelection();
  }
  this.switchToAttack = function() {
    if(this.hasAttacked) return;
    this.phase = TURN_ATTACK;
    this.game.refreshSelection();
  }
  this.switchToTurn = function() {
    if(this.hasTurned) return;
    this.phase = TURN_DIR;
    this.game.refreshSelection();
  }
}