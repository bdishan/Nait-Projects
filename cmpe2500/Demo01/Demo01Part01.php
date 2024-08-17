<?php
    require_once 'utility.php'
?>
<!DOCTYPE html>
<html>
    <head>
        <title>CMPE2500 - Demo01</title>
    </head>
    <body>
        <div>
            <header>
                <h1>CMPE2500 Demo 01 - Introduction to PHP01</h1>
            </header>
        </div>
        <div>
            This is text to prove that the PHP engine will not interfere with it.
            
            <?php
                $myNum = rand(2,20);
                
                echo "<br/><br/>Hi there, myNum" . " = $myNum <br/>";
                
                echo "Your IP address is : " . $_SERVER['REMOTE_ADDR'] . "<br/>";
            ?>
            
            <hr>
            
            <?php
                echo ShowCollection($_SERVER);
            ?>
            
        </div>
    </body>
</html>

