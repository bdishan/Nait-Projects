<?php
require_once "dbUtility.php";
$userTable = array();
GetAccount();

function GetAccount(){
    global $mysql_connection, $userTable;
    $i=0;
    $query = "SELECT * FROM prj_users";
    if( $results = mysqlQuery( $query ))
    {
        while ( $row = $results->fetch_assoc() )
        {
        $userTable[$row['username']] = $row['password'];
        }
    }
   
}
function Validate($validate){
    global $userTable;
    if(isset($userTable[$validate["username"]])){
    if(password_verify($validate["password"],$userTable[$validate["username"]])){
        $validate["response"] = "Successfully logged in as {$validate["username"]}";
        $validate["status"] = true;
    }
    else
        {
            $validate["response"] = "Login UNSUCCESSFUL";
            $validate["status"] = false;
        }
    }
    else{
        $validate["response"] = "Failed to find {$userTable}, try again";
        $validate["status"] = false;
    }
        return $validate;
}

?>