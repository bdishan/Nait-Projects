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

if ( isset($_POST["titleID"] ) && isset($_POST["title"] ) && isset($_POST["price"]))
{
    $price = floatval( strip_tags($_POST["price"]) );
    $titleID = strip_tags($_POST["titleID"]);
    $title = strip_tags($_POST["title"]);
    
    $rowsaffected = TestInsert($titleID, $title, $price);
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
    
    $query = "SELECT title_id, title, price";
    $query .= " FROM titles";
    $query .= " WHERE title like '%$filter%'";
    
    $output = "<table><th>TitleID</th>"
            . "<th>Title</th>"
            . "<th>Price</th>";
    if ( $results = mysqlQuery( $query )) 
    {
        while ( $row = $results->fetch_assoc() )
        {
            $output .= "<tr>"
                    . "<td>{$row['title_id']}</td>"
                    . "<td>{$row['title']}</td>"
                    . "<td>{$row['price']}</td>"
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

function TestInsert( $titleID, $title, $price )
{  
    $query = "INSERT INTO titles (title_id, title, price)";
    $query .= " VALUES('$titleID', '$title', $price)";
    
    return $numRows = mysqlNonQuery( $query );
}
// END OF DEMO04 ADD







