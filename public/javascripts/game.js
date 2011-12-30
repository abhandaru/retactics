function TacticsGame() {
  /* game parameters */
  var size = 11;
  var chip = 2;

  /* instance variables */
  this.board = new TacticsBoard(this, size, chip);
  this.players = new Array();
  this.element = null;
  this.selection = null;
  this.selectedUnit = null;
  this.information = null;

  /* turn management */
  this.turnStart = Math.round(Math.random());
  this.turnCount = 0;
  this.turns = new Array();
  this.currentTurn = null;
  this.moves = null;
  this.winner = null;

  /* init methods */
  var initDOM = function(board) {
    var $game = $('<div />').addClass('TacticsGame');
    $game.append(board.element);
    return $game;
  }
  var initSelection = function(game) {
	var $selection = $('<div />').addClass('Selection')
      .append($('<h1 />').text('Selection'));
    game.element.append($selection);
    return $selection;
  }
  var initMoves = function(game) {
    var $options = $('<div />').addClass('options')
      .append($('<a />').addClass('move').attr('href', '#')
        .text('move')
        .click(function() { game.currentTurn.switchToMove(); return false; }))
      .append($('<a />').addClass('attack').attr('href', '#')
        .text('attack')
        .click(function() { game.currentTurn.switchToAttack(); return false; }))
      .append($('<a />').addClass('turn').attr('href', '#')
        .text('turn')
        .click(function() { game.currentTurn.switchToTurn(); return false; }))
      .append($('<a />').addClass('pass').attr('href', '#')
        .text('pass')
        .click(function() { game.currentTurn.endTurn(); return false; }));
	var $moves = $('<div />').addClass('Moves')
	      .append($('<h1 />').text('Moves'))
	      .append($options)
	      .appendTo(game.element);
    return $moves;	
  }
  var initInformation = function(game) {
    var $info = $('<div />').addClass('Information')
      .append($('<h1 />').text('Information'));
    game.element.append($info);
    return $info;
  }
  var unitStatusDOM = function(unit) {
	var $unitInfo = $('<div />')
      .addClass('UnitInfo')
      .append($('<div />').addClass('name')
        .text(unit.name+' ('+unit.row+', '+unit.col+')'))
      .append($('<div />').addClass('status')
        .html('Health: ' + unit.health + '<br />'
            + 'Wait: ' + unit.wait + ' turns<br />'
            + 'Blocking Mod: ' + ((unit.blockingMod < 0) ? '-' : '+') + unit.blockingMod + '<br />'));	
    return $unitInfo;
  }
  this.element = initDOM(this.board);
  this.selection = initSelection(this);
  this.moves = initMoves(this);
  this.information = initInformation(this);

  /* public methods */
  this.addPlayer = function(playerData) {
	var player = new TacticsPlayer(this, playerData);
    this.players.push(player);
    this.information.append(player.element);
  }
  this.selectUnit = function(unit) {
	/* clean up from old unit */
    this.deselectUnit();
	
	/* do new unit */
    this.selectedUnit = unit;
    var $unitInfo = unitStatusDOM(unit);
    this.selection.append($unitInfo);
    unit.showOptions();
  }
  this.deselectUnit = function() {
	if(this.selectedUnit) { 
	  this.selectedUnit.hideOptions();
	}
	this.selection.children('.UnitInfo').remove();	
  }
  this.refreshSelection = function() {
    var selectedUnit = this.selectedUnit;
    if(selectedUnit) {
	  this.selectUnit(selectedUnit);
    }	
  }
  this.nextTurn = function() {
	/* clean up after previous turn */
	$.each(this.players, function(i, player) {
	  $.each(player.formation.units, function(j, unit) {
		if(unit.wait > 0) unit.wait--;
	  });
	});
	var oldTurn = this.currentTurn;
	if(oldTurn && oldTurn.unit) {
	  var unit = oldTurn.unit;
	  if(oldTurn.hasMoved) unit.wait += Math.floor(unit.maxWait/2);
	  if(oldTurn.hasAttacked) unit.wait += Math.ceil(unit.maxWait/2);
    }
    this.deselectUnit();
	/* do new turn */
	var turnNumber = ++this.turnCount;
	var currentPlayer = this.players[(turnNumber + this.turnStart) % this.players.length];
    var currentTurn = new TacticsTurn(this, turnNumber, currentPlayer);
    this.currentTurn = currentTurn;
    this.turns.push(currentTurn);
    var $turn = currentTurn.element;
    this.moves.children('.options').after($turn);
  }
  this.start = function() {
    this.nextTurn();
  }
}

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