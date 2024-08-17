<?php
    require_once 'functions.php';
    
    //check for an existing user, no user go to login page
    if ( isset($_POST["submit"]) && $_POST["submit"] == "logout" )
    {
        session_unset();
        session_destroy();
        header("Location:index.php");
        die();
    }
    
    if ( isset($_POST["submit"]) && $_POST["submit"] == "login" 
        && isset($_POST["user"])&& strlen($_POST["user"]) > 0
        && isset($_POST["pass"])&& strlen($_POST["pass"]) > 0 )
    {
        $user = strip_tags($_POST["user"]);
        $pass = strip_tags($_POST["pass"]);
        
        //create an array of the validation data for login
        $validate = array();
        
        $validate["user"] = $user;
        $validate["pass"] = $pass;
        $validate["status"] = "";
        $validate["response"] = "";
        
        //check for login $validate["status"] will hold true/false result
        $validate = Validate( $validate );
        
        if ( $validate["status"] )
        {
            $_SESSION["user"] = $validate["user"];
            header("Location:index.php");
            die();
        }
        
        $pageStatus = "Login failed : " . $validate["response"];
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>CMPE2500 - Demo 02 - Login Page</title>
    </head>
    <body>
        <div><h1>CMPE2500 - Demo 02 - Login Page</h1><hr/><div>
        <div>
            <form action="login.php" method="post">
                Username : <input type="text" name="user" /><br/>
                Password : <input type="text" name="pass" /><br/>
                <input type="submit" name="submit" value="login" />
                
            </form>
        </div>
        <?php echo $pageStatus; ?>
    </body>
</html>