
//handles clicking
canvas.addEventListener("click", (event)=>{
	if(playAgain){
		main(event);
	} 	
});

function main(event){
	let columnNum = getColumn(getMouseXCoorRelativeToCanvas(event)).column;
	if(isValidColumn(columnNum, gridMain).valid){
		let rowNum = isValidColumn(columnNum, gridMain).row;
		addCircleToColumn(columnNum, turn, gridMain); 
		drawCircleInColumn(rowNum, columnNum);
		if(verifyWin(turn, gridMain).win){
			let winObj = verifyWin(turn, gridMain);
			drawWin(winObj.row, winObj.column, winObj.direction)
			setTimeout(win, 1.5);
			
		} else{
			if(turn==="red"){
				turn="green";
			}else{turn="red";}
			clearTopRow();
			showCircleAboveGrid(getCenterCoords(rowNum, columnNum).x);
		}
	}
}









