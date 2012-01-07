function AssassinUnit(player, row, col) {
  /* constant properties */
  this.name            = 'Assassin';
  this.maxHealth       = 35;
  this.power           = 18;
  this.armor           = 12;
  this.movement        = 4;
  this.maxWait         = 1;
  this.blocking        = 70;
  this.attacks         = [ { row: -1, col:  0 }, { row:  0, col:  1 },
                           { row:  1, col:  0 }, { row:  0, col: -1 } ];
  this.attackPattern   = [ { row: -1, col:  0 }, { row:  0, col:  1 },
						   { row:  1, col:  0 }, { row:  0, col: -1 } ];
  this.attackBlockable = true;
  this.stepsAside      = true;
  this.teleport        = false;

  /* generic initialization */
  this.health = this.maxHealth;
  this.setPlayer(player);
  this.initDOM();
  this.initTile(row, col);
  
  /* method overrides */
  this.doAttack = function(row, col) {
    var turn = this.game.currentTurn;
    this.game.deselectUnit();
    /* attack all tiles in attack pattern */
    var attackerDir = this.getVectorDirection(this, {row: row, col: col});
    this.setDirection(attackerDir);
    var unit = this; // scope issues
    $.each(this.attackPattern, function(i, attack) {
      var tile = unit.board.getTile(attack.row + unit.row, attack.col + unit.col);
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
}