
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









