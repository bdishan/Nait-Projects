$(document).ready( function(){
    
    GetTitles();
    
    $("#submit").click(GetTitles);
    
    // ADDED FOR DEMO04
    $("#update").click(UpdatePrices);
    // END OF DEMO04 ADD
    
    $("#add").click(InsertTitle);
});

// ADDED FOR DEMO04
function InsertTitle(){
    var postData = {};
    postData["titleID"] = $("#titleID").val();
    postData["title"] = $("#titleName").val();
    postData["price"] = $("#price").val();
    AjaxCaller("/~jdsilver/cmpe2500/demos/demo4/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);   
};

function UpdatePrices(){
    var postData = {};
    postData["filter"] = $("#filter").val();
    // Need the following extra data piece for changing price
    postData["multiplier"] = $("#multiplier").val();
    AjaxCaller("/~jdsilver/cmpe2500/demos/demo4/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);   
};
// END OF DEMO04 ADD

function GetTitles(){
    var postData = {};
    postData["filter"] = $("#filter").val();
    AjaxCaller("/~jdsilver/cmpe2500/demos/demo4/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);    
};

function AjaxCaller( url, method, returnedDataType, inputData,
                       successCallback, errorCallback ){
    var options = {};
    options["url"] = url;
    options["type"] = method;
    options["dataType"] = returnedDataType;
    options["data"] = inputData;
    options["success"] = successCallback;
    options["error"] = errorCallback;
    
    $.ajax( options );
};

function successCallback ( returnedData, returnedStatus, jqObject ){
    console.log(returnedData);
    $("#output").html(returnedData);
};

function errorCallback ( jqObject, returnedStatus, errorThrown ){
    console.log("Failure has ensued! " + errorThrown + " : " + returnedStatus );
};


