$(document).ready(function(){
    GetTitles();
    $("#submit").click(GetTitles);
});

function GetTitles(){
    var postData = {};
    postData["filter"] = $("#filter").val();
    AjaxCaller("/~jdsilver/cmpe2500/demos/demo3/titlesWebService.php",
        "post", "html", postData, successCallback, errorCallback);
};

function AjaxCaller(url, method, returnDataType, inputData, 
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

function successCallback( returnedData, returnedStatus, jqObject ){
    $("#output").html( returnedData );
    $("#status").html( returnedStatus );
};

function errorCallback( jqObject, returnedStatus, errorThrown ) {
    console.log("Failure has ensued! " + errorThrown + " : " + returnedStatus);
};


