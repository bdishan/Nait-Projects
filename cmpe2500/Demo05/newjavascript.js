$(document).ready(function(){
    
    $("#test").click(Testing);
    
});


function Testing(){
  
    var getData = {};
  
    var options = {};
    options["method"] = "POST";
    options["url"] = "https://thor.net.nait.ca/~jdsilver/cmpe2500/demos/demo5/Rest/test";
    options["dataType"] = "text";
    options["data"] = getData;
    options["success"] = successCallback;
    options["error"] = errorCallback;
    $.ajax(options);
    
};

function successCallback(returnedData){
   
    console.log(returnedData);
    
};



function errorCallback(jqObject, returnedStatus, errorThrown){
    console.log(returnedStatus + " : " + errorThrown);

    
};
