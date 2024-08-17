<?php
            if(!is_null(filter_input(INPUT_POST, 'size'))  && 
                    strlen(filter_input(INPUT_POST, 'size')) > 0){

                $size = strip_tags($_POST['size']);
                
                if(!is_numeric($size)){
                    echo '<br>' . 'Send a numeric size value!';
                    die();
                }
                $output = "";
                for($row = 0; $row < $size; ++$row)
                {
                    for($col = 0; $col < $size; ++$col){
                        $output .= '* ';
                    }
                    
                    $output .= '<br>';
                }
            }
?>

<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <title>Test</title>
        
    </head>
    <body>
        <form method="post" action="test.php">
            Size: <input type="text" name="size"><br>
            <input type="submit">
        </form>
        <?php
            if(isset($output)){
                echo '<br>' . $output;
            }
            
            foreach($_SERVER as $key=>$value){
                echo $key . ':' . $value . '<br>';
            }
        ?>
        
        
    </body>
</html>
