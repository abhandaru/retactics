var game = null;
$(document).ready(function() {
  var $gameContainer = $('body');

  game = new TacticsGame();
  game.addPlayer(aduPlayer);
  game.addPlayer(nubPlayer);
  game.start();

  $gameContainer.append(game.element);
  $gameContainer.append($('<div />').addClass('break'));
  console.log(game);
});
