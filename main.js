// Square definition
function Square(x, y){
	this.x = x;
	this.y = y;
	this.satisfied = false;
	this.value = 0;
	this.bombs = 0;
	this.clicked = false;
}

// add id to divs on hover for reference
function addHover() {
	var squares = document.getElementsByClassName('square');
	for (square in squares) {
		squares[square].onmouseover = function() {
			let sy = parseInt(this.id.split("_")[0]) - 1;
			let sx = parseInt(this.id.split("_")[1]) - 1;
			document.getElementById('daily-link').innerText = sx + " " + sy;
			document.getElementById('weekly-link').innerText = sx + " " + sy;
			document.getElementById('monthly-link').innerText = sx + " " + sy;
			document.getElementById('alltime-link').innerText = sx + " " + sy;
		}
	}
}


// initialize game state
function initializeGameState(difficulty) {
	gameState = [];
	if (difficulty === "expert") {
		for (var y = 0; y < 16; y++) {
			gameState.push([]);
			for (var x = 0; x < 30; x++) {
				gameState[y].push(new Square(x, y));
			}
		}	
	} else if (difficulty === "beginner") {
		for (var y = 0; y < 9; y++) {
			gameState.push([]);
			for (var x = 0; x < 9; x++) {
				gameState[y].push(new Square(x, y));
			}
		}
	} else if (difficulty === "intermediate") {
		for (var y = 0; y < 16; y++) {
			gameState.push([]);
			for (var x = 0; x < 16; x++) {
				gameState[y].push(new Square(x, y));
			}
		}

	}
}

// update game state from html source
function getGameState() {
	let squares = document.getElementsByClassName('square');
	for (var i = 0; i < squares.length; i++) {
		if (squares[i].style.display !== "none"){
			let squareClass = squares[i].className; 
			if (squareClass.indexOf("blank") == -1) {
				let sy = parseInt(squares[i].id.split("_")[0]);
				let sx = parseInt(squares[i].id.split("_")[1]);
				if (squareClass.indexOf("bombflagged") > -1) {
					gameState[sy-1][sx-1].value = "X"
				} else {
					let bombNum = parseInt(squareClass.charAt(squareClass.length-1));
					if (bombNum == 0) {
						gameState[sy-1][sx-1].value = "O";
						gameState[sy-1][sx-1].satisfied = true;
					} else {
						gameState[sy-1][sx-1].value = bombNum;
					}
				}
			}
		}
	}
}

// print game state to console
function printGameState(type) {
	var tmp =[];
	// hard code print of X index for debugging
	console.log("Y  X  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9  0  1  2  3  4  5  6  7  8  9");
	for (y in gameState) {
		for (x in gameState[y]){
			let curSquare = gameState[y][x];
			if (type === 1){
				tmp.push(curSquare.value.toString());
			} else if (type === 2) {
				tmp.push(curSquare.bombs.toString());
			} else if (type === 3) {
				tmp.push(curSquare.satisfied.toString());
			} else if (type === 4) {
				tmp.push(curSquare.value.toString() + curSquare.bombs.toString());
			} else if (type === 5) {
				if (curSquare.satisfied && !curSquare.clicked) tmp.push("X");
				else tmp.push("O");

			}	
		}
		console.log(y%10 + "  -  " +tmp.join("|"));
		tmp = [];
	}
}

function leftClickSquare(x, y) {
	let id = getSquareId(x,y);
	let elem = document.getElementById(id);
	console.log(`Clicking square ${id}`);
	if (elem) {
	 // let lmbDown = new MouseEvent('mousedown',{
	 //    	'view': window,
	 //    	'bubbles': true,
	 //    	'cancelable': true,
	 //    	'button': 1,
	 //    	'which': 1
	 // 	});
		let lmbUp = new MouseEvent('mouseup',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 1,
	    	'which': 1
	 	});
		// elem.dispatchEvent(lmbDown);
		elem.dispatchEvent(lmbUp);
		console.log(`Square clicked.`);
	} else { console.log("Invalid element."); }
}

function rightClickSquare(x, y) {
	let id = getSquareId(x,y);
	console.log(`Right clicking square ${id}`);
	let elem = document.getElementById(id);
	if (elem) {
		let rmbDown = new MouseEvent('mousedown',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 2,
	    	'which': 3
	 	});
		let rmbUp = new MouseEvent('mouseup',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 2,
	    	'which': 3
	 	});
		elem.dispatchEvent(rmbDown);
		elem.dispatchEvent(rmbUp);
		console.log(`Square right clicked.`);
	} else { console.log("Invalid element."); }
}

function bothClickSquare(x, y) {
	let id = getSquareId(x,y);
	console.log(`both clicking square ${id}`);
	let elem = document.getElementById(id);
	if (elem) {
		let rmbDown = new MouseEvent('mousedown',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 2,
	    	'which': 3
	 	});
		let lmbDown = new MouseEvent('mousedown',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 1,
	    	'which': 1
	 	});
		let lmbUp = new MouseEvent('mouseup',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 1,
	    	'which': 1
	 	});
	 	let rmbUp = new MouseEvent('mouseup',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 2,
	    	'which': 3
	 	});

		elem.dispatchEvent(rmbDown);
		elem.dispatchEvent(lmbDown);
		elem.dispatchEvent(lmbUp);
		elem.dispatchEvent(rmbUp);
	} else { console.log("Invalid element."); }
}

function resetGame() {
	let elem = document.getElementById('face');
	console.log(`Resetting game`);
	if (elem) {
		var lmbDown = new MouseEvent('mousedown',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 1,
	    	'which': 1
	 	});
		var lmbUp = new MouseEvent('mouseup',{
	    	'view': window,
	    	'bubbles': true,
	    	'cancelable': true,
	    	'button': 1,
	    	'which': 1
	 	});
		elem.dispatchEvent(lmbDown);
		elem.dispatchEvent(lmbUp);
		console.log(`Reset clicked.`);
	} else { console.log("Invalid element."); }
}

function getFreeChoices() {
	let res = [];
	for (y in gameState) {
		for (x in gameState[y]) {
			// console.log(x, y);
			let choices = checkFreeChoice(x,y);
			for (z in choices){
				// comparing arrays wasnt working out well
				// [4,2] wasnt equal to [4,2] with ==/===
				// used .toString() comparison instead
				let c = choices[z].toString();
				if(res.indexOf(c) == -1) {
					res.push(c);
				}
			}
		}
	}
	return res
}

function checkFreeChoice(x,y ) {
	// console.log("checkFreeChoice called on",x,y,"------------")
	

	y = parseInt(y);
	x = parseInt(x);
	let surrounding = getSurroundingCells(x, y);
	let up = -1;
	let upperRight = -1;
	let right = -1;
	let lowerRight = -1;
	let down = -1;
	let lowerLeft = -1;
	let left = -1;
	let upperLeft = -1;

	if(surrounding[0] !== -1 ) { 
		up = surrounding[0];
		// console.log("up: ", up);
		// console.log("up.value: ", up.value);
		}
	if(surrounding[1] !== -1 ) { 
		upperRight = surrounding[1];
		// console.log("upperRight: ", upperRight);
		// console.log("upperRight.value: ", upperRight.value);
		}
	if(surrounding[2] !== -1 ) { 
		right = surrounding[2];
		// console.log("right: ", right);
		// console.log("right.value: ", right.value);
		}
	if(surrounding[3] !== -1 ) { 
		lowerRight = surrounding[3];
		// console.log("lowerRight: ", lowerRight);
		// console.log("lowerRight.value: ", lowerRight.value);
		}
	if(surrounding[4] !== -1 ) { 
		down = surrounding[4];
		// console.log("down: ", down);
		// console.log("down.value: ", down.value);
		}
	if(surrounding[5] !== -1 ) { 
		lowerLeft = surrounding[5];
		// console.log("lowerLeft: ", lowerLeft);
		// console.log("lowerLeft.value: ", lowerLeft.value);
		}
	if(surrounding[6] !== -1 ) { 
		left = surrounding[6];
		// console.log("left: ", left);
		// console.log("left.value: ", left.value);
		}
	if(surrounding[7] !== -1 ) { 
		upperLeft = surrounding[7];
		// console.log("upperLeft: ", upperLeft);
		// console.log("upperLeft.value: ", upperLeft.value);
		}

	let curSquare = gameState[y][x];
	let closed = 0;
	let res = [];
	// console.log("CHECKING",x,y,"Value:",curSquare.value,"Bombs:",curSquare.bombs)
	// console.log("curSquare.satisfied:",curSquare.satisfied)
	if (!curSquare.satisfied) {
		if(up.value === 0) closed++;
		// console.log("up.value: ", up.value);
		if(upperRight.value === 0) closed++;
		// console.log("upperRight.value: ", upperRight.value);
		if(right.value === 0) closed++;
		// console.log("right.value: ", right.value);
		if(lowerRight.value === 0) closed++;
		// console.log("lowerRight.value: ", lowerRight.value);
		if(down.value === 0) closed++;
		// console.log("down.value: ", down.value);
		if(lowerLeft.value === 0) closed++;
		// console.log("lowerLeft.value: ", lowerLeft.value);
		if(left.value === 0) closed++;
		// console.log("left.value: ", left.value);
		if(upperLeft.value === 0) closed++;
		// console.log("upperLeft.value: ", upperLeft.value);
		// console.log("closed: ", closed);

		
		if (closed == (curSquare.value - curSquare.bombs)) {
			if(up.value === 0) {
				res.push([x,y-1]);
				console.log("FREE FOUND - up of",x,y,"at:", x,y-1);
			}
			if(upperRight.value === 0) {
				res.push([x+1,y-1]);
				console.log("FREE FOUND - upperRight of",x,y,"at:", x+1,y-1);
			}
			if(right.value === 0) {
				res.push([x+1,y]);
				console.log("FREE FOUND - right of",x,y,"at:", x+1,y);
			}
			if(lowerRight.value === 0) {
				res.push([x+1,y+1]);
				console.log("FREE FOUND - lowerRight of",x,y,"at:", x+1,y+1);
			}
			if(down.value === 0) {
				res.push([x,y+1]);
				console.log("FREE FOUND - down of",x,y,"at:", x,y+1);
			}
			if(lowerLeft.value === 0) {
				res.push([x-1,y+1]);
				console.log("FREE FOUND - lowerLeft of",x,y,"at:", x-1,y+1);
			}
			if(left.value === 0) {
				res.push([x-1,y]);
				console.log("FREE FOUND - left of",x,y,"at:", x-1,y);
			}
			if(upperLeft.value === 0) {
				res.push([x-1,y-1]);
				console.log("FREE FOUND - upperLeft of",x,y,"at:", x-1,y-1);
			}
			// console.log(upperLeft.value, up.value, upperRight.value);
 			// console.log(left.value, curSquare.value, right.value);
 			// console.log(lowerLeft.value, down.value, lowerRight.value)
 			// console.log(res);
 			// console.log("--------------");
 			gameState[y][x].satisfied = true;
 			gameState[y][x].clicked = true;
 			gameState[y][x].bombs = curSquare.value;
 			return res
		}
		 	// console.log(upperLeft.value, up.value, upperRight.value);
 			// console.log(left.value, curSquare.value, right.value);
 			// console.log(lowerLeft.value, down.value, lowerRight.value)
 			// console.log("--------------");
		return res
	} 
 	// console.log(upperLeft.value, up.value, upperRight.value);
 	// console.log(left.value, curSquare.value, right.value);
 	// console.log(lowerLeft.value, down.value, lowerRight.value)
}

function getSurroundingCells(x,y) {

	y = parseInt(y);
	x = parseInt(x);
	let left = -1;
	let down = -1;
	let right = -1;
	let up = -1;
	let lowerLeft = -1;
	let lowerRight = -1;
	let upperLeft = -1;
	let upperRight = -1;	
	
	let maxx = gameState[0].length - 1;
	let maxy = gameState.length - 1;

	if (y === 0) {
		// console.log("y === 0: ", y === 0);
		// top wall
		if(x === 0) {
			// console.log("x === 0: ", x === 0);
			// top wall left wall
			right = gameState[y][x+1];
			down = gameState[y+1][x];
			lowerRight = gameState[y+1][x+1];
		} else if (x === maxx) {
			// console.log("x === 29: ", x === 29);
			// top wall right wall
			left = gameState[y][x-1];
			down = gameState[y+1][x];
			lowerLeft = gameState[y+1][x-1];
		} else {
			// console.log("0 < x < 29: ", (0 < x && x < 29));
			// top wall middle
			left = gameState[y][x-1];
			right = gameState[y][x+1];
			lowerLeft = gameState[y+1][x-1];
			down = gameState[y+1][x];
			lowerRight = gameState[y+1][x+1];
		}
	} else if (y === maxy) {
		// console.log("y === 15: ", y === 15);
		// bottom wall
		if(x === 0) {
			// console.log("x === 0: ", x === 0);
			// bottom wall left wall
			right = gameState[y][x+1];
			up = gameState[y-1][x];
			upperRight = gameState[y-1][x+1];
		} else if (x === maxx) {
			// console.log("x === 29: ", x === 29);
			// bottom wall right wall
			left = gameState[y][x-1];
			up = gameState[y-1][x];
			upperLeft = gameState[y-1][x-1];
		} else {
			// console.log("0 < x < 29: ", (0 < x && x < 29));
			// bottom wall middle
			up = gameState[y-1][x];
			left = gameState[y][x-1];
			right = gameState[y][x+1];
			upperRight = gameState[y-1][x+1];
			upperLeft = gameState[y-1][x-1];
		}
	} else {
		// console.log("0 < y < 15: ", (y > 0 && y < 15));
		if(x === 0) {
			// console.log("x === 0: ", x === 0);
			// middle left wall
			right = gameState[y][x+1];
			up = gameState[y-1][x];
			down = gameState[y+1][x];
			upperRight = gameState[y-1][x+1];
			lowerRight = gameState[y+1][x+1];
		} else if (x === maxx) {
			// console.log("x === 29: ", x === 29);
			// middle right wall
			left = gameState[y][x-1];
			up = gameState[y-1][x];
			down = gameState[y+1][x];
			upperLeft = gameState[y-1][x-1];
			lowerLeft = gameState[y+1][x-1];
		} else {
			// console.log("0 < x < 29: ", (0 < x && x < 29));
			// middle
			left = gameState[y][x-1];
			down = gameState[y+1][x];
			right = gameState[y][x+1];
			up = gameState[y-1][x];
			lowerRight = gameState[y+1][x+1];
			lowerLeft = gameState[y+1][x-1];
			upperLeft = gameState[y-1][x-1];
			upperRight = gameState[y-1][x+1];
		}
	}
	return [up,upperRight,right,lowerRight,down,lowerLeft,left,upperLeft];
}


function markBomb(x,y) {
	console.log("there is a bomb at", x, y, "id:", y+1, x+1);
	rightClickSquare(x,y);
}

// set square.satisfied depending on bombs touching
function satisfy(x,y) {
	console.log("satisfy called on",x,y, "---------------");
	
	let surrounding = getSurroundingCells(x, y);
	let up = surrounding[0];
	let upperRight = surrounding[1];
	let right = surrounding[2];
	let lowerRight = surrounding[3];
	let down = surrounding[4];
	let lowerLeft = surrounding[5];
	let left = surrounding[6];
	let upperLeft = surrounding[7];

	if (left !== -1){
		console.log("adding bomb to left of ", x,y, "to:",y,x-1);
		satisfiedHelper(left);
	}
	if (down !== -1){
		console.log("adding bomb to down of ", x,y, "to:",y+1,x);
		satisfiedHelper(down);
	}
	if (right !== -1){
		console.log("adding bomb to right of ", x,y, "to:",y,x+1);
		satisfiedHelper(right);
	}
	if (up !== -1){
		console.log("adding bomb to up of ", x,y, "to:",y-1,x);
		satisfiedHelper(up);
	}
	if (lowerLeft !== -1){
		console.log("adding bomb to lowerLeft of ", x,y, "to:",y+1,x-1);
		satisfiedHelper(lowerLeft);
	}
	if (lowerRight !== -1){
		console.log("adding bomb to lowerRight of ", x,y, "to:",y+1,x+1);
		satisfiedHelper(lowerRight);
	}
	if (upperLeft !== -1){
		console.log("adding bomb to upperLeft of ", x,y, "to:",y-1,x-1);
		satisfiedHelper(upperLeft);
	}
	if (upperRight !== -1){
		console.log("adding bomb to upperRight of ", x,y, "to:",y-1,x+1);
		satisfiedHelper(upperRight);
	}

			// square.bombs++ 
			// if square.bombs == square.value
				// square.satisfied == true;
}


function satisfiedHelper(square) {
	if(!square.satisfied){
		console.log("bombs",square.bombs,"->",square.bombs+1, "VALUE:",square.value);
		square.bombs+=1;
		if(square.bombs == square.value && square.value !== 0 && !square.clicked) {
			square.sastisfied = true;
			clickSatisfied(square.x,square.y);
		}
	}
	return;
}

function clickSatisfied(x,y) {
	let square = gameState[y][x]
	console.log("clickSatisfied called on ", x,y);
	bothClickSquare(x,y);
	square.clicked = true;
	return;
}

function clickAllSatisfied() {
	let c = false;
	for (y in gameState) {
		for (x in gameState[y]){
			let curSquare = gameState[y][x]
			if ((curSquare.satisfied || (curSquare.bombs === curSquare.value)) && !curSquare.clicked && (curSquare.value !== "O" && curSquare.value > 0)) {
				console.log("clickAllSatisfied called on ", x,y);
				bothClickSquare(curSquare.x,curSquare.y);
				curSquare.satisfied = true;
				curSquare.clicked = true;
				c = true;
			}
		}
	}
	if(!c){
		console.log("nothing to click")
		return false;
	} else { return true; }
}

function getSquareId(x,y) {
	return `${y+1}_${x+1}`
}

function getSquareValue(x,y) {
	return gameState[y][x].value;
}
function getSquareBombs(x,y) {
	return gameState[y][x].bombs;
}

function parseXYString(x) {
	let res = x.split(",") 
	return [parseInt(res[0]),parseInt(res[1])];
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function bagContains(arr1, arr2) {
    var o = {}
    var result = true;

    // Count all the objects in container
    for(var i=0; i < arr1.length; i++) {
        if(!o[arr1[i]]) {
            o[arr1[i]] = 0;
        }
        o[arr1[i]]++;
    }

    // Subtract all the objects in containee
    // And exit early if possible
    for(var i=0; i < arr2.length; i++) {
        if(!o[arr2[i]]) {
            o[arr2[i]] = 0;
        }
        if(--o[arr2[i]] < 0) {
            result = false;
            break;
        }
    }

    return result;
}

function msLogic() {
	let clicked = false;
	let edges = {};
	for (y in gameState) {
		for (x in gameState[y]) {
			let surrounding = getSurroundingCells(x,y);
			let values = [];
			// console.log(x,y,surrounding)
			// console.log("getSquareValue(x,y): ", getSquareValue(x,y));
			
			if (getSquareValue(x,y) !== 0 && getSquareValue(x,y) !== "X") {
				for (var i = 0; i < surrounding.length; i++) {
					if (surrounding[i] === -1) {
						// console.log("adding -1 to values");
						values.push(-1)
					} else { 
						// console.log("adding " + surrounding[i].value + " to values");
						values.push(surrounding[i].value);
					}
				}
				// console.log(values);
				// console.log("values.indexOf(0): ", values.indexOf(0));
				if (values.indexOf(0) !== -1) {
					let tmp = x.toString() + " " + y.toString();
					edges[tmp] = []; 
					for (var i = 0; i < surrounding.length; i++) {
						if (surrounding[i] !== -1 && surrounding[i].value === 0) {
							edges[tmp].push(surrounding[i].x + " " + surrounding[i].y);
						}
					}
				}
			}
		}
	}

	for (edge in edges) {
		for( edge2 in edges) {
			if (edges[edge].length > edges[edge2].length) {
				if (bagContains(edges[edge], edges[edge2])) {
					console.log("subset found at",edge2,edges[edge2],"---",edge,edges[edge]);
					let y1 = parseInt(edge.split(" ")[1]);
					let x1 = parseInt(edge.split(" ")[0]);
					let y2 = parseInt(edge2.split(" ")[1]);
					let x2 = parseInt(edge2.split(" ")[0]);
					console.log("val1",getSquareValue(x1,y1),"bomb1",getSquareBombs(x1,y1))
					console.log("val2",getSquareValue(x2,y2),"bomb2",getSquareBombs(x2,y2))
					let notInIntersection = edges[edge].filter( function( el ) {  return edges[edge2].indexOf( el ) < 0; });
					console.log("notInIntersection: ", notInIntersection);
					console.log("check for mark");
					console.log("v1-b1:", getSquareValue(x1,y1) - getSquareBombs(x1,y1));
					console.log("v2-b2-length",getSquareValue(x2,y2) - getSquareBombs(x2,y2) - notInIntersection.length);
					if (getSquareValue(x1,y1) - getSquareBombs(x1,y1) === getSquareValue(x2,y2) - getSquareBombs(x2,y2)) {
						for (var i = 0; i < notInIntersection.length; i++) {
							let sx = parseInt(notInIntersection[i].split(" ")[0]);
							let sy = parseInt(notInIntersection[i].split(" ")[1]);
							console.log("adding",sx,sy,"to click list");
							leftClickSquare(sx,sy);
							if (!clicked) clicked = true;
						}
					} else if (getSquareValue(x2,y2) - getSquareBombs(x2,y2) === getSquareValue(x1,y1) - getSquareBombs(x1,y1) - notInIntersection.length) {
						for (var i = 0; i < notInIntersection.length; i++) {
							let sx = parseInt(notInIntersection[i].split(" ")[0]);
							let sy = parseInt(notInIntersection[i].split(" ")[1]);
							console.log("MARK BOMB:------------------------------------------------",sx,sy);
							markBomb(sx,sy);
							satisfy(sx,sy);
							if (!clicked) clicked = true;
						}
					}
				}
			}
		}
	}
	return clicked;
}

// var x = msLogic("expert");

// // if one is subset of another
// bagContains(x["3 5"],x["2 5"]);

// // if value1 - bombs1 == value2 - bombs2
// getSquareValue(2,5) - getSquareBombs(2,5) === getSquareValue(3,5) - getSquareBombs(3,5)

// // click cells not in intersection
// for (var i = 0; i < x["3 5"].length; i++) {
// 	if(x["2 5"].indexOf(x["3 5"][i]) === -1){
// 		let sy = parseInt(x["3 5"][i].split(" ")[1]);
// 		let sx = parseInt(x["3 5"][i].split(" ")[0]);
// 		leftClickSquare(sx,sy);
// 	}
// }



async function gameLoop(difficulty, slp) {
	let gameState = [];
	initializeGameState(difficulty);
	getGameState();
	printGameState(4);
	leftClickSquare(29,15);
	getGameState();
	printGameState(4);
	let playing = 0;
	while (true) {
		getGameState();
		let freeChoices = getFreeChoices();
		console.log(freeChoices);
		if (slp) await sleep(slp);
		if (freeChoices.length){
			// free choices to make
			for (let x in freeChoices){
				let xyString = freeChoices[x];
				let parsed = parseXYString(xyString);
				let px = parsed[0];
				let py = parsed[1];
				markBomb(px,py);
				// console.log("sleeping 1sec")
				if (slp) await sleep(slp);
				satisfy(px,py);
				// console.log("sleeping 1sec")
				if (slp) await sleep(slp);
			}
		} else {
			console.log("no free choices to make");
			console.log("Clicking all satisfied");
			if (clickAllSatisfied()) {
				continue;
			}

			if (msLogic()) {
				continue;
			}

			printGameState(4);
			break;
		}
		playing+=1;
		console.log("resuming")
	}
}


addHover();
resetGame();
gameLoop("expert", 100);