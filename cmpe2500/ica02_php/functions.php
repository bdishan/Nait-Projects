<?php
session_start();
$userTable = array();

$userTable['admin'] = password_hash('god', PASSWORD_DEFAULT);
$userTable['germf'] = password_hash('new123', PASSWORD_DEFAULT);

function Validate($param) {
    global $userTable;
    if (isset($userTable[$param['username']])) 
    {
        if (password_verify($param['password'], $userTable[$param['username']])) {
            $param['response'] = " Hello, {$param['username']} you have been authenticated.";
            $param['status'] = true;
        } 
        
        else
         {
            $param['response'] = "Login UNSUCCESSFUL!!!";
            $param['status'] = false;
        }
    }
    
    else {
        $param['response'] = "Login UNSUCCESSFUL";
        $param['status'] = false;
    }
    return $param;
}