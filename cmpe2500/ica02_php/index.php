<?php
require_once 'functions.php';
if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    die();
}
?>

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Index</title>
        <link href="style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Ubuntu+Condensed|Ranchers&effect=3d' rel='stylesheet' type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
     
    </head>
    <body>
        <div class="header">
            <h1><?php echo "ICA02 Authentication : {$_SESSION['username']}" ?></h1>
        </div>
        <div class="main">
            <table id="table2">
                <tr>
                    <td>
                        <a href="settings.php">Settings</a>
                    </td>
                    <td>
                        <td>
                            <a href="index.php">Messages</a>
                        </td>
                    </td>
                </tr>
                <tr>
                    <td>
                        <a href="index.php">Tag Admin</a>
                    </td>
                    <td>
                        <td>
                            <a href="index.php">RT Monitor</a>
                        </td>
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <form action="login.php" method="post">
                            <input type="submit" name="submit" value="logout" id="logout">
                        </form>
                    </td>
                </tr>
            </table>
            
            
        </div>

    </body>
</html>