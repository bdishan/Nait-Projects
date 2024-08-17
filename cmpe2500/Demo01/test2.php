<?php
    require_once "utility.php";
    
    if (!is_null(filter_input(INPUT_POST, 'name'))  && strlen(filter_input(INPUT_POST, 'name')) > 0
        && !is_null(filter_input(INPUT_POST, 'quantity'))  && strlen(filter_input(INPUT_POST, 'quantity')) > 0)
    {
        $name = strip_tags($_POST['name']);
        $quantity = strip_tags($_POST['quantity']);
        
        if (!is_numeric($quantity))
        {
            echo "Send a number for the quantity next time!";
            die();
        }
        
        $stars = MakeArray($quantity);
        
        $output = "";
        $output .= $name . " wants : ";
        for($i = 0; $i < $quantity; ++$i){
            $output .= $stars[$i];
        }
    }

?>
<!DOCTYPE html>
<html>
    <head>
        <title>CMPE2500 - Demo 01 - Form Processing</title>
    </head>
    <body>
        <header>
            <h1>CMPE2500 - Demo 01 - Form Processing</h1><hr/>
        </header>
        <div>
            <form name="simpleForm" action="test2.php" method="post">
                What is your name? : <input name="name" type="text" placeholder="Your Name Here"><br/>
                How many do you want? : <input name="quantity" type="text" placeholder="Number Please"><br/>
                <input type="submit" value="Generate"/>
            </form>
        </div>
        <hr>
        <div>
            <?php
                if (isset($output))
                    echo "Server has returned : " . $output;
                
                
            
            ?>
        </div>
    </body>
</html>
