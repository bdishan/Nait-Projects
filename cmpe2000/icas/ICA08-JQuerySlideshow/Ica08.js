var picName = ["Fairbanks, Alaska", "Tromsø, Norway", "Lapland, Finland", "Orkney, Scotland", "Yellowknife, Canada"];
var pictureFrame = [];
var picIndex = 0;
var auto = false;
var timerID = 0;
var first = true;
var time = 900;

function PicFrame(name, number)
{
    this.displayName = name;
    this.viewCount = 0;
    var myImage = new Image();
    myImage.src = './images/pic' + number + '.jpg';
    //myImage.src = './ica07images/pic' + number + '.jpg';
    this.Show = function()
    {
        return myImage;
    }
}

$(document).ready(function(){
//$(window).on("load", function(){
    
    fInit();
    //document.getElementById('Previous').onclick = Prev;
    $("#Previous").click(Prev);
    //document.getElementById('Next').onclick = Next;
    $("#Next").click(Next);
    //document.getElementById('PlayPuase').onclick = Auto;
    $("#PlayPuase").click(Auto);

    //when radio button is clicked (transition time changed) stop and restart the timer with new interval
    $("input[type=radio]").click(function(ev) {
        time = $("input[type=radio]:checked").val();
        //console.log($("input[type=radio]:checked").val());
        console.log(time);
    });
});




function fInit()
{
    picName.forEach(x => pictureFrame.push( new PicFrame(x, (picName.indexOf(x) + 1))));
    showPic(picIndex);
}

function showPic(index)
{
    let effect = $("#animation").val();

    if (!first) {
        if(effect === "f"){
            $("#pictureHere").fadeOut(time/2,()=>{
                $("#pictureHere").prop("src",pictureFrame[index].Show().src);
                $("#caption").html(pictureFrame[picIndex].displayName + "<br> Views =" + ++pictureFrame[picIndex].viewCount);
            });
            $("#pictureHere").fadeIn(time/2);
        }   
        if(effect === "s"){
            $("#pictureHere").slideUp(time/2,()=>{
                $("#pictureHere").prop("src",pictureFrame[index].Show().src);
                $("#caption").html(pictureFrame[picIndex].displayName + "<br> Views =" + ++pictureFrame[picIndex].viewCount);
            });
            $("#pictureHere").slideDown(time/2);
        }  
    }
    else{
        console.log(effect);
        $("#pictureHere").fadeOut(15);
        $("#pictureHere").fadeIn(time);
        $("#caption").html(pictureFrame[picIndex].displayName + "<br> Views =" + ++pictureFrame[picIndex].viewCount);
        first = false;
    }
    
}

function Prev()
{
    console.log('Func init');
    picIndex = picIndex > 0 ? --picIndex : 4;
    showPic(picIndex); 
}

function Next()
{
    console.log('Func init');
    picIndex = picIndex == 4 ? 0 : ++picIndex;
    showPic(picIndex); 
}

function Auto()
{
      if(!auto)
      {
        timerID = window.setInterval( Next, time ); 
        
        //$("#PlayPuase").prop("value","Pause");
        $("#PlayPuase").val("Pause");
        auto = true;
      }
      else
      {
        auto = false;
        if( timerID >= 0 ) 
            window.clearInterval( timerID );    
        //$("#PlayPuase").prop("value","Play");
        $("#PlayPuase").val("Play");
      }
      
}