<?php
    require_once 'functions.php';
if(isset($_POST['submit'])&& $_POST["submit"]=="logout"){
    session_unset();
    session_destroy();
    header("Location:index.php");
    die();
}
if(isset($_POST["submit"])&&$_POST["submit"]=="login"
&& isset($_POST["username"])&& strlen($_POST["username"])>0
&& isset ($_POST["password"])&& strlen($_POST["password"])>0
){

    $user= strip_tags($_POST["username"]);
    $pass=strip_tags($_POST["password"]);
    $validate= array();
    $validate["username"]= $user;
    $validate["password"]=$pass;
    $validate["status"]=false;
    $validate["response"]="";
    $validate=Validate($validate);
    if ( $validate["status"] )
    {
        $_SESSION["username"] = $validate["username"];
        header("Location:index.php");
        die();
    }
    
    $pageStatus = "Login failed : " . $validate["response"];
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="ica3.css">
    <title>ICA2-PHP</title>
</head>
<body>
    <div id="main">
        <div class="header text-center">
                        <h2>ICA3-PHP</h2>
                    </div>
        <div class="fakeform ">
        <div class="span-two item-centered">
            <form action="login.php" method="post" class="full-width">
            
                        <div class="item-centered">Username :<input type="text" name="username" /></div>
                        <div class="item-centered">Password : <input type="text" name="password" /></div>
                        <div><input type="submit" name="submit" value="login" class="full-width"></input></div>
            </form>
        </div>
    </div>

    <div class="fakeform">
        <div class="span-two item-centered"> Status:
        <?php echo $pageStatus; ?>
        </div>
    </div>
    </div>
</body>
</html>