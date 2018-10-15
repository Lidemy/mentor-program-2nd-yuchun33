<?php
    require('./connect.php'); //連接資料庫

    $username = $_COOKIE['cookie'];
    echo $username;
    $content = $_POST['content'];
    echo $content;
    $timestamp = date('m-d H:i:s', strtotime('+8 hours'));  
    echo  $timestamp; 
    $parent = $_POST['parent'];
    echo  $parent;


    if($parent == 0){
        $table = 'yuchun_board';
    }
    else{
        $table = 'yuchun_board' . $parent;
        echo $table . '<br>';
    }

    $sql = 'CREATE TABLE IF NOT EXISTS ' . $table . '(
            ID int NOT NULL AUTO_INCREMENT,
            user varchar(30),
            content varchar(255),
            timestamp varchar(30),
            parent int,
            PRIMARY KEY (ID))';
    echo $sql;
    if($conn->query($sql)===TRUE){
        //echo 'Table ' . $table . ' created successfully' . '<br>';
    } else {
        echo 'error creating table: ' . $conn->error . '<br>';
    }

    $sql = "INSERT INTO " . $table . " (user, content, timestamp, parent) VALUES ('{$username}','{$content}','{$timestamp}',{$parent})";
    if($conn->query($sql)===TRUE){
        //echo 'New record created successfully' . '<br>';
    } else {
        echo $sql . '<br>';
        echo 'error creating record: ' . $conn->error . '<br>';
    }
    $url = './memberBoard.php';
    header("Location: " . $url);


?>