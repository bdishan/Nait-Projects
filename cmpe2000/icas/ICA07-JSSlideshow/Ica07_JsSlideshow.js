var picName = ["Fairbanks, Alaska", "Tromsø, Norway", "Lapland, Finland", "Orkney, Scotland", "Yellowknife, Canada"];
var pictureFrame = [];
var picIndex = 0;
var auto = false;
var timerID = 0 


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


window.onload = function()
{
    this.fInit();
    document.getElementById('Previous').onclick = Prev;
    document.getElementById('Next').onclick = Next;
    document.getElementById('PlayPuase').onclick = Auto;
} 



function fInit()
{
    picName.forEach(x => pictureFrame.push( new PicFrame(x, (picName.indexOf(x) + 1))));
    showPic(picIndex);
}

function showPic(index)
{
    //document.getElementById('PicLabel').innerText = pictureFrame[index].displayName;
    document.getElementById('pictureHere').src = pictureFrame[index].Show().src;

    //set te image caption from the names array according to the current index
    document.getElementById("caption").innerText = `${pictureFrame[picIndex].displayName}\nViews = ${++pictureFrame[picIndex].viewCount}`;
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
      // Save returned timerID value
      if(!auto)
      {
        timerID = window.setInterval( Next, 500 ); // start timer, call Move every 500ms, repeat until cleared
        document.getElementById('PlayPuase').value = "Pause";
        auto = true;
      }
      else
      {
        auto = false;
        if( timerID >= 0 ) // is there an active timer running ? 
            window.clearInterval( timerID );    //clear timer
        document.getElementById('PlayPuase').value = "Play";        //update the flavor text
      }
      
}