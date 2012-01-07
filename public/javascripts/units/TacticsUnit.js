function TacticsUnit() {

  /* initial properties */
  this.blockingMod     = 0;
  this.wait            = 0;
  this.direction       = DIR_RIGHT;
  this.isFocused       = false;
  this.isParalyzed     = false;

  /* generics initialized by subclasses */
  this.tile            = null;
  this.player          = null;
  this.game            = null;
  this.board           = null;
  this.element         = null;
}

/* generic initialization */
TacticsUnit.prototype.setPlayer = function(player) {
  this.player = player;
  this.game = player.game;
  this.board = this.game.board;
}
TacticsUnit.prototype.initTile = function(row, col) {
  this.row = row;
  this.col = col;
  var tile = this.board.getTile(this.row, this.col);
  tile.element.append(this.element);
  tile.unit = this;
  this.tile = tile;
}
TacticsUnit.prototype.initDOM = function() {
  var $unit = $('<div />').addClass('TacticsUnit')
    .addClass(this.name + 'Unit')
    .css('background', '#FFF url('+PUBLIC+'images/units/'+this.name+'-front.jpg) top left no-repeat');
  var $direction = $('<div />').addClass('direction')
    .addClass(this.direction);
  $unit.append($direction);
  this.element = $unit; 
}

/* internal methods */
TacticsUnit.prototype.setTile = function(row, col) {
  this.element.detach();
  this.row = row;
  this.col = col;
   this.tile.unit = null;
  this.tile = this.board.getTile(row, col);
  this.tile.element.append(this.element);
  this.tile.unit = this;
}
TacticsUnit.prototype.isPassable = function(i, j) {
  var otherUnit = this.board.getTile(i, j).unit;
  if(!otherUnit) return true;
  else if(otherUnit.player.id != this.player.id) return false;
  else if(otherUnit.stepsAside) return true;
  else return false;
}
TacticsUnit.prototype.findMoves = function(distance, i, j) {
  var legalMoves = new Array();
  var isOrigin = (i == this.row && j == this.col);
  if(distance > this.movement) return legalMoves;
  if(!this.board.canOccupy(i, j) && !isOrigin) return legalMoves;
  legalMoves = legalMoves.concat(this.findMoves(distance+1, i-1, j));
  legalMoves = legalMoves.concat(this.findMoves(distance+1, i, j+1));
  legalMoves = legalMoves.concat(this.findMoves(distance+1, i+1, j));
  legalMoves = legalMoves.concat(this.findMoves(distance+1, i, j-1));
  if(!isOrigin) legalMoves.push({row: i, col: j});
  return legalMoves;
}
TacticsUnit.prototype.generateLegalMoves = function() {
  var legalMoves = this.findMoves(0, this.row, this.col);
  return legalMoves;	
}
TacticsUnit.prototype.generateLegalAttacks = function() {
  var legalAttacks = new Array();
  var unit = this; // scope issues
  $.each(this.attacks, function(i, attack) {
	var tile = unit.board.getTile(unit.row + attack.row, unit.col + attack.col);
    if(tile && tile.isValid)
      legalAttacks.push({ row: tile.row, col: tile.col });
  });
  return legalAttacks;
}
TacticsUnit.prototype.showLegalMoves = function() {
  var legalMoves = this.generateLegalMoves();
  var unit = this; // scope issues
  $.each(legalMoves, function(i, move) {
    unit.board.getTile(move.row, move.col).element.addClass(OPTION_MOVE);
  });
}
TacticsUnit.prototype.hideLegalMoves = function() {
  this.board.element
	.children('.TacticsBoardTile')
	.removeClass(OPTION_MOVE);	
}
TacticsUnit.prototype.showLegalAttacks = function() {
  var legalAttacks = this.generateLegalAttacks();
  var unit = this; // scope issues
  $.each(legalAttacks, function(i, attack) {
	unit.board.getTile(attack.row, attack.col).element.addClass(OPTION_ATTACK);
  });
}
TacticsUnit.prototype.hideLegalAttacks = function() {
  this.board.element
   .children('.TacticsBoardTile')
   .removeClass(OPTION_ATTACK);
}
TacticsUnit.prototype.showTurns = function() {
  var unit = this;
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
TacticsUnit.prototype.hideTurns = function() {
  var $turnOptions = this.board.element.find('.' + OPTION_TURN);
  $turnOptions.remove();
}
TacticsUnit.prototype.getVectorDirection = function(origin, dest) {
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
TacticsUnit.prototype.showOptions = function() {
  if(this.wait > 0) return false;
  if(this.isParalyzed) return false;
  var turn = this.game.currentTurn;
  var phase = turn.phase;
  if(turn.unit && turn.unit != this) return false;
  if(phase == TURN_MOVE && !turn.hasMoved) this.showLegalMoves();
  else if(phase == TURN_ATTACK && !turn.hasAttack) this.showLegalAttacks();
  else if(phase == TURN_DIR && !turn.hasTurned) this.showTurns();
  return true;
}
TacticsUnit.prototype.hideOptions = function() {
  // just hide everything
  this.hideLegalMoves();
  this.hideLegalAttacks();
  this.hideTurns();
}
TacticsUnit.prototype.doMove = function(row, col) {
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
TacticsUnit.prototype.receiveHit = function(that) {
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
TacticsUnit.prototype.doDeath = function(attacker) {
  //can do different death animations based on attacker
  this.alive = false;
  this.health = 0;
  this.tile.unit = null;
  this.element.fadeOut(2000, function() {
    $(this).remove();
  });
}
TacticsUnit.prototype.doAttack = function(row, col) {
  var turn = this.game.currentTurn;
  this.game.deselectUnit();
  /* attack all tiles in attack pattern */
  var attackerDir = this.getVectorDirection(this, {row: row, col: col});
  this.setDirection(attackerDir);
  var unit = this; // scope issues
  $.each(this.attackPattern, function(i, attack) {
    var tile = unit.board.getTile(attack.row + row, attack.col + col);
    if(tile && tile.unit) {
      tile.unit.receiveHit(unit);
    }	
  });
  /* update turn object */
  turn.unit = this;
  turn.hasAttacked = {row: row, col: col};
  /* move to next phase */
  if(turn.hasMoved) turn.phase = TURN_DIR;
  else turn.phase = TURN_MOVE;
  this.game.selectUnit(this);
}
TacticsUnit.prototype.setDirection = function(direction) {
  this.direction = direction;
  var $direction = this.element.find('.direction');
  $direction
    .removeClass(DIR_RIGHT)
    .removeClass(DIR_LEFT)
    .removeClass(DIR_UP)
    .removeClass(DIR_DOWN);
  $direction.addClass(direction);
}
TacticsUnit.prototype.doTurn = function(direction) {
  var turn = this.game.currentTurn;
  this.game.deselectUnit();
  this.setDirection(direction);
  /* update turn object */
  turn.unit = this;
  turn.hasTurned = direction;
  turn.phase = TURN_WAIT;
  turn.endTurn();
}