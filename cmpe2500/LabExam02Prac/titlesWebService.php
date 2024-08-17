<?php
require_once 'dbUtility.php';

// We always need to look for a title filter
if ( isset($_POST["filter"] ) && strlen($_POST["filter"]) > 0)
{
    // Protect against HTML injection
    $input = strip_tags ($_POST["filter"]);
}


// ADDED FOR DEMO04
if ( isset($_POST["multiplier"] ) && strlen($_POST["multiplier"]) > 0)
{
    // PHP should auto-sense data type, but leaving nothing to chance
    $multiplier = floatval( strip_tags($_POST["multiplier"]) );
    // New call to adjust title prices
    $rowsAffected = TestNonQuery($multiplier, $input);
}

if ( isset($_POST["userID"] ) && isset($_POST["msg"] ) )
{
    $userID = strip_tags($_POST["userID"]);
    $msg = strip_tags($_POST["msg"]);
    
    $rowsaffected = TestInsert($userID, $msg);
}

if ( isset($_POST["msgID"] ) && isset($_POST["action"] ) && $_POST["action"] == "DELETE" )
{
    $msgID = strip_tags($_POST["msgID"]);
    $rowsaffected = TestDelete($msgID);
}

if ( isset($_POST["msgID"] )&& isset($_POST["msg"] ) && isset($_POST["action"] ) && $_POST["action"] == "UPDAT" )
{
    $msgID = strip_tags($_POST["msgID"]);
    $msg = strip_tags($_POST["msg"]);
    $rowsaffected = TestUPDATE($msgID,$msg);
}

// autoglobal $rowsAffected only declared in above scope if multiplier sent up
if (isset($rowsAffected)) 
{
    echo TestQuery( $input ) . "<br/>$rowsAffected rows affected!";
}
// END OF DEMO04 ADD

// This else is just the call we had in Demo03 for when Get Titles is pressed
else
{
    echo TestQuery( $input );
}


function TestQuery( $filter )
{
    global $mysql_connection;
    
    // Protect against SQL injection 
    $filter = $mysql_connection->real_escape_string( $filter );
    
    $query = "SELECT msgID, userID, stamp, msg FROM `prj_messages`";
    $query .= " WHERE msg like '%$filter%'";
    
    $output = "<table><th>OP</th><th>msgID</th>"
            . "<th>userID</th>"
            . "<th>stamp</th>"
            . "<th>msg</th>";
    if ( $results = mysqlQuery( $query )) 
    {
        while ( $row = $results->fetch_assoc() )
        {
            $output .= "<tr>"
                    . "<td><button type='submit' class='del' value='{$row["msgID"]}' >Delete</button>
                    <button type='submit' class='upd' value='{$row["msgID"]}' >Update</button></td>"
                    . "<td>{$row['msgID']}</td>"
                    . "<td>{$row['userID']}</td>"
                    . "<td>{$row['stamp']}</td>"
                    . "<td>{$row['msg']}</td>"
                    . "</tr>";
        }
        $output .= "</table>";
    }
   
//    On query failure, we are now using die() in dbUtility so this will never be hit.  
//    else      
//    {
//        return "Query Error : $query";
//    }
    $output .= "</ul>";
    
    return $output;
}

// ADDED FOR DEMO04
function TestNonQuery( $value, $filter )
{  
    $query = "UPDATE titles";
    $query .= " SET price = $value + price";
    $query .= " WHERE title like '%$filter%'";
 
    return $numRows = mysqlNonQuery( $query );
}

function TestInsert( $userID, $msg )
{  
    $query = "INSERT INTO `prj_messages` (`msgID`, `userID`, `stamp`, `msg`) VALUES (NULL, '$userID', CURRENT_TIMESTAMP, '$msg');";
    return $numRows = mysqlNonQuery( $query );
}
function TestDelete( $msgID )
{  
    //$query = "INSERT INTO `prj_messages` (`msgID`, `userID`, `stamp`, `msg`) VALUES (NULL, '$userID', CURRENT_TIMESTAMP, '$msg');";
    $query = "DELETE FROM `prj_messages` WHERE `prj_messages`.`msgID` = $msgID;";
    return $numRows = mysqlNonQuery( $query );
}
function TestUPDATE( $msgID,$msg )
{  
    //$query = "UPDATE `prj_messages` SET `msg` = $msg WHERE `prj_messages`.`msgID` = $msgID;";
    $query = "UPDATE `prj_messages` SET `msg` = '$msg' WHERE `prj_messages`.`msgID` = $msgID;";
    return $numRows = mysqlNonQuery( $query );
}
// END OF DEMO04 ADD







