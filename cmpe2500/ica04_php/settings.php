<?php
    require_once 'functions.php';
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
    <title>ICA4- Settings : </title>
</head>
<body>
<div id="main">
    <div class="header text-center">
                    <h2>
                        ICA4-Settings: 
                        <?php echo $_SESSION['username'] ?>
                    </h2>
    </div>
    <div class="fakeform ">
        <div class="span-two item-centered" >
            <div class="full-width">
                <div class="item-centered">
                    Username:<input type="text" name="username" id="user"/>
                </div>
                        
                <div class="item-centered">
                    Password: <input type="text"  name="password" id="pass" />
                </div>

                <div>
                    <button type="submit" id="add" value="AddUser" class="full-width">
                        Add User
                    </button>
                </div>
            </div>
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
        <div class="span-two item-centered" id="status">Status</div>
        <a href=".//">back</a>
    </div>
</div>
</body>
</html>