$(document).ready(function() {
  var pathname = window.location.pathname;
  var branch = (pathname.split('/'))[1];
  switch(branch) {
	case 'lobby': initLobby();
	case 'arena': initArena();
  }
});