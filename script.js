const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
const gridSize = 70;
let color = "red";

window.addEventListener("load", ()=>{
	canvas.width = 490;
	canvas.height = 530;
	ctx.setLineDash([5, 3]);
	drawGrid();
});

function drawGrid(){
	for(var i =0; i<7; i++){
		for(var j = 0; j<7; j++){
			ctx.strokeRect(j*gridSize, i*gridSize+40, gridSize, gridSize);
		}
	}
}

function drawCircle(x, y, radius, color){
	ctx.setLineDash([1,0]);
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
	console.log("hello");
}

function showCircleAboveGrid(x){

	if(0<x && x<70){
		clearTopRow();
		drawCircle(35, 20, 20, color);
	} else if(70<x && x<140){
		clearTopRow();
		drawCircle(105, 20, 20, color);
	} else if(140<x && x<210){
		clearTopRow();
		drawCircle(175, 20, 20, color);
	} else if(210<x && x<280){
		clearTopRow();
		drawCircle(245, 20, 20, color);
	} else if(210<x && x<280){
		clearTopRow();
		drawCircle(245, 20, 20, color);
	} else if(280<x && x<350){
		clearTopRow();
		drawCircle(315, 20, 20, color);
	} else if(350<x && x<420){
		clearTopRow();
		drawCircle(385, 20, 20, color);
	} else if(420<x && x<490){
		clearTopRow();
		drawCircle(455, 20, 20, color);
	} else{clearTopRow();}

}

function clearTopRow(){
	ctx.clearRect(0, 0, canvas.width, 40);
}

function draw(){

}

window.addEventListener("mousemove", (event)=>{
	var rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left
	showCircleAboveGrid(x);
});

setInterval(draw, 1000/15);