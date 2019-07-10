var columnWinRate = [0, 0, 0, 0, 0, 0, 0];


//--------------------------------A.I------------------------------//

function getGridCopy(){
	let gridCopy = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0]];
	grid.forEach((row, i)=>{
		row.forEach((column, j)=>{
			gridCopy[i][j]=column;
		});
	});
	return gridCopy;
}

function placePlayer(level, grid){
	
}

function getStaticEvaluation(player1, player2){
	return getPlayerScore(player1)-getPlayerScore(player2);
}


function getOpponent(player){
	if (player==="red"){
		return "green";
	}
	else{
		return "red";
	}
}

function getPlayerScore(player){

	//The code below will check all horizontal group of 4 and for each
	//a score is taken based on how many of the players pieces are in it
	//assuming no opposing player pieces

	let enemy = getOpponent(player);

	let hGroupingsScore = 0;
	let currHGroupingScore = 0;

	//checking each horizontal row
	for(var i = 0; i<7; i++){ //looping through rows
		for(var j = 0; j<4; j++){ //looping through column sets of 4
			currHGroupingScore = 0;
			for(var k =j; k<j+4;k++){ //looping through each column in set o 4
				if(grid[i][k]===enemy){currHGroupingScore = 0; break;}
				else if(grid[i][k]===player){currHGroupingScore+=1;}
			}
			hGroupingsScore+=currHGroupingScore**2; 
		}
	}

	//The code below will check all vertical group of 4 and for each
	//a score is taken based on how many of the players pieces are in it
	//assuming no opposing player pieces

	let vGroupingsScore = 0;
	let currVGroupingScore = 0;

	//checking each vertical column
	for(var i = 0; i<7; i++){ //looping through columns
		for(var j = 0; j<4; j++){ //looping through row sets of 4
			currVGroupingScore = 0;
			for(var k =j; k<j+4;k++){ //looping through each row in the set of 4
				if(grid[k][i]===enemy){currVGroupingScore = 0; break;}
				else if(grid[k][i]===player){currVGroupingScore+=1;}
			}
			vGroupingsScore+=currVGroupingScore**2;
		}
	}

	//The code below goes through all diagonal bottom left groupings and 
	//checks to see how many player pieces are in it and gives a score based on that
	//assuming no opponent players

	let diagonalBtmLeftScore = 0;
	let currDiagonalBtmLeftScore = 0;

	//checking all diagonals to bottom left
	for(var i = 3; i<7; i++){ //looping over columns from where to start diagonal search
		for(var j = 0; j<4; j++){ //looping over rows from where to start diagonal search
			for(var k =0; k<4; k++){
				if(grid[j+k][i-k]===enemy){currDiagonalBtmLeftScore=0; break;}
				else if(grid[j+k][i-k]===player){currDiagonalBtmLeftScore+=1;}
			}
			diagonalBtmLeftScore+=currDiagonalBtmLeftScore**2;
			currDiagonalBtmLeftScore=0;
		}
	}

	let diagonalBtmRightScore = 0;
	let currDiagonalBtmRightScore = 0;

	//checking all diagonals to bottom right
	for(var i = 0; i<4; i++){ //looping over columns from where to start diagonal search
		for(var j = 0; j<4; j++){ //looping over rows from where to start diagonal search
			for(var k =0; k<4; k++){
				if(grid[j+k][i+k]===enemy){currDiagonalBtmRightScore=0; break;}
				else if(grid[j+k][i+k]===player){currDiagonalBtmRightScore+=1;}
			}
			diagonalBtmRightScore+=currDiagonalBtmRightScore**2;
			currDiagonalBtmRightScore=0;
		}
	}

	return diagonalBtmRightScore + diagonalBtmLeftScore + hGroupingsScore + vGroupingsScore;

}

function getAIMove(){


}


//--------------------------------A.I End--------------------------//

//handles clicking
canvas.addEventListener("click", (event)=>{
	if(playAgain){
		main(event);
	} 	
});

function main(event){
	let columnNum = getColumn(getMouseXCoorRelativeToCanvas(event)).column;
	if(isValidColumn(columnNum, grid).valid){
		let rowNum = isValidColumn(columnNum, grid).row;
		addCircleToColumn(columnNum, turn, grid); 
		drawCircleInColumn(rowNum, columnNum);
		if(verifyWin(turn, grid).win){
			let winObj = verifyWin(turn, grid);
			drawWin(winObj.row, winObj.column, winObj.direction)
			setTimeout(win, 1);
			
		} else{
			if(turn==="red"){
				turn="green";
			}else{turn="red";}
			clearTopRow();
			showCircleAboveGrid(getCenterCoords(rowNum, columnNum).x);
		}
	}
}









