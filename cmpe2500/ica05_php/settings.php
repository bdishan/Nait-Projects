<?php
    require_once "functions.php";
    //require_once "functions.php";
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
    <script src="settings.js" type="text/javascript"></script>
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

                    <div class="Right"> Username:</div>
                    <input type="text" name="username" placeholder="Supply a username">

                    <div class="Right"> Password:</div>
                    <input type="password" name="password" placeholder="Supply a password">


                    <div class="Full">
                        <button type="submit" class="FullWidth" value="AddUser" id="btnAddUser">Add User</button>
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
                    <div id = "status">
                    </div>
                </div>
            </div>
        </div>

</body>

</html>