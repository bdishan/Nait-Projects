//on load event binding
window.onload = function() {
    //selection change bind to UpdateBrand
    this.document.myForm.brand.onchange = this.UpdateBrand;
    //all radio buttons bind to UpdateModel
    document.myForm.model.forEach(rb => {
        rb.onclick = UpdateModel;
    });

    //bind checkboxes click event to UpdateStatus
    document.myForm.ABS.onclick = (ev) => { this.UpdateStatus(); }
    document.myForm.TCS.onclick = (ev) => { this.UpdateStatus(); }
    document.myForm.FMM.onclick = (ev) => { this.UpdateStatus(); }

    //downpayment textbox bind to UpdateStatus
    document.myForm.downpayment.onchange = (ev) => { this.UpdateStatus(); }

    //submit bind to validate
    document.myForm.onsubmit = Validate;

    //set the bike image size according to select box
    document.querySelector('#bikeImage').style.setProperty('height', window.getComputedStyle(document.myForm.brand).getPropertyValue('height'));

    this.UpdateStatus();
}

function UpdateBrand(ev) {
    //loop through all radio buttons
    document.myForm.model.forEach(rb => {
        rb.checked = false
    });

    UpdateStatus();
}

function UpdateModel(ev) {

    if (this.value < 10000) {
        document.myForm.ABS.checked = false;
        document.myForm.TCS.checked = false;
        document.myForm.FMM.checked = false;
    }

    UpdateStatus();
}


//helper to disable checkboxes for cheap bike
function DisableOptions(ev) {
    document.querySelectorAll('input[type=checkbox]').forEach(c => { c.disabled = true; });
}

//helper to enable checkboxes for cheap bike
function EnableOptions(ev) {
    document.querySelectorAll('input[type=checkbox]').forEach(c => { c.disabled = false; });
}


function UpdateStatus(ev) {
    let status = document.getElementById("status");
    let downPayment = document.myForm.downpayment.value;
    let outString = "Selection : ";
    let optionsCount = 0;
    let optionsCost = 0;
    let balance = 0;
    let radioBtn = document.myForm.model;
    let modelSelected = false;
    let bikeImage = document.querySelector('#bikeImage');

    //image processing
    if (document.myForm.brand.value === "Honda") {
        switch (radioBtn.value) {
            case "5000":
                bikeImage.setAttribute('src', './JapaneseScooter.jpg');
                break;
            case "10000":
                bikeImage.setAttribute('src', './JapaneseNaked.jpg');
                break;
            case "15000":
                bikeImage.setAttribute('src', './JapaneseSport.jpg');
                break;
            default:
                bikeImage.setAttribute('src', './bike.gif')
                break;
        }
    } 
    else if (document.myForm.brand.value === "Ducati") {
        switch (radioBtn.value) {
            case "5000":
                bikeImage.setAttribute('src', './EuroScooter.jpg');
                break;
            case "10000":
                bikeImage.setAttribute('src', './EuroNaked.jpg');
                break;
            case "15000":
                bikeImage.setAttribute('src', './EuroSport.jpg');
                break;
            default:
                bikeImage.setAttribute('src', './bike.gif')
                break;
        }
    } 
    else if (document.myForm.brand.value === "Harley") {
        switch (radioBtn.value) {
            case "5000":
                bikeImage.setAttribute('src', './AmericanScooter.jpg');
                break;
            case "10000":
                bikeImage.setAttribute('src', './AmericanNaked.jpg');
                break;
            case "15000":
                bikeImage.setAttribute('src', './AmericanSport.jpg');
                break;
            default:
                bikeImage.setAttribute('src', './bike.gif')
                break;
        }
    } 
    else {
        bikeImage.setAttribute('src', './bike.gif')
    }

    //enable/disable options for high-end/cheap bikes
    if (radioBtn.value == "5000")
        DisableOptions();
    else
        EnableOptions();

    //any radio checked means model is selected
    document.myForm.model.forEach(rb => { if (rb.checked) modelSelected = true; });

    if (isNaN(downPayment)) {
        status.innerHTML = "Invalid Downpayment";
        document.myForm.downpayment.select();
        document.myForm.downpayment.focus();
        return false;
    }

    if (document.myForm.brand.selectedIndex < 1) {
        status.innerHTML = "No Brand Selected";
        return false;

    }

    if (!modelSelected) {
        status.innerHTML = "No Model Selected"
        return false;
    }



    //count and sum all the selected options cost
    document.querySelectorAll('input[type=checkbox]').forEach(c => {
        if (c.checked) {
            optionsCount++;
            optionsCost += Number(c.value);
        };
    });

    //calculate the balance by model + options cost - down payment
    balance = Number(radioBtn.value) + Number(optionsCost) - Number(document.myForm.downpayment.value);

    //build the output string
    outString += `${document.myForm.brand.value} : $${Number(radioBtn.value).toFixed(2)} : ${optionsCount} option(s) selected. <br>
    $${Number(radioBtn.value).toFixed(2)} + $${Number(optionsCost).toFixed(2)} - $${Number(downPayment).toFixed(2)} = $${Number(balance).toFixed(2)}`;

    //display selection string and return true
    status.innerHTML = outString;
    return true;
}

function Validate() {

    if (UpdateStatus()) {
        let downPayment = document.myForm.downpayment.value;
        let optionsCost = 0;
        let totalCost = 0;
        let minDown = 0;

        //sum all the selected options cost
        document.querySelectorAll('input[type=checkbox]').forEach(c => {
            if (c.checked) { optionsCost += Number(c.value); };
        });
        //total cost of everything
        totalCost = Number(document.myForm.model.value) + optionsCost;

        minDown = totalCost / 2.0; //calculate minimum down payment (half of total cost)

        if (downPayment < minDown) {
            document.getElementById("status").innerHTML += `<br>(Min $${Number(minDown).toFixed(2)})`;
            document.myForm.downpayment.select();
            document.myForm.downpayment.focus();
            return false;
        }

        //everything good place the total cost in hidden field and return
        //document.myForm.totalcost.value = totalCost;
        document.myForm.totalCost.value = totalCost;
        return true;

    } else
        return false;
}