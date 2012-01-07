function initArena() {
  var $gameContainer = $('#arena');
  if($gameContainer.length) {
	var game = new TacticsGame();
    game.addPlayer(aduPlayer);
    game.addPlayer(nubPlayer);
    game.start();

    $gameContainer.append(game.element);
    $gameContainer.append($('<div />').addClass('break'));
    console.log(game);
  }
}