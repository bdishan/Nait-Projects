<?php
require_once 'functions.php';


//checks for existing user
if (!isset($_SESSION["username"])) { 
    header("Location:login.php");
    die();
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

    <div id="headerstyle">
        <h1 class="font-effect-3d">
            <?php
            echo "ica05 Authentication: {$_SESSION["username"]}";
            ?>
        </h1>
    </div>

    <div id="ica2body">
        <div id="ica2">
            <form class="Section" type="post" action="login.php">
                <div class="RedText">

                <a href ="settings.php">
                    Settings
                    <br>
                    Tag Admin

                </a>
                </div>


                <div class="RedText">
                    <a href = "Message.php">
                    Messages
                    <br>
                    RealTime Monitor
                    </a>
                </div>

                <div class="Full">
                    <input type="submit" class="FullWidth" value="Logout" name="submit">

                </div>

            </form>

            <div class=" Section">

                <div class="Full">

                    <b>
                        <?php


                        echo "Page Status:" . $PageStatus;

                        ?>

                    </b>
                </div>
            </div>
        </div>
    </div>
</body>

</html>