/* relate all models */
KnightUnit.prototype = new TacticsUnit();
AssassinUnit.prototype = new TacticsUnit();

/* initialize */
$(document).ready(function() {
  var pathname = window.location.pathname;
  var branch = (pathname.split('/'))[1];
  switch(branch) {
	case 'lobby': initLobby();
	case 'arena': initArena();
  }
});