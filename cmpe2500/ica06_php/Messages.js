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
    $("#btnSend").click(function() {
        PostMessages($("#ADD").val());
    });

    // $(document).on('click',".DeleteBtn",function(){
    //     DeleteMessage($(this).val());
    // });
    
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
        btn.id = arrObject["data"][ele]["msgID"];
        btn.className = "DeleteBtn";
        btn.onclick = function (){DeleteMessage(this)};
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
    // $(document).on('click',".DeleteBtn",function(){
    //     DeleteMessage($(this).val());
    // });
    // $(".DeleteBtn").click(function(){
    //     // var postData = {};
    //     // AjaxCaller("/~dburad55/cmpe2500/ica06_php/Rest/messages/"+$(this).val(), "DELETE", "html",
    //     //             postData, successCallback, errorCallback);  
    //     console.log($(this).val());
    //     DeleteMessage($(this).val());

    // });
    // $(".DeleteBtn").click(function () {
    //     DeleteMessage(this);
    // });
}
function DeleteMessage(button) {
    let btnID = button.id;
    console.log("Deleting Msg: "+btnID);
    let url = "https://thor.net.nait.ca/~dburad55/cmpe2500/ica06_php/Rest/messages/"+btnID;
    console.log("URL: "+url);
    let sendData = {};
    AjaxCaller(url,"DELETE", "json", sendData, HandleStatus, errorCallback);
}

function GetMessages(filterText) {
   
    AjaxCaller("https://thor.net.nait.ca/~dburad55/cmpe2500/ica06_php/Rest/messages/"+ $("#Filter").val(),
        "GET", "json", null, ShowMessages, errorCallback);
}

function PostMessages(filterText) {
    var postData = {};
    AjaxCaller("https://thor.net.nait.ca/~dburad55/cmpe2500/ica06_php/Rest/messages/"+$("#ADD").val(),
        "POST", "json", postData, HandleStatus, errorCallback);
}

function ShowMessages(returnedData, returnedStatus, jqObject) {
    // $(".DeleteBtn").click(function(){
    //     var postData = {};
    //     postData["msgID"] = $(this).val();
    //     postData["action"] = "DELETE";
    //     //console.log(postData["msgID"]);
    //     AjaxCaller("./Message.php", "POST", "html",
    //                 postData, ShowMessages, errorCallback);  
    // });
    TableMaker(returnedData);
    //console.log(returnedData);
    var asd = $("#status").html();
    $("#status").html(returnedData["status"]);
    GetMessages("");
    
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
function HandleStatus(data, AjaxStatus) {
    console.log(data);
    GetMessages("");
    $("#status").html(data["status"]);
}
function errorCallback(jqObject, returnedStatus, errorThrown) {
    console.log("Failure has ensued! " + errorThrown + " : " + returnedStatus);
    console.log(jqObject);
}