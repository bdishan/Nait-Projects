<?php
//session_start();

require_once "DBUtility.php";
//require_once "webservice.php";


$userTable = array();

$UserID = array();
Accounts();



function Validate($validate)
{


    global $userTable,$UserID;
    if(!isset($userTable[$validate["username"]]))
    {
        $validate["response"] = "Failed to find  ".$validate["username"];
        $validate["status"] = false;
    }

    else if(password_verify($validate["password"],$userTable[$validate["username"]]))
    {
        $validate["response"] = "Successfully logged in as {$validate["username"]}";
        $validate["status"] = true;

        $validate["userID"] = $UserID[$validate["username"]];


    }
    else
    {
        $validate["response"] = "Wrong password";
        $validate["status"] = false;
    }

    
    return $validate;
}


function Accounts()
{

    global  $userTable,$UserID;


    $query = "SELECT userID, username, password";
    $query .= " FROM prj_users";

  
    
    if($reults = SQLQuery($query))
    {

        while($row = $reults->fetch_assoc())
        {
            $userTable["{$row["username"]}"] = "{$row["password"]}";
       
         $UserID[$row['username']] = $row["userID"];
        }
    }
    else
    {
        return "Query Error : $query";
    }
    return "Account added succcesfully";


}
?>