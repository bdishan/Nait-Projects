<?php
    session_start();
    
    $SQL_Connection = null;
    $SQL_Response = array();
    $SQL_Status = "";
    
    SQLconnect();
    
    
    function SQLconnect()
    {
        global $SQL_Connection, $SQL_Response;
    
        $SQL_Connection = new mysqli("localhost", "dburad55_test", "T_BO5kjePgK2","dburad55_CMPE2500");
    
        if ($SQL_Connection->connect_error) {
            $SQL_Response[] = "Connect Error (" .
                $SQL_Connection->connect_errno . ") " . $SQL_Connection->connect_error;
            echo json_encode($SQL_Response);
            die();
        }
    }
    
    function SQLQuery($query)
    {
        global $SQL_Connection, $SQL_Response, $SQL_Status;
        $result = false;
    
        if ($SQL_Connection == null) {
            echo "No Connection!";
            $SQL_Status = "No active database connection.";
            return $result;
        }
    
        if (!($result = $SQL_Connection->query($query))) {
            $SQL_Response[] = "Query Error {$SQL_Connection->errno} : "
                . "{$SQL_Connection->error}";
            echo json_encode($SQL_Response);
            die();
        }
        return $result;
    }
    
    function NONSQLQuery($query)
    {
        global $SQL_Connection, $SQL_Response;
        error_log("NONSQL");
        if ($SQL_Connection == null) {
            $SQL_Response[] = "No active database connection.";
            echo json_encode($SQL_Response);
            die();
        }
    
        if (!($SQL_Connection->query($query))) {
            error_log("Query success");
    
            $SQL_Response[] = "Query Error {$SQL_Connection->ernno} : " .
                "{$SQL_Connection->error}";
            error_log("Sql response: $SQL_Response");
            echo json_encode($SQL_Response);
            die();
        }
    
        return $SQL_Connection->affected_rows;
    }