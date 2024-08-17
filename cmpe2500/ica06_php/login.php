<?php

require_once "functions.php";
$PageStatus = "No Match";



//check for valid submit and if the submit is for logging out
if (isset($_POST["submit"]) && $_POST["submit"] == "Logout") {
    //frees all session variables currently registered
    session_unset();

    //destroys all data registered to a session
    session_destroy();

    //sends to the location specifies 
    header("Location:index.php");
    die();
}
if (
    isset($_POST["submit"]) && $_POST["submit"] == "Login"
    && isset($_POST["username"]) && strlen($_POST["username"]) > 0
    && isset($_POST["password"]) && strlen($_POST["password"]) > 0
) {



    //strips of any malicious tags
    $username = strip_tags($_POST["username"]);
    $password = strip_tags($_POST["password"]);


    //creating an array used to validate
    $validate = array();
    $validate["username"] = $username;
    $validate["password"] = $password;
    $validate["response"] = "";
    $validate["status"] = false;


    $validate = Validate($validate);

    if ($validate["status"]) {


        $_SESSION["username"] = $validate["username"];

        $_SESSION["userID"] = $validate["userID"];


       // var_dump($_SESSION["userID"]);

       header("Location:index.php");
        die();
      
    }

    $PageStatus = "Login failed:" . $validate["response"];
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
        <h1 class="font-effect-3d">ica06 - Login</h1>
    </div>

    <div id="ica2body">
        <div id="ica2">



            <form class="Section" method="POST" action="login.php">



                <div class="Right"> Username:</div>
                <input type="text" name="username" placeholder ="Supply a username">

                <div class="Right"> Password:</div>
                <input type="password" name="password" placeholder="Supply a password">


                <div class="Full">


                    <input type="submit" class="FullWidth" value="Login" name="submit">
                </div>

            </form>

            <div class=" Section">

                <div class="Full">

                    <b>
                        <?php


                        echo "Page Status:".$PageStatus;

                        ?>

                    </b>
                </div>
            </div>  
        </div>

</body>

</html>