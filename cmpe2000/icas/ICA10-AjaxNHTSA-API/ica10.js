var manufacturers = ['Honda', 'Toyota', 'BMW', 'Suzuki', 'Yamaha'];
// var types = ['car', 'truck', 'motorcycle', 'mpv'];


$(document).ready(function () {
    populate_Controls();
    $('#Manufactureer').change(requestTypes);
    $('#btnInvoke').click(requestModels);

});

function populate_Controls(ev) {
    //populate the manufacturers
    for (let i = 0; i < manufacturers.length; ++i) {
        let option = document.createElement('option');
        option.value = manufacturers[i].toLowerCase();
        option.innerHTML = manufacturers[i];

        $('#Manufactureer').append(option);
    }

    //populate the years using a loop
    for (let year = 1990; year < 2018; ++year) {
        let option = document.createElement('option');
        option.value = `${year}`;
        option.innerHTML = `${year}`;

        $('#Year').append(option);
    }

    //request dynaic vehicle type population for initial load
    requestTypes();

    //fix the size of the manufacturer select box
    $('#Manufactureer').attr("size", `${manufacturers.length}`);

}

function requestTypes() {
    let make = $('#Manufactureer').val();
    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetVehicleTypesForMake/${make}`;
    let send_data = { format: 'JSON' };

    ajaxRequest(url, 'GET', send_data, 'JSON', populateTypes, errorHandler);
    // requestModels();
}

function populateTypes(data, ajaxStatus) {
    //clear the select before populating
    $('#Type').html("");

    //populate the types 
    for (let i = 0; i < data.Results.length; ++i) {
        let option = document.createElement('option');
        //console.log(data.Results[i].VehicleTypeName)
        
        option.value = data.Results[i].VehicleTypeName;
        option.innerHTML = data.Results[i].VehicleTypeName;
        //console.log(option.value);
        //console.log(option.innerHTML);
        $('#Type').append(option);
    }
}

function requestModels() {
    let make = $('#Manufactureer').val();
    let year = $('#Year').val();
    let type = $('#Type').val();

    let url = `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}/vehicletype/${type}`;
    let send_data = { format: 'json' };

    ajaxRequest(url, 'GET', send_data, 'JSON', populateModels, errorHandler);

    $('#status').html(`Request for:<br>${url}<br>Issued. Please wait...`);

}

function populateModels(data, ajaxStatus) {

    $('#responseData').html("");//clear the div before populating
    $('#modelID').html("");  //clear the model div
    
    //generate and update the new status message
    $('#status').html(`${data.Message}<br>  
                    for search: ${data.SearchCriteria}<br>
                    ${data.Count} records returned`);


    console.log(data.Results); //log the results array for testing

    for (let i = 0; i < data.Results.length; ++i) {
        //make the radio button
        let rb = document.createElement('input');
        rb.name = 'model';
        rb.type = 'radio';
        rb.value = data.Results[i].Model_ID; //assign model id as value for rb

        //make the label and the radio btn to the label
        let lbl = document.createElement('label');
        lbl.appendChild(rb);
        lbl.innerHTML += data.Results[i].Model_Name;

        //create the new div for each label/radio btn combo
        let div = document.createElement('div');
        div.appendChild(lbl);

        //finally add the new div to the existing grid div
        $('#responseData').append(div);
    }

    //bind all radio btns to the click handler
    $('input[type=radio]').click(
        function (ev) {
            $('#modelID').html("Selected Model ID: " + this.value);
        });
}


function errorHandler(reqObj, textStatus, errorThrown) {
    let msg = `Model Request Status: ${textStatus}, Error: ${errorThrown}`;
    $('#responseData').html(""); //clear any previously loaded models upon error
    $('#status').html(msg);
    $('#modelID').html("");  //clear model id div
    console.log(msg);
}



//generic ajax request helper 
function ajaxRequest(url, type, data, dataType, successFunction, errorFunction) {
    $.ajax(url, {
        type: type,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction
    });
}