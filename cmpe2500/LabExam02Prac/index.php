<?php
?>
<!DOCTYPE html>
<html>
    <head>
        <title>CMPE2500 - Practice</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js">
        </script>
        <script src="Demo04.js" type="text/javascript"></script>
    </head>
    <body>
        <div><h1>CMPE2500 - Practice</h1></div>
        <div>
            Msg Filter : <input id="filter" type="text">
            <input id="submit" type="button" value="Get Titles">
            
<!--            ADDED FOR DEMO04 -->
            Msg Insert : <input id="multiplier" type="text">
            <!-- <input id="update" type="button" value="Update Prices"> -->

        </div>
        <br><br>
        <div>
            userID : <input type="text" id="titleID">
            
            msg : <input type="text" id="titleName">
            
            <!-- Price : <input type="text" id="price"> -->
            
            <input type="button" id="add" value="Add Title">
            <br><br>
        </div>
<!--            END OF DEMO04 ADD -->
        <div id="output">
            
        </div>
    </body>
</html>