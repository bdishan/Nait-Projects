<?php
require_once 'dbUtility.php';
require_once 'functions.php';
//$dataArray=$userTable;
$dataArray=array();
$status= "Fail : Action failed to match";

if(isset($_POST["user"])&& strlen($_POST["user"])>0
&& isset($_POST["pass"]) && strlen($_POST["pass"])>0)
{
    $user= strip_tags($_POST["user"]);
    $pass= strip_tags($_POST["pass"]);
    $rowsAffected= TestInsert($user,$pass);
}

Done();
$myAray=array();


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
function array_push_assoc($array, $key, $value){
    $array[$key] = $value;
    return $array;
 }