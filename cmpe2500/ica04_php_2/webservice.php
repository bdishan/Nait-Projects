<?php
session_start();

require_once "DBUtility.php";

$Data = array();
$statusString = "";



if (
    $_POST["action"] == "AddUser"
    && isset($_POST["user"]) && isset($_POST["pass"])
    && strlen($_POST["user"]) != 0 && strlen($_POST["pass"]) != 0
) {
    $User = strip_tags($_POST["user"]);
    $Pass = strip_tags($_POST["pass"]);

    $Pass = password_hash($Pass, PASSWORD_DEFAULT);
    $rowsaffected = InsertUser($User, $Pass);
    //echo json_encode($rowsaffected);
}



if (
    $_POST["action"] == "DeleteUser"
    && $_POST["userID"] != $_SESSION["userID"]
) {
    $rowsaffected = DeleteUser($_POST["userID"]);
    //  echo json_encode($rowsaffected);
}

if (!isset($_SESSION["username"])) { 
    header("Location:login.php");
    die();
}


GetUsers();
Done();

function Done()
{
    global $Data, $statusString;

    $Response = array();

    $Response["data"] = $Data["data"];
    $Response["status"] = $statusString;

    echo json_encode($Response);
    die();
}


function DeleteUser($ID)
{

    global $statusString;
    $query = "DELETE FROM prj_users" .
        " WHERE userID = $ID";


    $statusString .= "Deleted userID: $ID";



    return $numRows = NONSQLQuery($query);
}

function GetUsers()
{

    global $Data, $statusString;

    $query = "SELECT userID, username, password";
    $query .= " FROM prj_users";

    $num = 0;

    if ($reults = SQLQuery($query)) {

        while ($row = $reults->fetch_assoc()) {

            $Data["data"][$row["userID"]]["{$row["username"]}"] = "{$row["password"]}";
            $num++;
        }
    } else {
        $statusString = "Rows could not be acquired";
        return "Query Error : $query";
    }

    if (strlen($statusString) != 0)
        $statusString .= "<br>Rows Acquired: " . $num;
    else
        $statusString .= "Rows Acquired: " . $num;

    return "Account added succcesfully";
}

function InsertUser($U, $P)
{

    global $statusString;
    $query = "INSERT INTO prj_users (username, password)" .
        " VALUES ('$U','$P')";

    $numRows = NONSQLQuery($query);
    if (strlen($statusString) != 0)
        $statusString .= "<br> Inserted user: $U";
    else
        $statusString .= "Inserted user: $U";


    return $numRows;
}