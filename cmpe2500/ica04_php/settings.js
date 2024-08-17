/* var testData = {
    data: [{ userID: "123", user: "Kirk", password: "NCC1701" },
        { userID: "667", user: "Spock", password: "Fascinating" }
    ],
    status: "Passed"
} */

$(document).ready(function() {
    $("#add").click(InsertUsers);
    GetUsers();

});

function InsertUsers(){
    var postData={};
    postData["action"]="AddUser";
    postData["user"]=$("#user").val();
    postData["pass"]=$("#pass").val();
    AjaxRequest("titlesWebService.php","post","json",postData,HandleStatus,errorCallback);
}

function DeleteUsers(){
    var postData={};
    postData["action"]="DeleteUser";
    postData["userID"]=$(this).val();
    AjaxRequest("titlesWebService.php","post","json",postData,HandleStatus,errorCallback);
}

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
}

function MakeTable(myArray) {
    let table = $("#MyTable");
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
    td1.appendChild(document.createTextNode("user"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Password"));
    tr1.appendChild(td1);

    table.find("thead").empty();
    table.find("thead").append(tr1);


    for (item in myArray["data"]) {
        let tr = document.createElement("tr");
        let myButon= document.createElement("td");
        let btn = document.createElement("button");
        btn.value=myArray['data'][item]['userID'];
        btn.innerHTML="Delete";
        btn.className="DeleteBtn";
        myButon.appendChild(btn);
        tr.appendChild(myButon);
        console.log(myArray['data'][item]['userID']);
        for (item2 in myArray["data"][item]) {
          
            let td = document.createElement("td");
            td.appendChild(document.createTextNode(myArray["data"][item][item2]));
            tr.appendChild(td);
        }

        table.find("tbody").append(tr);
        $(".DeleteBtn").click(function(){
            var postData={};
            postData["action"]="DeleteUser";
            postData["userID"]=$(this).val();
            console.log("my id: "+$(this).val());
            AjaxRequest("titlesWebService.php","post","json", postData,HandleStatus,errorCallback);
        });

    }
}

function GetUsers(){
    AjaxRequest("titlesWebService.php", "get", "json", "GetUsers", ShowUsers, errorCallback);
}

function HandleStatus(returnData,returnStatus, jqObject){
    console.log(returnData);
    $("#status").html(returnData["status"]);
    GetUsers();

}

function ShowUsers(responseData,status){
    MakeTable(responseData);
}

function errorCallback(ajaxReq, textStatus, errorThrown) {
    $('#myStatus').html('');
    $('#myStatus').append('jsonError: ' + textStatus + " : " + errorThrown);
}