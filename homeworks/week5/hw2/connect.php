<?php
    $server = 'localhost';
    $adminUsername = 'root';
    $adminPassword = 'root';
    $database = 'mentor_program_db';
    

    $conn = new mysqli($server, $adminUsername, $adminPassword);
    if($conn->connect_error){
        die('connection failed: ' . $conn->connect_error);
    }

    $sql = "CREATE DATABASE IF NOT EXISTS " . $database . " CHARACTER SET utf8 COLLATE utf8_general_ci ";
    if($conn->query($sql)===TRUE){
        //echo 'Database '. $database . ' created successfully' . '<br>';
        $conn = new mysqli($server, $adminUsername, $adminPassword, $database);
        $conn->query("SET NAMES UTF8");
    } else {
        echo 'error creating database: '. $conn->error;
    }
    $sql = "SET TIME_ZONE = '+08:00'";
    $conn->query($sql);
    $sql = "flush privileges";
    $conn->query($sql);
?>