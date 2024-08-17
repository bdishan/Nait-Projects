$(document).ready(function()
{
    var testData = { data : [{userID :"123", username : "Kirk", password : "NCC1701"},
                   {userID :"667", username : "Spock", password : "Fascinating"}], status : "Passed"};
 
    //pass an array of testData 
   
    CreateTable(testData);        
});

function CreateTable(test)
{
    var myarray = [];
    myarray = test.data;  //store incoming array data into var
 
     console.log(myarray);

     //create a table var 
     var table = document.getElementById("userAdd");
    
     for(var i = 0 ; i < myarray.length ; ++i)
    {
        name = myarray[i].username;
        ID = myarray[i].userID;
        pass = myarray[i].password;
     
     var row   =  table.insertRow(-1);  //add a row to a table

     
     var cell0 = row.insertCell(0);   //add 1st cell to row // for OP
     var cell1 = row.insertCell(1);   //add 2nd cell for //userID
     var cell2 = row.insertCell(2);   //add 3rd cell for username
     var cell3 = row.insertCell(3);   //add 4th cell for pass

     cell0.style.border = "1px dotted green";
     cell1.style.border = "1px dotted green";
     cell2.style.border = "1px dotted green";
     cell3.style.border = "1px dotted green";
    

    // Insert a new cell (<td>) at the first position of the "new" <tr> element:
    cell0.innerHTML = "";
    cell1.innerHTML = ID;
    cell2.innerHTML = name;
    cell3.innerHTML = pass;
    
   }
}
   