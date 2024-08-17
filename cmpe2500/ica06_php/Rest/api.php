<?php

require_once "RestAPI.php";
require_once "../DBUtility.php";


class ConcreteAPI extends AbstractAPI
{

    // Since we don't allow CORS, we don't need to check Key Tokens
    // We will ensure that the user has logged in using our SESSION authentication
    // Constructor - use to verify our authentication, uses _response
    public function __construct($request, $origin)
    {
        parent::__construct($request);
    }

    /**
     * Example of an Endpoint/MethodName 
     * - ie tags, messages, whatever sub-service we want
     */
    protected function test()
    {
        // TEST BLOCK - comment out once validation to here is verified
        $resp["method"] = $this->method;
        $resp["request"] = $this->request;
        $resp["putfile"] = $this->file;
        $resp["verb"] = $this->verb;
        $resp["args"] = $this->args;
        //return $resp;
        // END TEST BLOCK
        if ($this->method == 'GET') {
            //return $this->verb;       // For testing if-else ladder
            return testGetHandler($this->args);  // Invoke your handler here
        } elseif ($this->method == 'POST') {
            return testPostHandler($this->args); // Invoke your handler here
        } elseif ($this->method == 'DELETE' && count($this->args) == 1) {
            return $this->args[0]; // ID of delete request
        } else {
            return $resp; // DEBUG usage, help determine why failure occurred
            return "Invalid requests";
        }
    }



    protected function messages()
    {
        // TEST BLOCK - comment out once validation to here is verified
        $resp["method"] = $this->method;
        $resp["request"] = $this->request;
        $resp["putfile"] = $this->file;
        $resp["verb"] = $this->verb;
        $resp["args"] = $this->args;
        //return $resp;

        // END TEST BLOCK
        if ($this->method == 'GET') {
            //return $this->verb;       // For testing if-else ladder
            return GetMessages($this->verb);  // Invoke your handler here
        } elseif ($this->method == 'POST') {
            return PostMessages($this->verb); // Invoke your handler here
        } elseif ($this->method == 'DELETE') {
            return DeleteMessage( $this->args[0] ); // ID of delete request
        } else {
            return $resp; // DEBUG usage, help determine why failure occurred
            return "Invalid requests";
        }
    }
}

// The actual functionality block here
try {
    // Construct instance of our derived handler here
    $API = new ConcreteAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    // invoke our dynamic method, should find the endpoint requested.
    echo $API->processAPI();
} catch (Exception $e) {   // OOPs - we have a problem
    echo json_encode(array('error' => $e->getMessage()));
}




function testGetHandler($args)
{
    return "Hello from the GET handler for test";
}

function testPostHandler($args)
{
    return PHPInfo();
}

function GetMessages($verb)
{

    $num = 0;
    $Data = array();
    
    $SendBack["data"] = array();
    $SendBack["status"] = "";

    $query = "SELECT `msgID`, username, `stamp`, `msg` FROM `prj_messages` 
    INNER JOIN prj_users on prj_users.userID = prj_messages.userID 
    where msg like '%$verb%' or username like '%$verb%'";
    //error_log($query);

    if ($reults = SQLQuery($query)) {

        // while ($row = $reults->fetch_assoc()) {

        //     //var_dump($row);
        //     //$Data["data"][$row["userID"]]["{$row["username"]}"] = "{$row["password"]}";
        //     $Data["msgID"] = $row["msgID"];
        //     $Data["username"] = $row["username"];
        //     $Data["msg"] = $row["msg"];
        //     $Data["stamp"] =  $row["stamp"];

        //     //$Data=array();
        //    //array_push($Data,$row["msgID"],$row["username"],$row["msg"],$row["stamp"]);
        //     array_push($Data,$row);
        //    //error_log($row["msg"]);
        //     //array_push("data"=>$SendBack, $Data);
        //     $num++;
        //     //var_dump($row);
        // }
        $Data = $reults->fetch_all(MYSQLI_ASSOC);
        $SendBack['data'] = $Data;
        $num = $reults->num_rows;
    } else {
        $SendBack["status"] = "Rows could not be acquired";
        return "Query Error : $query";
    }

    if (strlen($SendBack["status"]) != 0)
        $SendBack["status"] .= "<br>Rows Acquired: ".$num;
    else
        $SendBack["status"] .= "Rows Acquired: ".$num ;
    //var_dump($SendBack);
    //die();
    //error_log(json_encode($SendBack));
    return $SendBack;
} 



function PostMessages($args)
{

    $num = 0;
    $Data = array();
    // $arg = strip_tags($args);
    $SendBack["data"] = array();
    $SendBack["status"] = "";

    $query = "INSERT INTO `prj_messages` (`msgID`, `userID`, `stamp`, `msg`) 
    VALUES (NULL, {$_SESSION["userID"]}, CURRENT_TIMESTAMP, '$args');";

    if ($reults = NONSQLQuery($query)) {
        
        $Data = $reults->fetch_all(MYSQLI_ASSOC);
        $SendBack['data'] = $Data;
        //$Data = $reults->fetch_assoc(MYSQLI_ASSOC);
        $num = $reults->num_rows;
    } else {
        $SendBack["status"] = "Rows could not be acquired";
        return "Query Error : $query";
    }

    if (strlen($SendBack["status"]) != 0)
        $SendBack["status"] .= "<br>Rows Acquired: ".$num;
    else
        $SendBack["status"] .= "Rows Acquired: ".$num ;
    return $SendBack;
} 

function DeleteMessage($msgID)
{
    
    $SendBack["status"] = "Sucess";
    //$query = "DELETE FROM `prj_messages` WHERE `msgID` = '$args';";
    $query = <<<EOD
DELETE FROM `prj_messages`
WHERE `prj_messages`.`msgID` = $msgID
EOD;

    NONSQLQuery($query);
    //error_log("Query complete");
    //if($reults)
      //  error_log("result = true");
    //$constraintID = $mysql_connect->real_escape_string($filter);
    // $query = "DELETE FROM `prj_messages` WHERE `msgID` = {$args};";
    // if ($reults = NONSQLQuery($query)) {
    //     $Data = $reults->fetch_assoc(MYSQLI_ASSOC);
    //     $num = $reults->num_rows;
    // } else {
    //     $SendBack["status"] = "Rows could not be acquired";
    //     return "Query Error : $query";
    // }

    // if (strlen($SendBack["status"]) != 0)
    //     $SendBack["status"] .= "<br>Rows Acquired: ".$num;
    // else
    //     $SendBack["status"] .= "Rows Acquired: ".$num ;
    // return $SendBack;
    return $SendBack;
} 

