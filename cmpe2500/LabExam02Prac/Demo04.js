$(document).ready( function(){
    
    GetTitles();
    
    $("#submit").click(GetTitles);
    
    // ADDED FOR DEMO04
    $("#update").click(UpdatePrices);
    // END OF DEMO04 ADD
    
        //console.log($((".del")[0]).val());
    $("#add").click(InsertTitle);
});

// ADDED FOR DEMO04
function InsertTitle(){
    var postData = {};
    postData["userID"] = $("#titleID").val();
    postData["msg"] = $("#titleName").val();
    AjaxCaller("/~dburad55/cmpe2500/LabExam02Prac/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);   
};
function DelTitle(){
     
};
function UpdatePrices(){
    var postData = {};
    postData["filter"] = $("#filter").val();
    // Need the following extra data piece for changing price
    postData["multiplier"] = $("#multiplier").val();
    AjaxCaller("/~dburad55/cmpe2500/LabExam02Prac/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);   
};
// END OF DEMO04 ADD

function GetTitles(){
    var postData = {};
    postData["filter"] = $("#filter").val();
    AjaxCaller("/~dburad55/cmpe2500/LabExam02Prac/titlesWebService.php", "post", "html",
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
    //console.log(returnedData);
    $("#output").html(returnedData);

    $(".del").click(function(){
        var postData = {};
        postData["msgID"] = $(this).val();
        postData["action"] = "DELETE";
        //console.log(postData["msgID"]);
        AjaxCaller("/~dburad55/cmpe2500/LabExam02Prac/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);  
    });

    $(".upd").click(function(){
        var postData = {};
        postData["msg"] = $("#multiplier").val();
        postData["msgID"] = $(this).val();
        postData["action"] = "UPDAT";
        //console.log(postData["msgID"]);
        AjaxCaller("/~dburad55/cmpe2500/LabExam02Prac/titlesWebService.php", "post", "html",
                    postData, successCallback, errorCallback);  
    });
};

function errorCallback ( jqObject, returnedStatus, errorThrown ){
    console.log("Failure has ensued! " + errorThrown + " : " + returnedStatus );
};


