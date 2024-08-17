var rows = 0;
var cols = 0;
var numbers = [];

$(document).ready(function () {
    updateButton(); //initial table post button update
    $('#btnGet').click(getHobbyAjax);
    $('#rngRows').change(updateButton);
    $('#rngCols').change(updateButton);
    $('#btnMakeTable').click(postMakeTable);
    $('#btnGenerate').click(generateNumbers);  //generate numbers array button
    $('#btnModify').click(postModifyNumbers);  //modify num array button
    $('#btnFail').click(function(ev) {
        let data = {};
        ajaxRequest('/~demo/cnpe2000/ica_Numbers.php','POST',data,'html',successHandler,errorHandler);
    });  
});

function generateNumbers(ev) {
    numbers = [];  //clear array

    for (let i = 0; i < 20; ++i) {
        numbers.push(Math.floor(Math.random() * 20));
    }

    console.log(numbers);

    $('#tgtGenerate').html(""); //clear target div

    for (let n of numbers) {
        $('#tgtGenerate').append(` ${n},`);
    }

}

function postModifyNumbers(ev) {
    let postData = {};
    postData.Numbers = numbers;

    ajaxRequest(' /~demo/cmpe2000/ica_Numbers.php', 'POST', postData, 'html', populateArray, errorHandler);
}

function populateArray(numStr) { //success function for post for the array part
    console.log(numStr);

    $('#tgtModify').html(numStr);
}

function updateButton(ev) {
    rows = Number($('#rngRows').val());
    cols = Number($('#rngCols').val());

    $('#btnMakeTable').html(`Post to Make ${rows}x${cols} Table`);
}

function ajaxRequest(url, type, data, dataType, successFunction, errorFunction) {
    $.ajax(url, {
        type: type,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction
    });
}

function errorHandler(reqObj, textStatus, errorThrown) {
    let msg = `status: ${textStatus}, error: ${errorThrown}`;

    console.log(msg);
    alert(msg);
}

function successHandler(data, textStatus) {
    $('#table').html(data);
    console.log("status: " + textStatus);
}

function postMakeTable(ev) {
    let postData = {};
    postData.RowCount = rows;
    postData.ColumnCount = cols;
    ajaxRequest('/~demo/cmpe2000/ica_Table.php', 'POST', postData, 'html', successHandler, errorHandler);
}

function getHobbyAjax(ev) {
    let data = {};
    data.Name = $('#txtName').val();
    data.Hobby = $('#txtHobby').val();
    data.HowMuch = $('#rngHowMuch').val();

    // for (item in data)  //test
    //     console.log(item + ' : ' + data[item]);

    let ajaxOptions = {};

    ajaxOptions['url'] = '/~demo/cmpe2000/ica_Hobby.php';
    ajaxOptions['type'] = 'GET';
    ajaxOptions['dataType'] = 'html';
    ajaxOptions['data'] = data;

    let retObj = $.ajax(ajaxOptions);

    console.log(retObj);

    retObj.done(function (ev) {
        $('#lblOutput').html(retObj.responseText);
        console.log("GET done: " + retObj.statusText);
    });

    retObj.fail(function (ev) {
        console.log("GET failed: " + retObj.statusText);
    });

    retObj.always(function (ev) {
        console.log("Always: " + retObj.statusText);
    });
}