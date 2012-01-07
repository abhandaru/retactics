function TacticsUnit() {

  /* gameplay properties */
  this.alive = true;
  this.health = 0;
  this.blockingMod = 0;
  this.wait = 0;
  this.direction = DIR_RIGHT;
  this.isFocused = false;
  this.isParalyzed = false;

  /* game management */
  this.element = null;
  this.tile = null;

  /* init methods */
  var initDOM = function(unit) {
	var $unit = $('<div />').addClass('TacticsUnit')
	  .addClass('KnightUnit');
	var $direction = $('<div />').addClass('direction')
	  .addClass(unit.direction);
	$unit.append($direction);
	return $unit;
  }
  var initTile = function(unit) {
	var tile = unit.board.getTile(row, col);
	tile.element.append(unit.element);
	tile.unit = unit;
	return tile;
  }
  var initAttacks = function() {
    var attacks	= [
      { row: -1, col:  0 },
      { row:  0, col:  1 },
      { row:  1, col:  0 },
      { row:  0, col: -1 }
    ];
    return attacks;
  }
  var initAttackPattern = function() {
    var pattern = [
      { row: 0, col: 0 }
    ];
    return pattern;
  }
  this.element = initDOM(this);
  this.tile = initTile(this);
  this.attacks = initAttacks();
  this.attackPattern = initAttackPattern();

  /* private methods */
  var isPassable = function(unit, i, j) {
	var otherUnit = unit.board.getTile(i, j).unit;
	if(!otherUnit) return true;
	else if(otherUnit.owner != unit.owner) return false;
	else if(otherUnit.stepsAside) return true;
    else return false;
  }
  var findMoves = function(unit, distance, i, j) {
	var legalMoves = new Array();
	var isOrigin = (i == unit.row && j == unit.col);
	if(distance > unit.movement) return legalMoves;
	if(!unit.board.canOccupy(i, j) && !isOrigin) return legalMoves;
    legalMoves = legalMoves.concat(findMoves(unit, distance+1, i-1, j));
    legalMoves = legalMoves.concat(findMoves(unit, distance+1, i, j+1));
    legalMoves = legalMoves.concat(findMoves(unit, distance+1, i+1, j));
    legalMoves = legalMoves.concat(findMoves(unit, distance+1, i, j-1));
    if(!isOrigin) legalMoves.push({row: i, col: j});
    return legalMoves;
  }
  var generateLegalMoves = function(unit) {
	var distance = 0;
	var legalMoves = findMoves(unit, distance, unit.row, unit.col);
	return legalMoves;	
  }
  var generateLegalAttacks = function(unit) {
    var legalAttacks = new Array();
    $.each(unit.attacks, function(i, attack) {
	  var tile = unit.board.getTile(unit.row + attack.row, unit.col + attack.col);
	  if(tile && tile.isValid)
	    legalAttacks.push({ row: tile.row, col: tile.col });
    });
    return legalAttacks;
  }
  var showLegalMoves = function(unit) {
    var legalMoves = generateLegalMoves(unit);
    $.each(legalMoves, function(i, move) {
	  unit.board.getTile(move.row, move.col).element.addClass(OPTION_MOVE);
    });
  }
  var hideLegalMoves = function(unit) {
	unit.board.element
	  .children('.TacticsBoardTile')
	  .removeClass(OPTION_MOVE);	
  }
  var showLegalAttacks = function(unit) {
    var legalAttacks = generateLegalAttacks(unit);
    $.each(legalAttacks, function(i, attack) {
	  unit.board.getTile(attack.row, attack.col).element.addClass(OPTION_ATTACK);
    });
  }
  var hideLegalAttacks = function(unit) {
	unit.board.element
	  .children('.TacticsBoardTile')
	  .removeClass(OPTION_ATTACK);
  }
  var showTurns = function(unit) {
	var $unit = unit.element;
    var unitX = BOARD_LEFT + unit.col * BOARD_TILE_SIZE;
    var unitY = BOARD_TOP + unit.row * BOARD_TILE_SIZE;	
    var $rightArr = $('<div />').addClass(DIR_RIGHT)
      .css('left', unitX+35).css('top', unitY+10).attr('data', DIR_RIGHT);
    var $leftArr = $('<div />').addClass(DIR_LEFT)
      .css('left', unitX-15).css('top', unitY+10).attr('data', DIR_LEFT);
    var $upArr = $('<div />').addClass(DIR_UP)
      .css('left', unitX+10).css('top', unitY-15).attr('data', DIR_UP);
    var $downArr = $('<div />').addClass(DIR_DOWN)
      .css('left', unitX+10).css('top', unitY+35).attr('data', DIR_DOWN);
    var $turns = $('<div />').addClass(OPTION_TURN)
      .append($rightArr)
      .append($leftArr)
      .append($upArr)
      .append($downArr);
    $turns.children().click(function() {
	  unit.doTurn($(this).attr("data"));
    });
    unit.board.element.append($turns);
  }
  var hideTurns = function(unit) {
	var $turnOptions = unit.board.element.find('.' + OPTION_TURN);
    $turnOptions.remove();
  }
  var getOriginDirection = function(origin, dest) {
	var dx = dest.col - origin.col;
	var dy = dest.row - origin.row;
	var newDir = DIR_RIGHT;
	if(Math.abs(dy) > Math.abs(dx)) {
	  if(dy > 0) newDir = DIR_DOWN;
	  else newDir = DIR_UP; 
	} else if(Math.abs(dy) < Math.abs(dx)) {
	  if(dx > 0) newDir = DIR_RIGHT;
	  else newDir = DIR_LEFT;
	} else { //on a diagonal
	  if(dx > 0 && dy < 0
	    && origin.direction != DIR_RIGHT && origin.direction != DIR_UP)
	    newDir = DIR_RIGHT;
	  else if(dx > 0 && dy > 0
	    && origin.direction != DIR_RIGHT && origin.direction != DIR_DOWN)
        newDir = DIR_RIGHT;
	  else if(dx < 0 && dy < 0
	    && origin.direction != DIR_LEFT && origin.direction != DIR_UP)
	    newDir = DIR_LEFT;
	  else if(dx < 0 && dy > 0
	    && origin.direction != DIR_LEFT && origin.direction != DIR_DOWN)
	    newDir = DIR_LEFT;
	}
	return newDir;	
  }

  /* public methods */
  this.showOptions = function() {
	if(this.wait > 0) return false;
	if(this.isParalyzed) return false;
	var turn = this.game.currentTurn;
	var phase = turn.phase;
	if(turn.unit && turn.unit != this) return false;
	if(phase == TURN_MOVE && !turn.hasMoved) showLegalMoves(this);
	else if(phase == TURN_ATTACK && !turn.hasAttack) showLegalAttacks(this);
	else if(phase == TURN_DIR && !turn.hasTurned) showTurns(this);
	return true;
  }
  this.hideOptions = function() {
	hideLegalMoves(this);
    hideLegalAttacks(this);
    hideTurns(this);
  }
  this.setTile = function(row, col) {
    this.element.detach();
    this.row = row;
    this.col = col;
    this.tile.unit = null;
    this.tile = this.board.getTile(row, col);
    this.tile.element.append(this.element);
    this.tile.unit = this;
  }
  this.doMove = function(row, col) {
	var unitPos = { row: this.row, col: this.col };
	var turn = this.game.currentTurn;
	this.game.deselectUnit();
	this.setTile(row, col);
	/* update turn object */
	turn.unit = this;
	turn.unitPos = unitPos;
	turn.hasMoved = {row: row, col: col};
	/* move to next phase */
	if(turn.hasAttacked) turn.phase = TURN_DIR;
	else turn.phase = TURN_ATTACK;
	this.game.selectUnit(this);
  }
  this.receiveHit = function(that) {
	/* do the damage */
	var power = that.power;
	var adjDamage = Math.round(power * (1 - this.armor/100));
    var newHealth = Math.max(this.health - adjDamage, 0);
	var blockable = that.attackBlockable;
	if(blockable) {
	  /* var randPercent = Math.random() * 100;
	  var atkDir = getOriginDirection(this, that);
	  var adjBlocking = this.blocking;
	  if(atkDir !=)
	  if(adjBlocking > randPercent) {
		
	  } else {
	    this.health = newHealth;
	  }*/
	  this.health = newHealth;
    } else {
	  this.health = newHealth;
    }
    if(this.health == 0) this.doDeath(that);
  }
  this.doDeath = function(attacker) {
	//can do different death animations based on attacker
	this.alive = false;
	this.health = 0;
	this.tile.unit = null;
	this.element.fadeOut(2000, function() {
	  $(this).remove();
	});
  }
  this.doAttack = function(row, col) {
	var unit = this;
	var turn = unit.game.currentTurn;
	unit.game.deselectUnit();
	/* attack all tiles in attack pattern */
    var attackerDir = getOriginDirection(unit, {row: row, col: col});
    unit.setDirection(attackerDir);
	$.each(unit.attackPattern, function(i, attack) {
	  var tile = unit.board.getTile(attack.row + row, attack.col + col);
	  if(tile && tile.unit) {
	    tile.unit.receiveHit(unit);
	  }	
	});
	/* update turn object */
	turn.unit = unit;
    turn.hasAttacked = {row: row, col: col};
	/* move to next phase */
	if(turn.hasMoved) turn.phase = TURN_DIR;
	else turn.phase = TURN_MOVE;
	unit.game.selectUnit(unit);
  }
  this.setDirection = function(direction) {
	this.direction = direction;
	var $direction = this.element.find('.direction');
	$direction.removeClass(DIR_RIGHT)
	  .removeClass(DIR_LEFT)
	  .removeClass(DIR_UP)
	  .removeClass(DIR_DOWN);
	$direction.addClass(direction);
  }
  this.doTurn = function(direction) {
	var turn = this.game.currentTurn;
	this.game.deselectUnit();
    this.setDirection(direction);
	/* update turn object */
	turn.unit = this;
	turn.hasTurned = direction;
	turn.phase = TURN_WAIT;
	turn.endTurn();
  }
}