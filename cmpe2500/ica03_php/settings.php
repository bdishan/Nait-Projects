<?php
    require_once 'functions.php';
    if(isset($_POST['submit'])&& $_POST["submit"]=="logout")
    {
        session_unset();
        session_destroy();
        header("Location:index.php");
        die();
    }
    if(isset($_POST["submit"])&&$_POST["submit"]=="login"
        && isset($_POST["username"])&& strlen($_POST["username"])>0
        && isset ($_POST["password"])&& strlen($_POST["password"])>0
        )
    {
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
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="settings.js"></script>
    <link rel="stylesheet" href="ica3.css">
    <title>ICA3- Settings : </title>
</head>
<body>
<div id="main">
    <div class="header text-center">
                    <h2>ICA3-Settings: <?php echo $_SESSION['username'] ?></h2>
                </div>
    <div class="fakeform ">
    <div class="span-two item-centered" >
    <form method="post" class="full-width">
    
    <div class="item-centered">Username:<input type="text" name="userame" /></div>
            
                 <div class="item-centered">Password: <input type="text" name="password" /></div>
                 <div><input type="submit" name="submit" value="Add User" class="full-width"></input></div>
                 </form>
                 </div>
    </div>
    <div class="fakeform">
    <div class="span-two" id="MyTable">
    <table class="full-width tableDec">
        <thead></thead>
        <tbody></tbody>
    </table>
    </div>
    </div>
    <div class="fakeform">
        <div class="span-two item-centered">Status</div>
    </div>
</div>
</body>
</html>