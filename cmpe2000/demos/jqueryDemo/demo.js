$(document).ready( () => {
    $('button').css({'transform': 'scale(1,1)'});
    $('button').css('opacity', '1.0');
    
    $('#btnGet').click(()=>{
        //anonymous func to handle click event
        let Name = 'Shamus';
        let Score = Math.floor(Math.random()*100);

        //populate our data object
        let getData = {};
        getData['getName'] = Name;
        getData['getScore'] = Score;
        
        for(item in getData)
            console.log(item + ' : ' + getData[item]);

        //url to set/get ajax request
        let url = '/~demo/cmpe2000/ica10_formtest.php';

        let ajaxOptions = {};//init options object
        // Ajax - minimum set of properties
        //url = where to send the request
        //type = GET/POST/PUT/DELETE -> this is a REST interface
        //data = what do we send? must match the web service spec
        //dataType = what response are we expecting? html/json/xml
        //success = callback for successful completion
        //error = callback for error in operation
        ajaxOptions['url'] = url;
        ajaxOptions['type'] = 'GET';
        ajaxOptions['data'] = getData;
        ajaxOptions['dataType'] = 'html'; //get html back
        ajaxOptions['success'] = getSuccess;
        ajaxOptions['error'] = Error;
        $.ajax(ajaxOptions); //doing the ajax request; non-blocking
    });

    $('#btnPost').click(()=> {
        let Name = 'Steven';
        let Scores = [];
        for (let index = 0; index < 10; index++)
        {
            Scores.push (index*index);
        }

        //populate our ajaxData to send
        let postData = {};
        postData['postName'] = Name;
        postData['theScores'] = Scores;

        let url='/~demo/cmpe2000/ica10_formtest.php';
        let ajaxOptions = {};
        ajaxOptions['url'] = url;
        ajaxOptions['type'] = 'POST';
        ajaxOptions['data'] = postData;
        ajaxOptions['dataType'] = 'html';
        ajaxOptions['success'] = getSuccess;
        ajaxOptions['error'] = Error;

        $.ajax(ajaxOptions);
    });
}

)


function getSuccess(ajaxData, responseStatus)
{
    console.log ('getSuccess:' + ajaxData + ': ' + responseStatus);

    //add the response into our webpage!!
    let target = $('#divTarget');
    target.html(ajaxData);
    target.append('<br/> Response status: ' + responseStatus);

}

function Error(ajaxReq, textStatus, errorThrown)
{
    console.log('Error : ' + ajaxReq + ' : ' + textStatus +
        ' : ' + errorThrown);
}