var columnWinRate = [0, 0, 0, 0, 0, 0, 0];


//--------------------------------A.I------------------------------//

function getGridCopy(gridParam){
	let gridCopy = [[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0], 
			[0, 0, 0, 0, 0, 0, 0]];
	for(var i =0; i<7; i++){
		for(var j =0; j<7; j++){
			gridCopy[i][j]=gridParam[i][j];
		}
	}
	return gridCopy;
}

function getIndex(maxEval, curEval, i){
	if(curEval>maxEval){
		return i;
	} else if(maxEval.value>curEval.value){
		return maxEval.index;
	} else{
		return i;
	}
}

function minimax(depth, player, Grid, alpha, beta){

	let tempGrid = getGridCopy(Grid);

	if(depth===0 || verifyWin(getOpponent(player), tempGrid)){
		let score = staticEvaluation(tempGrid);
		/*console.log(tempGrid);
		console.log(player, score)*/
		return {value: score, index: 0};
	}

	if(player==="red"){ //red is maximizing player
		let bestColumn = 0;
		let maxEval = {value:-Infinity, index: bestColumn};
		for(var i =0; i<7; i++){
			if(isValidColumn(i, tempGrid)){
				addCircleToColumn(i, "red", tempGrid);
				let curEval = minimax(depth-1, "green", tempGrid, alpha, beta);
				if(curEval.value>maxEval.value){bestColumn=i;}
				maxEval = {value: Math.max(maxEval.value, curEval.value), index: bestColumn};
				alpha = Math.max(alpha, curEval.value);
				removeCircleFromColumn(i, tempGrid);
				if(beta<=alpha){break;}
			}
		}
		return maxEval;
	}

	if(player==="green"){ //green is minimizing player
		let bestColumn = 0;
		let minEval = {value: Infinity, index: bestColumn};
		for(var i =0; i<7; i++){
			if(isValidColumn(i, tempGrid)){
				addCircleToColumn(i, "green", tempGrid);
				let curEval = minimax(depth-1, "red", tempGrid, alpha, beta);
				if(curEval.value<minEval.value){bestColumn=i;}
				minEval = {value: Math.min(minEval.value, curEval.value), index: bestColumn};
				beta = Math.min(beta, curEval.value);
				removeCircleFromColumn(i, tempGrid);
				if(beta<=alpha){break;}
			}

		}
		return minEval;
	}


}

function getOpponent(player){
	if (player==="red"){
		return "green";
	}
	else{
		return "red";
	}
}

function staticEvaluation(grid){

	//each block of code below loops through a certain set of 4 tiles (horizontal, vertical
	//btm left diagonal, btm right diagonal). If in that group of 4 only one type of piece exists
	//(only red or only green) then it counts how many of that piece and uses that to calculate
	//score to add to appropriate players total score
	//At the end, scores are subtracted, the more positive the better for red and vice versa
	//I.E Red is maximizing player and Green is minimizing

	let hGroupingsScoreRed = 0;
	let hGroupingsScoreGreen = 0;
	let currHGroupingScore = 0;

	let vGroupingsScoreRed = 0;
	let vGroupingsScoreGreen = 0;
	let currVGroupingScore = 0;

	let diagonalBtmLeftScoreRed = 0;
	let diagonalBtmLeftScoreGreen = 0;
	let currDiagonalBtmLeftScore = 0;

	let diagonalBtmRightScoreRed = 0;
	let diagonalBtmRightScoreGreen = 0;
	let currDiagonalBtmRightScore = 0;

	let assumedPlayerInGrouping = null;

	//checking each horizontal row
	for(var i = 0; i<7; i++){ //looping through rows
		for(var j = 0; j<4; j++){ //looping through column sets of 4
			for(var k =j; k<j+4;k++){ //looping through each column in set o 4
				if(assumedPlayerInGrouping===null && grid[i][k]==="red"){assumedPlayerInGrouping="red";}
				else if(assumedPlayerInGrouping===null && grid[i][k]==="green"){assumedPlayerInGrouping="green";}
				if(grid[i][k]===getOpponent(assumedPlayerInGrouping)){currHGroupingScore = 0; break;}
				else if(grid[i][k]===assumedPlayerInGrouping){currHGroupingScore+=1;}
			}
			if(currHGroupingScore===4){currHGroupingScore=1000;} //win situation
			if(assumedPlayerInGrouping==="red"){hGroupingsScoreRed+=currHGroupingScore**2;}
			else if(assumedPlayerInGrouping==="green"){hGroupingsScoreGreen+=currHGroupingScore**2;}
			currHGroupingScore = 0;
			assumedPlayerInGrouping = null;
		}
	}

	//checking each vertical column
	for(var i = 0; i<7; i++){ //looping through columns
		for(var j = 0; j<4; j++){ //looping through row sets of 4
			currVGroupingScore = 0;
			for(var k =j; k<j+4;k++){ //looping through each row in the set of 4
				if(assumedPlayerInGrouping===null && grid[k][i]==="red"){assumedPlayerInGrouping="red";}
				else if(assumedPlayerInGrouping===null && grid[k][i]==="green"){assumedPlayerInGrouping="green";}
				if(grid[k][i]===getOpponent(assumedPlayerInGrouping)){currVGroupingScore = 0; break;}
				else if(grid[k][i]===assumedPlayerInGrouping){currVGroupingScore+=1;}
			}
			if(currVGroupingScore===4){currVGroupingScore=1000;} //win situation
			if(assumedPlayerInGrouping==="red"){vGroupingsScoreRed+=currVGroupingScore**2;}
			else if(assumedPlayerInGrouping==="green"){vGroupingsScoreGreen+=currVGroupingScore**2;}
			currVGroupingScore = 0;
			assumedPlayerInGrouping = null;
		}
	}

	//checking all diagonals to bottom left
	for(var i = 3; i<7; i++){ //looping over columns from where to start diagonal search
		for(var j = 0; j<4; j++){ //looping over rows from where to start diagonal search
			for(var k =0; k<4; k++){
				if(assumedPlayerInGrouping===null && grid[j+k][i-k]==="red"){assumedPlayerInGrouping="red";}
				else if(assumedPlayerInGrouping===null && grid[j+k][i-k]==="green"){assumedPlayerInGrouping="green";}
				if(grid[j+k][i-k]===getOpponent(assumedPlayerInGrouping)){currDiagonalBtmLeftScore=0; break;}
				else if(grid[j+k][i-k]===assumedPlayerInGrouping){currDiagonalBtmLeftScore+=1;}
			}
			if(currDiagonalBtmLeftScore===4){currDiagonalBtmLeftScore=1000;} //win situation
			if(assumedPlayerInGrouping==="red"){diagonalBtmLeftScoreRed+=currDiagonalBtmLeftScore**2;}
			else if(assumedPlayerInGrouping==="green"){diagonalBtmLeftScoreGreen+=currDiagonalBtmLeftScore**2;}
			currDiagonalBtmLeftScore=0;
			assumedPlayerInGrouping = null;
		}
	}

	//checking all diagonals to bottom right
	for(var i = 0; i<4; i++){ //looping over columns from where to start diagonal search
		for(var j = 0; j<4; j++){ //looping over rows from where to start diagonal search
			for(var k =0; k<4; k++){
				if(assumedPlayerInGrouping===null && grid[j+k][i+k]==="red"){assumedPlayerInGrouping="red";}
				else if(assumedPlayerInGrouping===null && grid[j+k][i+k]==="green"){assumedPlayerInGrouping="green";}
				if(grid[j+k][i+k]===getOpponent(assumedPlayerInGrouping)){currDiagonalBtmRightScore=0; break;}
				else if(grid[j+k][i+k]===assumedPlayerInGrouping){currDiagonalBtmRightScore+=1;}
			}
			if(currDiagonalBtmRightScore===4){currDiagonalBtmRightScore=1000;} //win situation
			if(assumedPlayerInGrouping==="red"){diagonalBtmRightScoreRed+=currDiagonalBtmRightScore**2;}
			else if(assumedPlayerInGrouping==="green"){diagonalBtmRightScoreGreen+=currDiagonalBtmRightScore**2;}
			currDiagonalBtmRightScore=0;
			assumedPlayerInGrouping=null;
		}
	}

	let redScore = diagonalBtmRightScoreRed + diagonalBtmLeftScoreRed + hGroupingsScoreRed + vGroupingsScoreRed;
	let greenScore = diagonalBtmRightScoreGreen + diagonalBtmLeftScoreGreen + hGroupingsScoreGreen + vGroupingsScoreGreen;


	return redScore-greenScore;

}



//--------------------------------A.I End--------------------------//

//handles clicking
canvas.addEventListener("click", (event)=>{
	if(playAgain && turn==="red"){
		playerMove(event);
	} 
});

function main(){
	if(playAgain && turn==="green"){
		let aiColumn = minimax(8, "green", getGridCopy(gridMain), -Infinity, Infinity).index;
		let rowNum = isValidColumn(aiColumn, gridMain).row;
		addCircleToColumn(aiColumn, turn, gridMain); 
		drawCircleInColumn(rowNum, aiColumn);
		postMoveActions(rowNum, aiColumn);
	}
}

function playerMove(event){
	let columnNum = getColumn(getMouseXCoorRelativeToCanvas(event)).column;
	if(isValidColumn(columnNum, gridMain).valid){
		let rowNum = isValidColumn(columnNum, gridMain).row;
		addCircleToColumn(columnNum, turn, gridMain); 
		drawCircleInColumn(rowNum, columnNum);
		postMoveActions(rowNum, columnNum);
	}
}

function postMoveActions(rowNum, columnNum){
	if(verifyWin(turn, gridMain).win){
		let winObj = verifyWin(turn, gridMain);
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

setInterval(main, 1000/1);







