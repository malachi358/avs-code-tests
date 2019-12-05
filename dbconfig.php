<?php
$db_host = "localhost";
$db_name = "malach6_avs";
$db_user = "malach6_avsadmin";
$db_pass = "Prigia84!";

try{

    $db_con = new PDO("mysql:host={$db_host};dbname={$db_name}",$db_user,$db_pass);
    $db_con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    echo $e->getMessage();
}

?>