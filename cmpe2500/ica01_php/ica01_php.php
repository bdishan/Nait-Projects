<?php
    require_once 'util.php';
    $status = 'Status: ';
    $output = '';
    if (!is_null(filter_input(INPUT_GET, 'name'))  && strlen(filter_input(INPUT_GET, 'name')) > 0
        && !is_null(filter_input(INPUT_GET, 'hobby'))  && strlen(filter_input(INPUT_GET, 'hobby')) > 0)
    {
        $name = strip_tags($_GET['name']);
        $hobby = strip_tags($_GET['hobby']);
        $val = strip_tags($_GET['like']);
            
            
        $output .= $name .  ' really' ;
        for($i = 0; $i < $val; ++$i){
            $output .=  ' really' ;
        }
        $output .=  ' likes '.$hobby ;
        $status .= '+ProcessForm';
        
    }
    
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body>
    <header>
        <h1>
            ica01_php
        </h1>
    </header>

    <div class="container">
        
        <h4>Part I : Server Info</h4>
        <div>
            Your IP Address is: <br>
            $_GET Evaluation: <br>
            $_POST Evaluation
        </div>

        <?php
            echo $_SERVER["REMOTE_ADDR"] . "<br>";
            echo "Found: ".count($_GET).' entry in the $_GET <br>';
            echo "Found: ".count($_POST).' entry in the $_POST <br>';
            $status .= "+ServerInfo";
        ?>
    </div>

    <div class="container">
        
        <h4>Part II : Form Processing</h4>
        <div>
            $_GET Contents: 
        </div>

        <?php
        
            echo '<ul>';
            foreach ($_GET as $key => $value) {
                echo '<li>['.$key.'] = '.$value.'</li>';
            }
            echo '</ul>';
            $status .= "+GETData";
        ?>
    </div>

    <div class="container">
        
        <h4>Part III : Array Generation</h4>
        <div>
            Array Generated:
        </div>

        <?php
            $nu = GenerateNumbers();
            $status .= "+GenerateNumbers";
            //var_dump($nu);
            echo MakeList($nu);
            $status .= "+MakeList+ShowArray";
        ?>
    </div>

    <div class="container">
        
        <h4>Part IV :  Form Processing</h4>
        <div id="ri">
            Name:<br>
            Hobby:<br>
            How Much I like it :
        </div>
            
        <div>
            <form action="ica01_php.php" method="GET">
                <input type="text" name="name"  placeholder="Your Name Here"><br>
                <input type="text" name="hobby"  placeholder="Your Hobby Here"><br>
                <input type="range" name="like"  min="0" max="10"><br>
                <input id="va"  type="submit" name= "submit" value="Go Now !">
            </form>
        </div>
        

    </div>
    <div class="container" >
        <?php
            echo $output;
        ?>
    </div>
    <div class="container">
        <?php
            echo $status;
        ?>
    </div>
    
    <footer>
        &copy;2019 by Dishan Burad
        <br><!-- 
        <script>
            document.write('Last Modified:' + document.lastModified);
        </script> -->
    </footer>
</body>
</html>