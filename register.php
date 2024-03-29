<?php

require_once 'dbconfig.php';

$conn = DBManager::getConn();

if($_POST)
{
    $user_name      = mysql_real_escape_string($_POST['user_name']);
    $user_email     = mysql_real_escape_string($_POST['user_email']);
    $user_password  = mysql_real_escape_string($_POST['password']);
    $joining_date   = date('Y-m-d H:i:s');
    
    //password_hash see : http://www.php.net/manual/en/function.password-hash.php
    $password   = password_hash( $user_password, PASSWORD_BCRYPT, array('cost' => 11));
    
    try
    {
        $stmt = $db_con->prepare("SELECT * FROM tbl_users WHERE user_email=:email");
        $stmt->execute(array(":email"=>$user_email));
        $count = $stmt->rowCount();
        
        if($count==0){
            $stmt = $db_con->prepare("INSERT INTO tbl_users(user_name,user_email,user_password,joining_date) VALUES(:uname, :email, :pass, :jdate)");
            $stmt->bindParam(":uname",$user_name);
            $stmt->bindParam(":email",$user_email);
            $stmt->bindParam(":pass",$password);
            $stmt->bindParam(":jdate",$joining_date);

            if($stmt->execute())
            {
                echo "registered";
            }
            else
            {
                echo "Query could not execute !";
            }

        }
        else{

            echo "1"; //  not available
        }

    }
    catch(PDOException $e){
        echo $e->getMessage();
    }
}

?>