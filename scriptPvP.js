const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
const gridSize = 70;
let turn = "red";
let grid = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0]];

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
}

//will show the circle when hovering at the top 
function showCircleAboveGrid(x){
	let xCoor = getColumn(x);
	clearTopRow();
	if(xCoor!=null){
		drawCircle(xCoor.x, 20, 20, turn); //color is stored in turn name
	}
}

//takes an x coordinate relative to the canvas and returns center + column num 
function getColumn(x){
	if(0<x && x<70){
		return {x: 35, column: 0};
	} else if(70<x && x<140){
		return {x:105, column: 1};
	} else if(140<x && x<210){
		return {x: 175, column: 2};
	} else if(210<x && x<280){
		return {x: 245, column: 3};
	} else if(280<x && x<350){
		return {x: 315, column: 4};
	} else if(350<x && x<420){
		return {x: 385, column: 5};
	} else if(420<x && x<490){
		return {x: 455, column: 6};
	} else {return null;}
}

function clearTopRow(){
	ctx.clearRect(0, 0, canvas.width, 40);
}

function getMouseXCoorRelativeToCanvas(){
	var rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	return x;
}

window.addEventListener("mousemove", (event)=>{
	let x = getMouseXCoorRelativeToCanvas(event);
	showCircleAboveGrid(x);
});

function drawCircleInColumn(row, columnNum){
	let y = row*70+75;
	let x = columnNum*70+35;
	drawCircle(x, y, 35, turn);
}

//will update the grid array and return the index if the column is valid
function addCircleToColumn(columnNum){
	let validSpot = false;
	for(var i = 6; i>=0; i--){
		if(grid[i][columnNum]===0){
			grid[i][columnNum]=turn;
			validSpot = true;
			return i;
		}
	}
	return -1;
}

function verifyWin(){

	let win = true;

	//checking each horizontal row
	for(var i = 0; i<7; i++){ //looping through rows
		for(var j = 0; j<4; j++){ //looping through column sets of 4
			win = true;
			for(var k =j; k<j+4;k++){ //looping through each column in set o 4
				if(grid[i][k]!=turn){win=false; break;}
			}
			if(win){return win;}
		}
	}


	//checking each vertical column
	for(var i = 0; i<7; i++){ //looping through columns
		for(var j = 0; j<4; j++){ //looping through row sets of 4
			win = true;
			for(var k =j; k<j+4;k++){ //looping through each row in the set of 4
				if(grid[k][i]!=turn){win=false; break;}
			}
			if(win){return win;}
		}
	}

	return false;

}

//handles clicking
canvas.addEventListener("click", (event)=>{
	let columnNum = getColumn(getMouseXCoorRelativeToCanvas(event)).column;
	let rowNum = addCircleToColumn(columnNum);
	if(rowNum!=-1){
		drawCircleInColumn(rowNum, columnNum);
		console.log(verifyWin(rowNum, columnNum));
		if(turn==="red"){
			turn="green";
		}else{turn="red";}
		clearTopRow();
		showCircleAboveGrid(columnNum*70+35);
	}
	


});

//setInterval(draw,1000/15);








