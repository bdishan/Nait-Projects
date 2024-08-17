window.onload = function(ev) {
    this.LoadImages();
    document.getElementById("difficulty").onclick = function(ev) {

        //hide the winner text and clear the puzzle div
        document.getElementById("winner").style.visibility = "hidden";
        document.getElementById("puzzle").innerHTML = "";

        NewPuzzle();
    }
    document.onkeydown = this.KeyDown;
}

//global variables
var cells = []; //array of arrays of cells 
var pics = []; //array of array of images 
var master = []; //array of images (current game master)
var dim = 0; //current game dimension size
var puzzleSolved = false; //flag to check the puzzle has been solved

//Cell pseudo object CTOR
function Cell(row, col, url) {
    this.Row = row;
    this.Col = col;
    this.Url = url;
    this.Display = true;
}

//Cell object Show function
Cell.prototype.Show = function(ev) {
    let id = `id${this.Row}_${this.Col}`; //build the id
    document.getElementById(id).src = this.Display ? this.Url : ""; //set the url 
}

//Cell object Bind click event
Cell.prototype.Bind = function(ev) {
    let clickedCell = this;


    document.getElementById(`id${clickedCell.Row}_${clickedCell.Col}`).onclick = function() {
        let emptyCell = FindEmpty();
        if (clickedCell == emptyCell) return; //user clicked empty cell do nothing

        //if ((clickedCell.Row == emptyCell.Row && Math.abs(clickedCell.Col - emptyCell.Col) == 1) ||
        //  (clickedCell.Col == emptyCell.Col && Math.abs(clickedCell.Row - emptyCell.Row) == 1)) {

        let tempUrl = emptyCell.Url;
        let tempDisplay = emptyCell.Display;

        emptyCell.Url = clickedCell.Url;
        emptyCell.Display = clickedCell.Display;
        clickedCell.Url = tempUrl;
        clickedCell.Display = tempDisplay;

        ShowStatus();
        ShowGrid();
        //}
    }

}

//helper that finds the non-displayed or empty cell
function FindEmpty(ev) {
    let emptyCell = null;
    for (let row = 0; row < dim; ++row) {
        for (let col = 0; col < dim; ++col) {
            if (!cells[row][col].Display)
                emptyCell = cells[row][col];
        }
    }
    return emptyCell;
}

//populate the arrays
function LoadImages() {

    let puzzleCount = document.getElementById("difficulty").length; //length of the select box
    for (let i = 0; i < puzzleCount; ++i) {
        let currentDim = document.getElementById("difficulty")[i].value; //dimension of the difficulty

        //add a new empty array to the pics array
        pics.push([]);

        for (let row = 0; row < currentDim; ++row) {
            for (let col = 0; col < currentDim; ++col) {
                let img = new Image();
                img.src = `images/${currentDim}-${row}-${col}.png`;
                pics[i].push(img);
            }
        }
    }
}

function NewPuzzle() {
    let index = document.getElementById("difficulty").selectedIndex; //index of the currently selected puzzle
    dim = Math.sqrt(pics[index].length); //current dimensions
    let puzzle = document.getElementById("puzzle"); //get the reference to the puzzle div
    puzzle.innerHTML = ""; //clear the puzzle div

    //make the master and a working copy from pics array
    master = pics[index].slice();
    let workingArray = master.slice();
    cells = []; //re-initialize cells to an empty array to clear it

    //skip the shuffle if show original is checked
    //otherwise shuffle the puzzle
    if (!document.getElementById("original").checked)
        Shuffle(workingArray);

    let imageIndex = 0; //index iterator for working array

    for (let row = 0; row < dim; ++row) {
        //add an empty array for each row
        cells.push([]);
        for (let col = 0; col < dim; ++col) {
            //create new cell for current image in the working array
            cells[row].push(new Cell(row, col, workingArray[imageIndex++].src));
            //create a new img object in the DOM
            //and set its id according to row and column
            let img = document.createElement("img");
            img.id = `id${row}_${col}`;
            //add the image to the puzzle div
            document.getElementById("puzzle").appendChild(img);
        }
    }
    
    //hide the last cell in the puzzle for the hole
    if (!document.getElementById("original").checked)
        cells[dim - 1][dim - 1].Display = false;

    //set the layout of the puzzle grid according to dimensions
    document.getElementById("puzzle").style.setProperty('grid-template-columns', `repeat(${dim},${pics[index][0].width}px)`);

    //bind each cell to their respective images
    for (let row = 0; row < dim; ++row) {
        for (let col = 0; col < dim; ++col) {
            cells[row][col].Bind();
        }
    }

    ShowGrid();

}

//Fisher-Yates shuffle functions to shuffle the puzzle pieces
function Shuffle(array) {
    //random num b/w a and b inclusive
    //Math.floor(Math.random() * b) + a);

    for (let i = array.length - 1; i >= 0; --i) {
        //generate a random index b/w 0 and current index in the for loop
        let j = Math.floor(Math.random() * (i + 1));

        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;

    }
}

function ShowGrid() {
    //show each cell in the array
    for (let row = 0; row < dim; ++row) {
        for (let col = 0; col < dim; ++col) {
            cells[row][col].Show();
        }
    }
}

function ShowStatus() {

    let imageIndex = 0; //master array iterator

    //match the cells array with master to check for completion
    //return if there is any cell that does not match otherwise proceed
    //with completion steps
    for (let row = 0; row < dim; ++row) {
        for (let col = 0; col < dim; ++col) {
            if (cells[row][col].Url != master[imageIndex++].src)
                return;
        }
    }

    //if here it means the puzzle is solved
    //find empty cell and diplay it
    for (let row = 0; row < dim; ++row) {
        for (let col = 0; col < dim; ++col) {
            if (!cells[row][col].Display)
                cells[row][col].Display = true;

        }
    }

    document.getElementById("winner").style.visibility = "visible";
}

function KeyDown(ev) {
    if (puzzleSolved) return; //puzle solved, return without doing anything
    let empty = FindEmpty(); //empty cell

    switch (ev.keyCode) {

        //left key -> cell to the right of the empty cell moves left
        //row,col <=> row,col + 1
        case 37:
            if (empty.Col == dim - 1) return; //empty is in the right most column nothing to move left
            SwapCells(cells, empty.Row, empty.Col, empty.Row, empty.Col + 1)
            break;

            //up key -> cell below the empty cell moves up
            //row,col <=> row + 1,col
        case 38:
            if (empty.Row == dim - 1) return; //empty in the bottom row nothing to move up
            SwapCells(cells, empty.Row, empty.Col, empty.Row + 1, empty.Col)
            break;

            //right key -> cell to the left of the empty cell moves right
            //row,col <=> row,col - 1
        case 39:
            if (empty.Col == 0) return; //empty in the first column nothing to move right
            SwapCells(cells, empty.Row, empty.Col, empty.Row, empty.Col - 1)
            break;

            //down key -> cell on the top of the empty cell moves down
            //row,col <=> row - 1,col
        case 40: //down key
            if (empty.Row == 0) return; //empty in the first row nothing to move down
            SwapCells(cells, empty.Row, empty.Col, empty.Row - 1, empty.Col)
            break;

            //key pressed not a cursor key, do nothing
        default:
            break;
    }
}

//swaps the urls of the cell at (row1, col1) with the url of the cell at (row2, col2) of the array
function SwapCells(array, row1, col1, row2, col2) {

    let tempUrl = array[row1][col1].Url;
    let tempDisplay = array[row1][col1].Display;

    array[row1][col1].Url = array[row2][col2].Url;
    array[row1][col1].Display = array[row2][col2].Display;

    array[row2][col2].Url = tempUrl;
    array[row2][col2].Display = tempDisplay;

    //show status and grid after each swap
    ShowStatus();
    ShowGrid();
}