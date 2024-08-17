let theTimer;
$(function(){

    //body css
    $('body').css({
        display : 'grid',
        'grid-template-columns' : '50vw 50vw',
        'grid-template-rows' : '50vh 50vh',
        
    });

    $('div').each((index,element)=>{
        switch (index) {
            case 0:
                $(element).prop('divType','0');
                $(element).prop('spot','0');
                break;
            case 1:
                $(element).prop('divType','1');
                $(element).prop('spot','1');
                $(element).css({'background-color':'red'});
                break;
            case 2:
                $(element).prop('divType','2');
                $(element).prop('spot','2');
                $(element).css({'background-color':'green'});
                break;
            case 3:
                $(element).prop('divType','3');
                $(element).prop('spot','3');
                $(element).css({'background-color':'blue'});
                break;
        }
    });

    //add slider control to the controller div
    let sliderElem = document.createElement('input');
    $(sliderElem).prop({'type':'range','min':'1','max':'10','value':'1','id':'theSlider'});
    $('.controller').html(sliderElem);

    //add button to controller div
    let but = document.createElement('button');
    $(but).prop({'type':'button','id':'theButton', 'state':'stopped'}).html('Start').click(ButtonClick);
    $('.controller').append(but);

    //mouseover causes text change
    $('.funzies').mouseover(function()
    {
        $(this).append('You like ' + $(this).css('background-color'));
    });
	
	//mouseleave causes text change
	$('.funzies').mouseleave(function()
    {
        $(this).html('You don\'t like ' + $(this).css('background-color'));
    });
    //    $('.funzies').each((index,element)=>{});

    // $('.controller').on('click', function(){

    //     $(this).slideToggle();
    // });
});


function ButtonClick()
{

    //if the button was stopped
    if ($('#theButton').prop('state')  === 'stopped')
    {
        //change button text to stop
        $('#theButton').html('Stop').prop('state','started');

        //start the timer
        theTimer = window.setInterval(MusicalDivs,Number($('#theSlider').val())*1000);
    }
    else //stop the timer
    {
        window.clearInterval(theTimer);
        $('#theButton').html('Start').prop('state','stopped');
    }
    
    return 0;
}

function MusicalDivs()
{
    //play musical divs
    //get all divs and rearrange via css
    $("div").each((index,element) => {
        switch ($(element).prop('spot'))
        {
            case '0':
				$(element).fadeOut(()=>
				{
					$(element).css({'grid-column-start':'2','grid-column-end':'3','grid-row-start':'1','grid-row-end':'2'}).prop('spot','1').fadeIn();
				});
                break;
            case '1':
				$(element).slideUp(()=>
				{
					$(element).css({'grid-column-start':'2','grid-column-end':'3','grid-row-start':'2','grid-row-end':'3'}); 
					$(element).prop('spot','3');
					$(element).slideDown();
				});
                break;
            case '2':
                $(element).hide(()=>
				{
					$(element).css({'grid-column-start':'1','grid-column-end':'2','grid-row-start':'1','grid-row-end':'2'});
					$(element).prop('spot','0');
					$(element).show();
				});
                break;
            case '3':
                $(element).animate({"height":"0%"},()=>
				{
					$(element).css({'grid-column-start':'1','grid-column-end':'2','grid-row-start':'2','grid-row-end':'3'});
					$(element).prop('spot','2');
					$(element).animate({"height":"100%"});
				});
                break;
        }
    });
}