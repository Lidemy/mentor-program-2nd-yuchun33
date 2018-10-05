<?php
    $nickname = $_POST['nickname'];
    $content = $_POST['content']

    $server = 'localhost';
    $adminUsername = 'root';
    $adminPassword = 'root';
    $database = 'board';

    if(mysqli_connect($server, $adminUsername, $adminPassword, $database)){
        $conn = new mysqli($server, $adminUsername, $adminPassword, $database);
        $sql = "SELECT * 
                FROM information_schema.tables
                WHERE table_schema = 'yourdb' 
                AND table_name = 'testtable'
                LIMIT 1";
        if($conn->query($sql)===TRUE){
            echo 'exist';
        }else{
            echo 'not exist';
        }
    } else{
        die("connection failed");
    }



?>