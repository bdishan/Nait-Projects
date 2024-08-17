<?php
    //ini_set('session.save_path',realpath(dirname($_SERVER['DOCUMENT_ROOT']) . '/../session'));
    session_start();
    
    $secret = password_hash("testpass", PASSWORD_DEFAULT);
    
    function Validate( $validate )
    {
        global $secret;
        
        if ( password_verify($validate["pass"], $secret ))
        {
            $validate["response"] = "Successfully logged in as {$validate["user"]}";
            $validate["status"] = true;
        }
        else
        {
            $validate["response"] = "Login UNSUCCESSFUL";
            $validate["status"] = false;
        }
        return $validate;
    }
    ?>
