function UpdateCost()
{
    // get the NumUnits named from element 
    let numUnits = document.myForm.NumUnits;  

    //determine if value is a number 
    if(isNaN(numUnits.value))
    {
        numUnits.style.setProperty("background-color","red");
        return;
    }

    //is a number
    numUnits.style.setProperty("background-color","");

    if(document.myForm.Building.value === "" ||
    isNaN(document.myForm.Cost.value))
    {
        ShowStatus("Please pick a building");
        document.myForm.Cost.value = "0";
        return;
    }

    let totalCost = parseFloat(document.myForm.Building.value) * Number(numUnits.value);
    document.myForm.Cost.value = totalCost.toFixed(2);

}

function ShowStatus(msg)
{
    let statusDiv = document.querySelector('#status');
    statusDiv.innerHTML = msg;
}

function Validate()
{
    //check if numer of units is a number
    let numUnits = document.myForm.NumUnits;
    if(isNaN(numUnits.value))
    {
        numUnits.style.setProperty("background-color","red");
        numUnits.focus();
        numUnits.select();
        ShowStatus("Error : ["+numUnits.value+"] is not valid");
        return false;
    }

    //ensure a building is selected
    if(document.myForm.Building.value === "")
    {
        ShowStatus("Please pick a building type");
        return false;
    }

    if (!document.myForm.Tip.checked) {
        ShowStatus("Please Tip the man!");
        return false;
    }

    if (document.myForm.Parking.value === "0") {
        ShowStatus("No Street Parking!");
        return false;
    }
}

window.onload = function() 
{
    document.myForm.NumUnits.onblur = UpdateCost;

    //bind click for radio buttons 
    let buildings = document.myForm.Building;
    for(let i = 0; i <buildings.length; ++i)
    {
        buildings[i].onclick = this.UpdateCost;
    }

    //tie the form submit to validate function
    document.myForm.onsubmit = Validate;//function() {return false;}; 

    //image move
    let pic = document.querySelector('#iPic');
    pic.style.setProperty('position','relative');
    pic.style.setProperty('left','50px');
    pic.myPickValue = 0; // new user determine field

    pic.onclick = () => {
        let newLeft = pic.style.getPropertyValue('left');
        newLeft = parseInt(newLeft) + 10;
        pic.style.setProperty('left', newLeft + 'px');
        pic.myPickValue += newLeft;
        console.log(pic.myPickValue);
    }
}