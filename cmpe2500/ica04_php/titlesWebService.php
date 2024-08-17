<?php
require_once 'dbUtility.php';
require_once 'functions.php';

$dataArray=array();
$myAray=array();

$status= "Fail : Action failed to match";
$status = $_POST["user"]." ". $_POST["pass"]." ".$_POST["action"];


if(isset($_POST["user"]) && strlen($_POST["user"])>0
&& isset($_POST["pass"]) && strlen($_POST["pass"])>0
&& $_POST["action"]=="AddUser")
{

    $user= strip_tags($_POST["user"]);
    $pass= password_hash(strip_tags($_POST["pass"]), PASSWORD_DEFAULT );
    $rowsAffected= TestInsert($user,$pass);
}


if($_POST["action"]=="DeleteUser"&& ($_POST["userID"]!=$_SESSION["userID"])){

    $userID=strip_tags($_POST["userID"]);
    $rowsAffected= TestDelete($userID);
}

Done();


function Done(){
    global $dataArray,$status,$myAray;
    $temp=array();
    $query = "SELECT * FROM prj_users";
    if( $results = mysqlQuery( $query ))
    {
        while ( $row = $results->fetch_assoc() )
        {
        $dataArray['userID']=$row['userID'];
        $dataArray['username']=$row['username'];
        $dataArray['password']=$row['password'];
        array_push($temp,$dataArray);
        }
        $myAray=array("data"=>$temp,"status"=>$status);
    }
    echo json_encode($myAray);
    die();
}


function TestInsert( $user, $pass )
{  
    $query="INSERT INTO prj_users( `username`, `password`) VALUES ('$user','$pass')";
    return $numRows2 = mysqlNonQuery( $query );
}

function TestDelete($userID){
    $query = "DELETE from prj_users WHERE userID='$userID'";
    return $numRows = mysqlNonQuery( $query );
}
function array_push_assoc($array, $key, $value){
    $array[$key] = $value;
    return $array;
}