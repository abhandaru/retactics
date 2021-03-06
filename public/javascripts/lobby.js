var $lobby = null;
function initLobby() {
  $lobby = $('#lobby');
  pingLobbyUpdates();
  setInterval("pingLobbyUpdates()", 5000);
}

function pingLobbyUpdates() {
  var date = new Date();
  var time = date.getTime();
  //console.log('['+time+'] checking for updates');
  $.getJSON('/lobby/updates/'+time+'.json', function(json) {
	updateLobbyOpenGames(json.open_games);
  });
}

function updateLobbyOpenGames(openGames) {
  var $openGames = $lobby.find('.open-games');
  if(!openGames || openGames.length == 0) {
	$openGames.html('No open games at this time.');
	return;
  }
  $openGames.html(drawLobbyGames(openGames));
}

function drawLobbyGames(games) {
  var $games = $('<div />').addClass('LobbyGames');
  $.each(games, function(i, gameObj) {
    var game = gameObj.game;
    $games.append(drawLobbyGame(game));
  })
  return $games;
}

function drawLobbyGame(game) {
  var $game = $('<div />').addClass('LobbyGame');
  var $title = $('<div />').addClass('LobbyGameTitle').html('<div class="label">Game</div> <div class="number">'+game.id+'</div>');
  var $players = $('<div />').addClass('LobbyGamePlayers');
  $.each(game.players, function(i, player) {
	var $player = $('<div />').addClass('LobbyGamePlayer')
	  .append('<div class="username"><a href="/players/'+player.id+'">'+player.username+'</a></div>')
	  .append('<div class="rating">('+player.rating+')</div>');
    $players.append($player);	
  });
  $game.append($title)
       .append($players)

  if(game.players.length < game.capacity) {
    var $join = $('<div />')
      .addClass('LobbyGameJoin')
      .append($('<a />').attr('href', '/join').text('+'));
    $game.append($join);	
  }

  $game.append($('<div />').addClass('break'));
  return $game;
}