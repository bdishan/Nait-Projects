<?php
require_once 'dbUtility.php';

if ( isset($_POST["filter"]) && strlen($_POST["filter"]) > 0){
    $input = strip_tags($_POST["filter"]);
}

echo TestQuery($input);

function TestQuery( $filter ){
    global $mysql_connection;
    
    $filter = $mysql_connection->real_escape_string ( $filter );
    
    $query = "SELECT title_id, price";
    $query .= " FROM titles";
    $query .= " WHERE title like '%$filter%'";
    
    $output = "<ul>";
    if( $results = mysqlQuery( $query ))
    {
        while ( $row = $results->fetch_assoc() )
        {
            $output .= "<li>{$row['title_id']} : {$row['price']}</li>";
        }
    }
    else
    {
        return "Query Error : $query";
    }
    $output .= "</ul>";
    
    return $output;
}
