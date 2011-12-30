function TacticsPlayer(game, preferences) {
  /* game management */
  this.board = game.board;
  this.currentTurn = false;	

  /* player profile */
  this.id = preferences.id;
  this.username = preferences.username;
  this.formation = new Formation(game, preferences.formation);
  this.color = preferences.color;

  /* stats */
  this.rating = preferences.rating;
  this.wins = preferences.wins;
  this.losses = preferences.losses;
  this.ties = preferences.ties;
 
  /* display */
  this.element = null;

  /* init methods */
  var initDOM = function(player) {
    var $player = $('<div />').addClass('TacticsPlayer')
      .append($('<div />').addClass('username').html(player.username+' ')
        .append($('<span />').addClass('rating').html('('+player.rating+')'))
      );
	var $stats = $('<div />').addClass('stats')
      .append($('<div />').addClass('wins').text('Wins: ' + player.wins))
      .append($('<div />').addClass('losses').text('Losses: ' + player.losses))
      .append($('<div />').addClass('ties').text('Ties: ' + player.ties));
    $player.append($stats);
    return $player;
  }
  this.element = initDOM(this);
}