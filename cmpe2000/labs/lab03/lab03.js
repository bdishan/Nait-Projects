//global variables
var url = '/~demo/cmpe2000/lab03_webservice.php';
var timerID = 0;
var graphCount = 0; //keeps track of the graph bars

$(document).ready(function() {
    //hide all the table divs on load
    $('#table1').hide();
    $('#table2').hide();
    $('#table3').hide();
    $('#graph').hide();
    $('#chkLive').prop('checked', false);


    $('#btnGetAll').click(function() {
        StopLive(); //stop the live update if any other button is pressed
        $('#graph').fadeOut(500);
        $('#table2').fadeOut(500);
        $('#table3').fadeOut(500, function() {
            let data = { 'tagId': 'all' };
            AjaxRequest(url, 'POST', data, 'json', ShowAllTags, ErrorHandler);
        });
    });

    $('#btnAddTag').click(function() {
        StopLive(); //stop the live update if any other button is pressed
        //hide all tables and graph
        $('#graph').fadeOut(500);
        $('#table1').fadeOut(500);
        $('#table2').fadeOut(500);
        $('#table3').fadeOut(500);
        //save the text input elements into to a variable
        let desc = $('#txtTagDesc');
        let min = $('#txtMin');
        let max = $('#txtMax');

        //verify min and max are numbers, return if not
        if (isNaN($(min).val())) {
            $(min).css('background-color', '#e37b7b').select().focus();
            $('#statusOuput').html('Minimum value must be a number!');
            return;
        }
        if (isNaN($(max).val())) {
            $(max).css('background-color', '#e37b7b').select().focus();
            $('#statusOuput').html('Maximum value must be a number!');
            return;
        }

        //build the data object
        let data = {
            'action': 'add',
            'tagDesc': $(desc).val(),
            'tagMin': $(min).val(),
            'tagMax': $(max).val()
        };

        AjaxRequest(url, 'POST', data, 'json', AddTag, ErrorHandler);
    });

    $('#btnGetLive').click(function() {
        StopLive(); //stop the live update if any other button is pressed
        $('#graph').fadeOut(500);
        $('#table1').fadeOut(500);
        $('#table3').fadeOut(500, function() {
            //build the object
            let data = {
                    'action': 'live',
                    'tagDescription': $('#txtTagFilter').val() //get the filter text
                }
                //issue ajax call
            AjaxRequest(url, 'POST', data, 'json', ShowLive, ErrorHandler);
        });
    });

    $('#btnFilter').click(function() {
        StopLive(); //stop the live update if any other button is pressed
        $('#graph').fadeOut(500);
        $('#table1').fadeOut(500);
        $('#table2').fadeOut(500);
        $('#table3').fadeOut(500, function() {

            let data = {
                'action': 'filter',
                'tagDesc': $('#txtTagFilter').val() //get the filter text
            }
            AjaxRequest(url, 'POST', data, 'json', PopulateSelectBox, ErrorHandler);
        });
    });

    $('#btnGetHist').click(function() {
        StopLive(); //stop the live update if any other button is pressed
        $('#graph').fadeOut(500);
        $('#table1').fadeOut(500);
        $('#table2').fadeOut(500, function() {
            //save select box into a variable
            let select = $('#selFilter');

            if ($(select).find('option').length < 1) {
                //update the status div
                $('#statusOuput').html("Filter list is empty! Please add some filters first.");
                return;
            }
            let data = {
                'action': 'historical',
                'tagId': $(select).val() //get the selected filter
            }
            AjaxRequest(url, 'POST', data, 'json', ShowHistorical, ErrorHandler);
        });
    });

    $('#chkLive').click(function() {
        let select = $('#selFilter'); //save the select box reference

        if (this.checked && $(select).find('option').length != 0) {
            ClearGraph();
            timerID = window.setInterval(GetLiveData, 2000);
            $('#statusOuput').html(`Data Requested for ${$(select).find('option:selected').text()}`);
            $('#graph').fadeIn(500);

        } else if ($(select).find('option').length == 0) {
            $('#statusOuput').html('Please provide a filter');
            this.checked = false;
        } else {
            window.clearInterval(timerID);
        }
    });

    $('#selFilter').change(function() {
        StopLive();
        $('#graph').fadeOut(500);
        $('#table1').fadeOut(500);
        $('#table2').fadeOut(500);
        $('#table3').fadeOut(500);
    });

    //reset min/max input box colors on text change
    $('#txtMin').on('input', function() {
        $('#txtMin').css('background-color', 'white');
    });

    $('#txtMax').on('input', function() {
        $('#txtMax').css('background-color', 'white');
    });
});

function ClearGraph() {
    //clear the existing graph data
    $('#lblMin').empty();
    $('#lblMax').empty();
    $('.graph-data').each((i, val) => {
        $(val).empty();
        $(val).css('height', '0%');
    });
    graphCount = 0; // reset the graph bar count
}

function GetLiveData() {
    $('#table1').fadeOut(500);
    $('#table3').fadeOut(500, function() {
        //build the object
        let data = {
                'action': 'live',
                'tagDescription': $('#selFilter option:selected').text() //get the filter text from select box
            }
            //issue ajax call
        AjaxRequest(url, 'POST', data, 'json', ShowLive, ErrorHandler);

    });
}

function ShowHistorical(responseData, status) {
    console.log(responseData);

    //select and save the target table element and table parent div into a variable
    let table = $('#tblHist');
    let tableDiv = $('#table3');
    $(tableDiv).fadeOut(500, function() { //hide current table if visible for fade effect
        //clear the table body before adding data
        $(table).find('tbody').empty();

        //loop through the response data array of objects
        for (let object of responseData.data) {
            //create a row for each object
            let row = document.createElement('tr');

            //build the meter element before changing the rounding of the value property
            let meter = document.createElement('meter');
            meter.min = Number(object['tagMin']);
            meter.max = Number(object['tagMax']);
            meter.value = Number(object['value']);
            let tdBar = document.createElement('td'); //td for the bar column
            tdBar.appendChild(meter); //add the bar to the <td>

            //change the 'value' property to 2 decimal places
            object['value'] = `${Number(object['value']).toFixed(2)}`;

            //create a column entry (<td>) for each property of the object
            for (let prop in object) {
                let td = document.createElement('td');
                let tn = document.createTextNode(object[prop]);
                td.appendChild(tn); //add the textNode to the <td>
                row.appendChild(td);
            }

            //add the td element with meter to the end of the row
            row.appendChild(tdBar);
            $(table).find('tbody').append(row); //add each row to the table body
        }
        $(tableDiv).fadeIn(500); //show the populated table
    });
    //update the status div
    $('#statusOuput').html(responseData.status);
}

function PopulateSelectBox(responseData, status) {
    console.log(responseData);

    //check if no matching data found
    if (responseData.data.length < 1) {
        $('#statusOuput').html('Action:Filter : ' + responseData.status + ' for the chosen filter, please use a different filter.');
        return;
    }

    //grab and save the select box element
    let select = $('#selFilter');
    //clear select box before populating
    $(select).empty();
    //build and add options
    for (let object of responseData.data) {
        //create and populate new option element
        let option = document.createElement('option');
        option.text = object.tagDescription;
        option.value = object.tagId;
        //add option to the select box
        $(select).append(option);
    }

    //update the status div
    $('#statusOuput').html(responseData.status);
}

function ShowLive(responseData, status) {
    console.log(responseData);

    //check if no matching data found
    if (responseData.data.length < 1) {
        $('#statusOuput').html(responseData.status + ', please use a different filter.');
        return;
    }
    //select and save the target table element and table parent div into a variable
    let table = $('#tblLive');
    let tableDiv = $('#table2');

    $(tableDiv).fadeOut(500, function() { //hide current table if visible for fade effect
        //clear the table body before adding data
        $(table).find('tbody').empty();

        //loop through the response data array of objects
        for (let object of responseData.data) {
            //create a row for each object
            let row = document.createElement('tr');

            //save min, max and value in variables for use with the meter and graph
            let min = Number(object['tagMin']);
            let max = Number(object['tagMax']);
            let value = Number(object['value']);


            //build the meter element from the saved values
            let meter = document.createElement('meter');
            meter.min = min;
            meter.max = max;
            meter.value = value;
            let tdBar = document.createElement('td'); //td for the bar column
            tdBar.appendChild(meter); //add the bar to the <td>

            //change the 'value' property to 2 decimal places
            //for showing in the table
            object['value'] = `${Number(object['value']).toFixed(2)}`;

            //create a column entry (<td>) for each property of the object
            for (let prop in object) {
                let td = document.createElement('td');
                let tn = document.createTextNode(object[prop]);
                td.appendChild(tn); //add the textNode to the <td>
                row.appendChild(td);

            }
            row.appendChild(tdBar); //add the meter to the end of each row
            $(table).find('tbody').append(row); //add each row to the table body

            //add the graph only live is checked and timer id running
            if (timerID > 0) {
                if (graphCount < 10) {
                    $('#lblMin').html('Min: ' + min);
                    $('#lblMax').html('Max: ' + max);
                    $('.graph-data').each((i, element) => {
                        if (i == graphCount) {
                            //create a label for each bar on the graph
                            let label = document.createElement('label');
                            $(label).html(Number(value).toFixed(2));
                            $(label).addClass('graph-label');
                            $(label).css('top', `${95 - ((value - min)/(max-min))*100}%`);

                            //create another div to insert into the existing graph data div
                            let div = document.createElement('div');
                            div.appendChild(label);

                            $(div).css({
                                'height': `${100 - ((value - min)/(max-min))*100}%`,
                                'background-color': '#333'
                            });
                            element.appendChild(div);
                            $(element).css('height', '100%');
                        }
                    });
                    graphCount++;
                } else {
                    //now already have enough values and graph bars
                    //move each div (representing a grpah bar) to the left and add new one at the end
                    $('.graph-data').each((i, element) => {
                        if (i < graphCount - 1) {
                            $(element).html($('.graph-data').eq(i + 1).html());
                        } else {
                            $(element).empty(); //clear last graph bar div
                            //add the new graph bar at the end
                            //create a label for each bar on the graph
                            let label = document.createElement('label');
                            $(label).html(Number(value).toFixed(2));
                            $(label).addClass('graph-label');
                            $(label).css('top', `${95 - ((value - min)/(max-min))*100}%`);
                            //create another div to insert into the existing graph data div
                            let div = document.createElement('div');
                            div.appendChild(label);

                            $(div).css({
                                'height': `${100 - ((value - min)/(max-min))*100}%`,
                                'background-color': '#333'
                            });
                            element.appendChild(div);
                            $(element).css('height', '100%');
                        }
                    });
                }
            }

        }
        $(tableDiv).fadeIn(500); //show the populated table

    });
    //update the status div
    $('#statusOuput').html(responseData.status);
}


function AddTag(responseData, status) {
    //update the status div
    $('#statusOuput').html(responseData.status);
}

function ShowAllTags(responseData, status) {
    console.log(responseData);
    //select and save the target table element and table parent div into a variable
    let table = $('#tblAll');
    let tableDiv = $('#table1');
    $(tableDiv).fadeOut(500, function() { //hide current table if visible for fade effect
        //clear the table body before adding data
        $(table).find('tbody').empty();

        //loop through the response data array of objects
        for (let object of responseData.data) {
            //create a row for each object
            let row = document.createElement('tr');
            //create a column entry (<td>) for each property of the object
            for (let prop in object) {
                let td = document.createElement('td');
                let tn = document.createTextNode(object[prop]);
                td.appendChild(tn); //add the textNode to the <td>
                row.appendChild(td);
            }
            $(table).find('tbody').append(row); //add each row to the table body
        }
        $(tableDiv).fadeIn(500); //show the populated table
    });
    //update the status div
    $('#statusOuput').html(responseData.status);
}

function ErrorHandler(reqObj, textStatus, errorThrown) {
    console.log(textStatus);
    console.log(errorThrown);
    console.log(reqObj);

    //update the status div
    $('#statusOuput').html(`${textStatus} : ${errorThrown}`);
}

function StopLive() {
    if (timerID > 0) { //if timer is running stop it
        window.clearInterval(timerID);
        $('#chkLive').prop('checked', false);
    }
}

//generic ajax request helper 
function AjaxRequest(url, type, data, dataType, SuccessFunction, ErrorFunction) {
    $.ajax(url, {
        type: type,
        data: data,
        dataType: dataType,
        success: SuccessFunction,
        error: ErrorFunction
    });
}