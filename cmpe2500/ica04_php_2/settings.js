// var testData = {
//     data: [{ userID: "123", username: "Kirk", password: "NCC1701" },
//         { userID: "667", username: "Spock", password: "Fascinating" }
//     ],
//     status: "Passed"
// };
$(document).ready(function()
{
    GetUsers();
    $("#btnAddUser").click(AddNewUser);

});


function DeleteUser() {
    var postData = {};
    postData["action"] = "DeleteUser";
    postData["userID"] = $(this).val();

    AjaxCaller("webservice.php",
        "post", "json", postData, HandleStatus, errorCallback);


}


function AddNewUser() {
    var postData = {};
    postData["action"] = "AddUser";
    postData["user"] = $("[name='username']").val();
    postData["pass"] = $("[name='password']").val();



    AjaxCaller("webservice.php",
        "post", "json", postData, HandleStatus, errorCallback);

}


function HandleStatus(returnedData, returnedStatus, jqObject) {

    $("#status").html(returnedData["status"]);
    console.log(returnedData);
    GetUsers2();


}

function TableMaker(arrObject) {



    let TableHere = $("#TableHere")

    TableHere.find("tbody").empty();
    TableHere.find("thead").empty();
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
    td1.appendChild(document.createTextNode("Encrypted Password"));
    tr1.appendChild(td1);

    TableHere.find("thead").append(tr1);

    let td = document.createElement("td");

    for (ele in arrObject["data"]) {

        let tdBTN = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerHTML = "delete";
        btn.value = ele;
        btn.className = "DeleteBtn";
        tdBTN.appendChild(btn);

        let tr = document.createElement("tr");
        tr.appendChild(tdBTN);


        for (ele2 in arrObject["data"][ele]) {


            td = document.createElement("td");
            td.appendChild(document.createTextNode(ele));
            tr.appendChild(td);

            td = document.createElement("td");
            td.appendChild(document.createTextNode(ele2));
            tr.appendChild(td);


            td = document.createElement("td");
            td.appendChild(document.createTextNode(arrObject["data"][ele][ele2]));
            tr.appendChild(td);

        }
        TableHere.find("tbody").append(tr);

    }
    $(".DeleteBtn").click(DeleteUser);
}

function GetUsers() {

    AjaxCaller("webservice.php",
        "GET", "json", "GetUsers", ShowUsers, errorCallback);
}

function ShowUsers(returnedData, returnedStatus, jqObject) {
    TableMaker(returnedData);
    console.log(returnedData);

    var asd = $("#status").html();
    $("#status").html(returnedData["status"]);

}

function GetUsers2() {

    AjaxCaller("webservice.php",
        "GET", "json", "GetUsers", ShowUsers2, errorCallback);
}

function ShowUsers2(returnedData, returnedStatus, jqObject) {
    TableMaker(returnedData);
}


function AjaxCaller(url, method, returnDataType, inputData,
    successCallback, errorCallback) {
    var options = {};
    options["url"] = url;
    options["type"] = method;
    options["dataType"] = returnDataType;
    options["data"] = inputData;
    options["success"] = successCallback;
    options["error"] = errorCallback;

    $.ajax(options);
}

function errorCallback(jqObject, returnedStatus, errorThrown) {
    console.log("Failure has ensued! " + errorThrown + " : " + returnedStatus);
    console.log(jqObject);
}