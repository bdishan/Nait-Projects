$(document).ready( () =>
{
    $('button').css({'transform': 'scale(1,1)'});
    $('#btnPost').click(function (ev) {
        let name = $('.buttons input[type=text]').val(); 
        //equivalent in this case to $('#tbName')
        let arrData = [];
        let maxData = 16;
        let sendData = {}; //send empty data
        //filldata
        for (let i=0; i<maxData; i++)
        {
            arrData.push(Math.floor(Math.random() * 50));
        }
        sendData['Name'] = name;
        sendData['Grades'] = arrData;

        let url = '/~demo/cmpe2000/ica10Demo/ica10_jsonResponse.php';
        let ajaxOptions = {};
        ajaxOptions['url'] = url;
        ajaxOptions['type'] = 'POST';
        ajaxOptions['dataType'] = 'json';
        ajaxOptions['data'] = sendData;
        ajaxOptions['success'] = jsonSuccess;
        ajaxOptions['error'] = jsonError;
        let ajaxReq = $.ajax(ajaxOptions);


    });
}
);

//success function
function jsonSuccess (responseData, responseStatus)
{
    console.log(responseData); //this call will give you all the response data
    Dump(responseData);
    //update our html page with the response
    $('#divStatus').html('JSON Response : ' + responseStatus);
    //make our JSON data presentable...
    let out = $('#divTarget');
    out.html('Name: ' + responseData.Name + "</br>");
    out.append('Average: ' + responseData.Avg + '</br>');
    let ol = document.createElement('ol');
    for(let i = 0; i < responseData.Grades.length; i++)
    {
        //iterate the grade elements
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(
            responseData['Grades'][i]
        ));
        ol.appendChild(li);
    }
    out.append(ol);
}

//error function
function jsonError(ajaxReq, textStatus, errorThrown)
{
    console.log('jsonError: ' + textStatus + ': ' + errorThrown);
    //put any other error handling code here
}

//dump function
function Dump(jsonObject)
{
    for(prop_name in jsonObject)
    {
        console.log('Property Name: ' + prop_name +
         ' = ' + jsonObject[prop_name]);
    }
}