window.onload = () => {
    //create a table
    let newTable = document.createElement("table");
    //create 5 rows
    for (let i=0; i < 5; i++)
    {
        let newRow = document.createElement("tr");
        //associate to the table
        newTable.appendChild(newRow);

        //inside the table create 4 columns with info
        for (let j=0; j<4; j++)
        {
            let newCol = document.createElement("td");
            let someText = document.createTextNode("Row " + i + " Column " + j);
            newCol.appendChild(someText);
            newRow.appendChild(newCol);
        }
    }
    //add the table to the body
    document.querySelector("body").appendChild(newTable);

    //create some buttons
    let addBorders = document.createElement("button");
    addBorders.type = "button";
    addBorders.id = "addTableBorder";
    addBorders.onclick = AddBorder;
    addBorders.appendChild(document.createTextNode("Add Table Border"));
    //add button to body
    document.querySelector("body").appendChild(addBorders);

    //highlight a row
    let lblRowHighlight = document.createElement("label");
    let lblText = document.createTextNode("Highlight which row?");
    let txtRow = document.createElement("input");
    txtRow.type = "text";
    txtRow.id = "rowNum";
    lblRowHighlight.appendChild(lblText);
    document.querySelector("body").appendChild(lblRowHighlight);
    document.querySelector("body").appendChild(txtRow);
    let highlightRow = document.createElement("button");
    highlightRow.type = "button";
    highlightRow.onclick = HighlightRow;
    document.querySelector("body").appendChild(highlightRow);
    highlightRow.appendChild(document.createTextNode("Highlight!"));

    //do some object stuff
    let tom = new Card("Tom Jones", "to@jones.com","123 Rodeo Drive, Beverly Hills, CA, 90210", "232-998-9090");
    tom.printCard();
}

function AddBorder ()
{
    //find the table... if there's only one table it is easy!
    let theTable = document.querySelector("table");
    theTable.style.border = "3px solid black";


}

function HighlightRow ()
{
    //get the input number
    let rowNum = document.querySelector("#rowNum").value;

    console.log("What is this in the HighlightRow function?:");
    console.log(this);

    console.log("What is this in the arrow function?:");

    //find the matching row to highlight
    //querySelector - can start at a specified object to get its children...!
    let tableRows = document.querySelector("body").querySelectorAll("tr").forEach((value,i) => {
        if (i === Number(rowNum))
        {
            value.style.backgroundColor = "yellow";
        }
        else value.style.backgroundColor = "";
        console.log(this);
    });
    rowNum++;
    console.log("What is this in the anonymous function?:");
    let tableRows2 = document.querySelector("body").querySelectorAll("tr").forEach( function (value,i)  {

        if (i === Number(rowNum))
        {
            value.style.backgroundColor = "pink";
        }
        //else value.style.backgroundColor = "";
        console.log(this);

    });
}

//now an object...
//here's a constructor
//adapted from Sams Teach Yourself book posted on Moodle
function Card(name, email, address, phone)
{
    this.name = name;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.printCard = printCard; //bind to the function
}

//here's a method to print the card info
function printCard()
{
    let name_line = "Name: " + this.name + "<br>\n";
    let email_line = "Email: " + this.email + "<br>\n";
    let address_line = "Address: " + this.address + "<br>\n";
    let phone_line = "Phone: " + this.phone + "<hr>\n";
    console.log(name_line, email_line, address_line, phone_line);
}