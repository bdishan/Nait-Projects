<?php
 require_once 'functions.php';

if(!isset($_SESSION['username'])){
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
    <link rel="stylesheet" href="ica3.css">
     <title>ICA3 Authentication :</title>
</head>
<body>
    <div id="main">
        <div class="header text-center">
            <h2>
            ICA3-Authentication: 
            <?php echo $_SESSION['username'] ?>
            </h2>
        </div>
        <div class="fakeform">
            <div>
                <a href="settings.php">Settings <br>Tag Admin</a>
            </div>
            <div class="goright">
                Messages <br>RealTime Monitor
            </div>
            <div class="span-two item-centered">
                <form action="login.php" method="post" class="full-width">
                    <input type="submit" name="submit" value="logout" class="full-width">
                </form>
            </div>
    
        </div>
    </div>

        <div class="fakeform">
            <div class="span-two  item-centered">
                Status
            </div>
        </div>
    </div>
</body>
</html>