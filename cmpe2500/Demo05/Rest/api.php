<?php
// Put your other needed requires here
require_once 'abstractRestAPI.php';  // include our base abstract class

class ConcreteAPI extends AbstractAPI {

  // Since we don't allow CORS, we don't need to check Key Tokens
  // We will ensure that the user has logged in using our SESSION authentication
  // Constructor - use to verify our authentication, uses _response
  public function __construct($request, $origin) {
    parent::__construct($request);

    // Uncomment for authentication verification with your session
//    if (!isset($_SESSION["userID"]))
//      return $this->_response("Get Lost", 403);
  }

  /**
   * Example of an Endpoint/MethodName 
   * - ie tags, messages, whatever sub-service we want
   */
  protected function test() {
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
      return testGetHandler( $this->args );  // Invoke your handler here
    }
    elseif ($this->method == 'POST') {
      return testPostHandler( $this->args );// Invoke your handler here
    }
    elseif ($this->method == 'DELETE' && count($this->args) == 1 ) {
      return $this->args[0]; // ID of delete request
    }
    else {
      return $resp; // DEBUG usage, help determine why failure occurred
      return "Invalid requests";
    }
  }
}

// The actual functionality block here
try 
{
    // Construct instance of our derived handler here
    $API = new ConcreteAPI($_REQUEST['request'], $_SERVER['HTTP_ORIGIN']);
    // invoke our dynamic method, should find the endpoint requested.
    echo $API->processAPI();
} 
catch (Exception $e) 
{   // OOPs - we have a problem
    echo json_encode(Array('error' => $e->getMessage()));
}


function testGetHandler( $args )
{
    return "Hello from the GET handler for test";
}

function testPostHandler( $args ){
    return PHPInfo();
}

