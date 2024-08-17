var testData = {
    data: [{ userID: "123", username: "Kirk", password: "NCC1701" },
        { userID: "667", username: "Spock", password: "Fascinating" }
    ],
    status: "Passed"
};


$(document).ready(function() 
{
    GetUsers();
});



//The generic AJAX request method 
function AjaxRequest(url, method, returnDataType, inputData, 
    successCallback, errorCallback)
{
    var options = {};
    options["url"] = url;
    options["type"] = method;
    options["dataType"] = returnDataType;
    options["data"] = inputData;
    options["success"] = successCallback;
    options["error"] = errorCallback;
    $.ajax( options );
};

function MakeTable(myArray) {
    let table = $("#MyTable")
    table.find("tbody").empty();
    tbody = document.createElement("tbody");
    let tr1 = document.createElement("tr");
    let td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Op"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("userID"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("UserName"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Password"));
    tr1.appendChild(td1);

    table.find("thead").append(tr1);



    for (item in myArray["data"]) {
        let tr = document.createElement("tr");
        tr.appendChild(document.createElement("td"));
        console.log(item);
        for (item2 in myArray["data"][item]) {

            let td = document.createElement("td");
            td.appendChild(document.createTextNode(myArray["data"][item][item2]));
            tr.appendChild(td);


        }

        table.find("tbody").append(tr);

    }
}
    function GetUsers(){
        AjaxRequest("titlesWebService.php",
            "get", "json", "GetUsers", ShowUsers, errorCallback);
    };

    function ShowUsers(responseData,status){
            MakeTable(responseData);
    }
    function errorCallback(ajaxReq, textStatus, errorThrown) {
        $('#myStatus').html('');
        $('#myStatus').append('jsonError: ' + textStatus + " : " + errorThrown);
    }
