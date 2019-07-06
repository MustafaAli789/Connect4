
//handles clicking
canvas.addEventListener("click", (event)=>{
	if(playAgain){
		main(event);
	} 	
});

function main(event){
	let columnNum = getColumn(getMouseXCoorRelativeToCanvas(event)).column;
	if(isValidColumn(columnNum).valid){
		let rowNum = isValidColumn(columnNum).row;
		addCircleToColumn(columnNum); 
		drawCircleInColumn(rowNum, columnNum);
		if(verifyWin(rowNum, columnNum).win){
			let winObj = verifyWin(rowNum, columnNum);
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









