<?php
    require_once 'functions.php';
    
    //check for an existing user, no user go to login page
    if ( !isset($_SESSION['user'] ) )
    {
        header("Location:login.php");
        die();
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>
            CMPE2500 - Demo02 - Home Page
        </title>
    </head>
    
    <body>
        <div>
            <h1>CMPE2500 - Demo 02 - Home Page</h1><hr/>
        </div>
        <div>
            <h2><?php echo "Hi {$_SESSION['user']}!"; ?></h2>
            
            <form action="login.php" method="post">
                <input type="submit" name="submit" value="logout">
            </form>
        </div>
        
    </body>
</html>