// var testData = {
//     data: [{ userID: "123", username: "Kirk", password: "NCC1701" },
//         { userID: "667", username: "Spock", password: "Fascinating" }
//     ],
//     status: "Passed"
// };

$(document).ready(function() {
    GetMessages("");
    $("#btnSearch").click(function() {
        GetMessages($("#Filter").val());
    });
});



function TableMaker(arrObject) {

    //console.log(arrObject);

    let TableHere = $("#TableHere")

    TableHere.find("tbody").empty();
    TableHere.find("thead").empty();
    tbody = document.createElement("tbody");

    let tr1 = document.createElement("tr");
    let td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Op"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("MessageID"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("User"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("Message"));
    tr1.appendChild(td1);

    td1 = document.createElement("th");
    td1.appendChild(document.createTextNode("TimeStamp"));
    tr1.appendChild(td1);

    TableHere.find("thead").append(tr1);

    let td = document.createElement("td");

    for (ele in arrObject["data"]) {
        let tdBTN = document.createElement("td");
        let btn = document.createElement("button");
        btn.innerHTML = "delete";
       // btn.value = arrObject["data"][ele][0];
       btn.value = arrObject["data"][ele]["msgID"];
        btn.className = "DeleteBtn";
        tdBTN.appendChild(btn);

        let tr = document.createElement("tr");
        tr.appendChild(tdBTN);

        // console.log(ele);

        for (ele2 in arrObject["data"][ele]) {

            td = document.createElement("td");
            td.appendChild(document.createTextNode(arrObject["data"][ele][ele2]));
            tr.appendChild(td);

        }
        TableHere.find("tbody").append(tr);

    }
}

function GetMessages(filterText) {
   
    AjaxCaller("https://thor.net.nait.ca/~dburad55/cmpe2500/ica04_php_2/Rest/messages/"+ $("#Filter").val(),
        "GET", "json", null, ShowMessages, errorCallback);
}

function ShowMessages(returnedData, returnedStatus, jqObject) {
    TableMaker(returnedData);
    console.log(returnedData);

    var asd = $("#status").html();
    $("#status").html(returnedData["status"]);

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