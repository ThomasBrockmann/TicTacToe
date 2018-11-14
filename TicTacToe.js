// Tic Tac Toe
// 12.09.2015 Th. Brockmannn

//Prototype for one of the nine fields
function field(iID) {
    this.ID = iID;
    this.tic = false;
    this.cross = null;
    this.image = document.getElementById("f" + iID);
    this.check = function(icross) {
        this.cross = icross;
        this.tic = true;
        if (icross === true) {
	    this.image.src = "cross.jpg";
        }  else {
            this.image.src = "circle.jpg";
        }
    }
	this.reset = function() {
		this.image.src = "blank.jpg";
		this.tic = false;
		this.cross = null;
	}
}
// Initialization
var count = 0;
var fields=[];
var i;
for (i=1; i<=9; i++) {
    fields.push(new field(i));
}

// Called once when Computer should start
function computerStarts() {
    document.getElementById("start").disabled = true;
    makeCircle();
}

// User clicked on a field to make a cross
function makeCross(ID) {
    document.getElementById("start").disabled = true;
    ID--;
    if (fields[ID].tic === false) {
        fields[ID].check(true);
        document.getElementById("warning").innerHTML = "";
		if (haveWon() === true){
			return;
		}
        if (full() === true) {
            return;
        }
        makeCircle();
    } else {
        document.getElementById("warning").innerHTML = "Das Feld ist bereits belegt. Bitte ein anderes wählen.";
    }
}

//Computers turn to place a circle
function makeCircle() {
    var fieldNumber;
    do {
        fieldNumber = Math.floor((Math.random() * 9));
    } 
    while (fields[fieldNumber].tic === true);
    fields[fieldNumber].check(false);
	if (haveWon() === false) {
		return;
	}
    full();
}
 
// Checks, whether all possible moves are made. Returns true if game is over.
function full() {
    count++;
    if (count >= 9) {
        document.getElementById("warning").innerHTML = "unentschieden";
        document.getElementById("newGame").disabled = false;
        return true;
    }
    return false; 
}

// checks, whether s.o. has won. Returns true if cross wins, false if circle wins, otherwise null.
function haveWon() {
	var result = "";
	var matrix = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]];
	
	for (x in matrix) {
		if ((fields[matrix[x][0]].cross === true) & (fields[matrix[x][1]].cross === true) & (fields[matrix[x][2]].cross === true)) {
	        document.getElementById("warning").innerHTML = "Du hast gewonnen";
            document.getElementById("newGame").disabled = false;
			return true;
		}
		if ((fields[matrix[x][0]].cross === false) & (fields[matrix[x][1]].cross === false) & (fields[matrix[x][2]].cross === false)) {
	        document.getElementById("warning").innerHTML = "Du hast verloren";
			document.getElementById("newGame").disabled = false;
			return false;
		}
	}
	return null;
}

// Initializes a new game. Invoked by button "new".
function newGame() {
	for (x in fields) {
		fields[x].reset();
	}
	count = 0;
	document.getElementById("newGame").disabled = true;
	document.getElementById("start").disabled = false;
	document.getElementById("warning").innerHTML = "";
}
