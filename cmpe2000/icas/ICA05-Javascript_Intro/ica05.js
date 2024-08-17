//on load event binding
window.onload = function() {
    this.document.myForm.btnGoogle.onclick = this.goToGoogle;
    this.document.myForm.btnBack.onclick = this.goBack;
    this.document.myForm.btnDims.onclick = this.getDims;
    document.myForm.btnPrompt.onclick = this.promptTest;
    document.getElementById("btnDaddy").onclick = this.getDaddy;
    document.getElementById("btnGroovy").onclick = this.groovyMan;
    document.getElementById("rangeRows").onchange = this.getRowsCols;
    document.getElementById("rangeCols").onchange = this.getRowsCols;
    document.getElementById("btnMakeTable").onclick = this.callMakeTable;
};

function goToGoogle(ev) {
    window.location = 'https://www.google.com'
};

function goBack(ev) {
    history.back();
};

function getDims(ev) {
    document.myForm.dims.value = "[" + window.innerWidth + ", " + window.innerHeight + "]";

};

function promptTest(ev) {
    var currentVal = this.innerHTML; //get the current button text

    //set/reset current value variable
    if (currentVal == "?") {
        currentVal = "NN";
    }

    //show prompt
    currentVal = window.prompt("Current Value(" + currentVal + "), Enter a new number", "5");

    //if canceled end function here no need to proceed
    if (currentVal === null) {
        return;
    }

    if (isNaN(currentVal)) {
        this.innerHTML = "?"; //not a number display ?
    } else {
        this.innerHTML = currentVal; //is a number display it!
    }
};

function getDaddy(ev) {
    document.getElementById("btnDaddy").innerHTML = navigator.userAgent;
};

function groovyMan(ev) {

    //char spacing 10px
    document.body.style.letterSpacing = "10px";
    //back color pink
    document.body.style.backgroundColor = "pink";
};

function getRowsCols(ev) {
    document.getElementById("tableRows").innerHTML = document.getElementById("rangeRows").value;
    document.getElementById("tableCols").innerHTML = document.getElementById("rangeCols").value;

};

//event handler
function callMakeTable(ev) {
    document.getElementById("tableOutput").innerHTML = makeTable();
};


//helper function
function makeTable(ev) {

    let rows = document.getElementById("rangeRows").value;
    let cols = document.getElementById("rangeCols").value;
    let table = "<table>";

    if (rows > 0 && cols  > 0) {
        for (var i = 0; i <= rows; ++i) {

            table += "<tr>" //a new row starts here

            for (var j = 0; j <= cols; ++j) {

                if (i == 0 && j == 0) { //first col first row = X
                    table += "<th>X</th>";

                } else if (i == 0) { //first row is col headers
                    table += "<th> " + j + " </th>";

                } else if (j == 0) { //first col is row headers
                    table += "<th>" + i + "</th>";

                } else { //every thing is table body so multiply row x col
                    table += "<td>" + (i * j) + "</td>";
                }
            }

            table += "</tr>" //row end tag    
        }

        table += "</table>";
        return table;

    } else {
        let error = "<h1>Rows and Columns must be greater than 0!</h1>";
        return error;
    }
};