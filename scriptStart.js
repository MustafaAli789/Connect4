const PvPButton = document.getElementById("PvP");
const PvCButton = document.getElementById("PvC");
var gameType = "pvp";

PvPButton.addEventListener("click", ()=>{
	gameType = "pvp";
	window.location.href = "connect4PvP.html";
});

PvCButton.addEventListener("click", ()=>{
	gameType="pvc";
	window.location.href = "connect4PvC.html";

});

