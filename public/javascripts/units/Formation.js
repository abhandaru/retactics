/*
Assassin -> Lilith, Emissary of Dirac
Knight -> Sevan, Heaven's Blade
Cleric -> Esme, High Priestess
Mud -> Nazgul, Veiled Inquisitor
Dark Witch -> Avatar of Gloom
Pyro -> Amar'e, Embers Eternal
Scout -> Arion, Fiend Hunter
Furgon -> Aterra, Grove Sentinel
Frost -> Phendrana, Frost Eidelon
LW -> Obelisk of Fury
BW -> Obelisk of Sanctuary
BR -> Avii, Horror of Longinus
*/

function Formation(game, unitList) {
  this.units = null;
  
  /* init methods */
  var initUnits = function() {
	var units = new Array();
    $.each(unitList, function(i, unitPos) {
	  var unit = eval('new '+unitPos.type+'(game,'+unitPos.row+','+unitPos.col+')');
	  units.push(unit);
    });
    return units;
  }
  this.units = initUnits();
}