<?php
    $server = '166.62.28.131';
    $adminUsername = 'student2nd';
    $adminPassword = 'mentorstudent123';
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

    //密碼加密
    $table = 'yuchun_hashusers';
    $sql = "CREATE TABLE IF NOT EXISTS " . $table . " (
            ID int NOT NULL AUTO_INCREMENT,
            user varchar(30),
            password varchar(255),
            nickname varchar(30),
            PRIMARY KEY (ID)
            )";
    if(!$conn->query($sql)===TRUE){
        echo "error creating table $table " . $conn->error;
    }

    //增加由 server 給的 cookie
    $certificateTable = 'yuchun_certificateTable';
    $sql = "CREATE TABLE IF NOT EXISTS " . $certificateTable . " (
        ID int NOT NULL AUTO_INCREMENT,
        user varchar(30),
        certificate varchar(255),
        PRIMARY KEY (ID)
        )";
    if(!$conn->query($sql)===TRUE){
        echo "error creating table $certificateTable " . $conn->error;
    }

    //主留言板
    $table = 'yuchun_board';
    $sql = 'CREATE TABLE IF NOT EXISTS ' . $table . '(
        ID int NOT NULL AUTO_INCREMENT,
        user varchar(30),
        content varchar(255),
        timestamp varchar(30),
        parent int,
        PRIMARY KEY (ID))';
    if($conn->query($sql)===TRUE){
        //echo 'Table ' . $table . ' created successfully' . '<br>';
    } else {
        echo 'error creating table: ' . $conn->error . '<br>';
    }
?>