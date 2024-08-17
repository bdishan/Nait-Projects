<?php
require_once "functions.php";

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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="Messages.js" type="text/javascript"></script>
    <title>Document</title>
</head>

<body>

    <div id="headerstyle">
        <h1 class="font-effect-3d">
            <?php
            echo "ica04-Settings: {$_SESSION["username"]}";
            ?>
        </h1>
    </div>

    <div id="ica2body">
        <div id="ica2">


            <div class="Section">

                <div class="Right"> Filter By User:</div>
                <input type="text" id="Filter" placeholder="Supply a a filter">

                <div class="Full">
                    <button type="submit" name="FilterUser" id="btnSearch" class="FullWidth">Search</button>
                </div>

                <div class="Right"> Message:</div>
                <input type="text" name="SendMessage" placeholder="Enter a message to share">

                <div class="Full">
                    <button type="submit" name="AddMessage" class="FullWidth">send</button>
                </div>

            </div>



            <div class=" Section">
                <div class="Full">
                    <div id="TableHere">
                        <table>
                            <thead>

                            </thead>
                            <tbody>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>


            <div class=" Section">
                <div class="Full">
                    <b>
                        <?php
                        echo "Status:";
                        ?>
                    </b>
                    <div id="status">
                    </div>
                </div>
            </div>

        </div>

</body>

</html>