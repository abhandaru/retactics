function KnightUnit(player, row, col) {
  /* constant properties */
  this.name            = 'Knight';
  this.maxHealth       = 50;
  this.power           = 22;
  this.armor           = 25;
  this.movement        = 3;
  this.maxWait         = 1;
  this.blocking        = 80;
  this.attacks         = [ { row: -1, col:  0 }, { row:  0, col:  1 },
                           { row:  1, col:  0 }, { row:  0, col: -1 } ];
  this.attackPattern   = [ { row:  0, col:  0 } ];
  this.attackBlockable = true;
  this.stepsAside      = true;
  this.teleport        = false;

  /* generic initialization */
  this.health = this.maxHealth;
  this.setPlayer(player);
  this.initDOM();
  this.initTile(row, col);
}