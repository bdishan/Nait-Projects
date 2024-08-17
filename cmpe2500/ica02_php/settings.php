<?php
require_once 'functions.php';
if (!isset($_SESSION['username']))
 {
    header("Location: login.php");
    die();
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Settings</title>
        <link href="style.css" rel="stylesheet" type="text/css"/>
        <link href='https://fonts.googleapis.com/css?family=Ubuntu+Condensed|Ranchers&effect=3d' rel='stylesheet' type='text/css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script src="settings.js" type="text/javascript"></script>
        <style>
            legend{font-weight: bold;} 
            fieldset{width:90%; margin-left: auto; margin-right: auto;} 
            th{font-weight: bold; border: dashed 1px blue; } 
            #userAdd{width:80%; margin-left: auto; margin-right: auto;border: dashed 1px blue;}
        </style>
    </head>
    <body>
        <div class="header">
            <h1><?php echo "ICA02 - Settings : {$_SESSION['username']}" ?></h1>
        </div>
        <div class="main">
            <fieldset>
                <legend><i>Add User:</i></legend>
            <form action='login.php' method='get'>
                 <table id='table2'>
                    <tbody>
                        <tr>
                            <td>UserName:</td><td colspan="2"><input type='text' placeholder='Supply a username' Name='username'></td>
                        </tr>
                        <tr>
                            <td>Password:</td><td colspan="2"><input type='text' placeholder="Supply your password" Name='password'></td>
                        </tr>
                        <tr>
                            <td></td><td colspan="2"><input type='submit' value='Add User' Name='add' id='add'></td>
                        </tr>
                    </tbody>
                </table>
            </form>
            </fieldset>

            <div>
            <table id="userAdd" style = "border : 1px solid black" >
            <tr style = "border : 1px solid black">
             <th>OP</th>
             <th>UserID </th>
             <th>UserName</th>
             <th>Encrypted Password </th>
            </tr>
                          
            </table>
            </div>
            
            <div class="status">Status: </div> 
        </div>
        <div class="footer">
                    <script>document.write('Last Modified: Jan 21 2020');</script>
        </div>
        
    </body>
</html>