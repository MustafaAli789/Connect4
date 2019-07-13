//Initializing Variables and Constants

const canvas = document.querySelector("#board");
const ctx = canvas.getContext("2d");
const gridSize = 70;
let turn = "red";
let playAgain = true;
let gridMain = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0]];





//------------------------------------------Helper Methods START----------------------------------//

//gets the mouse x relative to the canvas
function getMouseXCoorRelativeToCanvas(){
	var rect = canvas.getBoundingClientRect();
	let x = event.clientX - rect.left;
	return x;
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
	} else {return {column: null};}
}

//returns an object storing the x and y pos at the center of the row, column for drawing purposes
function getCenterCoords(rowNum, columnNum){
		return {y: rowNum*70+75, x: columnNum*70+35};
}
//-------------------------------------------Helper Methods END----------------------------------//





//--------------------------------------Drawing Related Methods START----------------------------//
function drawGrid(){
	for(var i =0; i<6; i++){
		for(var j = 0; j<7; j++){
			ctx.strokeRect(j*gridSize, i*gridSize+40, gridSize, gridSize);
		}
	}
}

//clears the top row where the circle is displayed before clicking
function clearTopRow(){
	ctx.clearRect(0, 0, canvas.width, 40);
}

//draws a circle based on specific criteria
function drawCircle(x, y, radius, color){
	ctx.setLineDash([1,0]);
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI);
	ctx.fillStyle = color;
	ctx.fill();
}

//will draw a line over the winning set of circles
function drawWin(rowEnd, columnEnd, direction){
	let xStart = getCenterCoords(rowEnd, columnEnd).x;
	let yStart = getCenterCoords(rowEnd, columnEnd).y;
	ctx.beginPath();
	ctx.moveTo(xStart, yStart);
	switch(direction){
		case 1: 
			ctx.lineTo(xStart+3*70, yStart); //horizontal right win
			break;
		case 2:
			ctx.lineTo(xStart, yStart+3*70); //vertical down win
			break;
		case 3:
			ctx.lineTo(xStart-3*70, yStart+3*70); //bottom left win
			break;
		case 4:
			ctx.lineTo(xStart+3*70, yStart+3*70); //bottom right win
			break;
	}
	ctx.stroke();
	ctx.closePath();

}

//draws the circle on the board at the specified position
function drawCircleInColumn(rowNum, columnNum){
	let x = getCenterCoords(rowNum, columnNum).x;
	let y = getCenterCoords(rowNum, columnNum).y;
	drawCircle(x, y, 35, turn);
}

//will show the circle when hovering at the top 
function showCircleAboveGrid(x){
	let xCoor = getColumn(x);
	clearTopRow();
	if(xCoor!=null){
		drawCircle(xCoor.x, 20, 20, turn); //color is stored in turn name
	}
}

//--------------------------------------Drawing Related Methods END----------------------------//





//-----------------------------------Logic and Funcional Methods START------------------------//


//will verify if column is full or not and returns the bottom most empty row
function isValidColumn(columnNum, grid){
	for(var i = 5; i>=0; i--){
		if(grid[i][columnNum]===0){
			return {valid: true, row: i};
		}
	}
	return {valid: false, row: null}; //return no row if not valid column
}

//will update the grid array 
function addCircleToColumn(columnNum, player, grid){
	for(var i = 5; i>=0; i--){
		if(grid[i][columnNum]===0){
			grid[i][columnNum]=player;
			break;
		}
	}
}

//removes last circle that was added
function removeCircleFromColumn(columnNum, grid){
	for(var i  = 0; i<6; i++){
		if(grid[i][columnNum]==="red"||grid[i][columnNum]==="green"){
			grid[i][columnNum]= 0;
			break;
		}
	}
}

//takes a row and column and checks to direction as specified by dir (if 1, then bottom right, if -1 then bottom left)
function verifyDiagonal(rowStart, columnStart, direction, player, grid){
	let row = rowStart;
	let column = columnStart;
	for(var i = 0; i<4; i++){
		if(grid[row][column]!=player){
			return false;
		}else{row+=1; column+=(1*direction)}
	}
	return true;
}

//player is whose turn to check a win for
//return an object with following data
//win - boolean to represent if won
//column - column from which last check was made
//row - row from which last check was made
//direction - the type of check (1 - horizontal right, 2 - vertical down, 3 - diagonal bottom left, 4 - diagonal bottom right)
function verifyWin(player, grid){

	let win = true;

	//checking each horizontal row
	for(var i = 0; i<6; i++){ //looping through rows
		for(var j = 0; j<4; j++){ //looping through column sets of 4
			win = true;
			for(var k =j; k<j+4;k++){ //looping through each column in set o 4
				if(grid[i][k]!=player){win=false; break;}
			}
			if(win){return {win: win, column: k-4, row: i, direction: 1};}
		}
	}


	//checking each vertical column
	for(var i = 0; i<7; i++){ //looping through columns
		for(var j = 0; j<3; j++){ //looping through row sets of 4
			win = true;
			for(var k =j; k<j+4;k++){ //looping through each row in the set of 4
				if(grid[k][i]!=player){win=false; break;}
			}
			if(win){
				return {win: win, column: i, row: k-4, direction: 2};}
		}
	}

	//checking all diagonals to bottom left
	for(var i = 3; i<7; i++){
		for(var j = 0; j<3; j++){
			win = verifyDiagonal(j, i, -1, player, grid);
			if(win){
				return {win: win, column: i, row: j, direction: 3};}
		}
	}

	//checking all diagonals to bottom right
	for(var i = 0; i<4; i++){
		for(var j = 0; j<3; j++){
			win = verifyDiagonal(j, i, 1, player, grid);
			if(win){return {win: win, column: i, row: j, direction: 4};}
		}
	}

	return false;

}
//-----------------------------------Logic and Funcional Methods END------------------------//




//-------------------------------------------------MAIN-------------------------------------//

window.addEventListener("load", ()=>{
	canvas.width = 490;
	canvas.height = 460;
	ctx.setLineDash([5, 3]);
	drawGrid();
});

window.addEventListener("mousemove", (event)=>{
	 
	 if (playAgain) {
	 	let x = getMouseXCoorRelativeToCanvas(event);
		showCircleAboveGrid(x);
	 }
 
});

function win(){
	playAgain = false;
	if(confirm(`Player ${turn} won! Press Ok to play again or cancel to!`)){
		gridMain = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0]];
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		drawGrid();
		playAgain=true;
	} else{
		window.location.href = "start.html";
	}
}










