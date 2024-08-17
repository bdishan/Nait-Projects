<?php
require_once 'functions.php';

if (isset($_POST['submit']) && $_POST['submit'] == 'login' &&
        isset($_POST['username']) && strlen($_POST['username']) > 0 &&
        isset($_POST['password']) && strlen($_POST['password']) > 0) {
    
     $param = array();
    $param['username'] = strip_tags($_POST['username']);
    $param['password'] = strip_tags($_POST['password']);
    $param['response'] = "";
    $param['status'] = false;
    
    $valid = Validate($param);
    
    if ($valid['status']) 
    {
        $username = $param['username'];
        $_SESSION['username'] = $username;
        header("Location: index.php");
        die();
    }
    $serverResponse = $valid['response'];
}

if ($_POST['submit'] =='logout') {
    session_unset();
    $valid['status'] = false;
    session_destroy();
    header("Location: login.php");
    die();
}
?>


<!DOCTYPE html>
<html>
    <head>
        <title>ICA 02 </title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href='https://fonts.googleapis.com/css?family=Black+Ops+One' rel='stylesheet' type='text/css'>
        <link href="style.css" rel="stylesheet" type="text/css"/>

    </head>
    <body>
        <div class='header'><h2>ICA02 - Login</h2></div>
        <div class='site'>
            <form action='login.php' method='post'>
                <table id='table2'>
                    <tbody>
                        <tr>
                            <td>UserName:</td><td><input type='text' placeholder='Supply a username' Name='username'>
                        <tr>
                            <td>Password:</td><td><input type='password' placeholder="Supply your password" Name='password'>
                        </tr>
                        <tr>
                            <td></td><td><input type='submit' value='login' Name='submit' id='Login'></td><td></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <div class='status'>
                <?PHP echo "$serverResponse"; ?>
            </div>
        </div>
        <div class='footer'>
                    <script>document.write('Last Modified: Jan 21 2020' );</script>
        </div>
    </body>
</html>
