<?php
session_start();
$mysql_connection = null;
$mysql_response = array();
$mysql_status = "";

mysqlConnect();

function mysqlConnect()
{
    global $mysql_connection, $mysql_response;
    
            $mysql_connection = new mysqli("localhost", "dburad55_test", "T_BO5kjePgK2","dburad55_CMPE2500");
    
    if($mysql_connection->connect_error)
    {
        $mysql_response[] = 'Connect Error (' . 
                $mysql_connection->connect_errno .
                ') ' . $mysql_connection->connect_error;
        
        echo json_encode($mysql_response);
        die();
    }
}

function mysqlQuery( $query )
{
    global $mysql_connection, $mysql_response, $mysql_status;
    
    $results = false;
    if($mysql_connection == null)
    {
    	echo "No connection!";
        $mysql_status = "No active database connection.";
        return $results;
    }
    
    if(!($results = $mysql_connection->query( $query )))
    {
        $mysql_response[] = "Query Error {$mysql_connection->errno} : " .
                "{mysql_connection->error}";
        
        echo json_encode($mysql_response);
        die();
    }
    
    return $results;
}