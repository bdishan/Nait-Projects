<?php

// In a future run I will be rewriting this file.  I think it has gone through a few 
// revisions and not all of it makes sense anymore.

$mysql_connection = null;
$mysql_response = array();
// $mysql_status = "";  This variable is not really used anymore, but may be later
//                      on rewrite.

mysqlConnect();

function mysqlConnect()
{
    global $mysql_connection, $mysql_response;
    
    $mysql_connection = new mysqli("localhost", "jdsilver_temp", 
                                                "testpassword", "jdsilver_titles");
    
    if ( $mysql_connection->connect_error )
    {
        $mysql_response[] = 'Connect error (' . $mysql_connection->connect_errno . ') '
                                    . $mysql_connection->connect_error;
        
        echo json_encode($mysql_response);
        die();
    }   
}

function mysqlQuery ( $query )
{
    global $mysql_connection, $mysql_response;
    
    $results = false;
    
    // I adjusted this part to just spit out an error and die so we know it happens 
    // at the database level.
    if ( $mysql_connection == null )
    {
        $mysql_response[] = "No active database connection!";
        echo json_encode($mysql_response);
        die();
    }
    
    // $results will be a results object if query was successful, false if not.
    if (!($results = $mysql_connection->query( $query )))
    {
        $mysql_response[] = "Query Error {$mysql_connection->errno} : " .
                                "{$mysql_connection->error}";
        echo json_encode($mysql_response);
        die();
    }
    
    return $results;
}


// ADDED FOR DEMO04
function mysqlNonQuery ( $query )
{
    global $mysql_connection, $mysql_response;
      
    // I adjusted this part to just spit out an error and die so we know it happens 
    // at the database level.
    if ( $mysql_connection == null )
    {
        $mysql_response[] = "No active database connection!";
        echo json_encode($mysql_response);
        die();
    }
    
    // query will only return true or false when no result set is to be returned
    if (!($mysql_connection->query( $query )))
    {
        $mysql_response[] = "Query Error {$mysql_connection->errno} : " .
                                "{$mysql_connection->error}";
        echo json_encode($mysql_response);
        die();
    }
    
    return $mysql_connection->affected_rows;
}
// END OF DEMO04 ADD






