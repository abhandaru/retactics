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