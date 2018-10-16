<?php
    require('./connect.php'); //連接資料庫

    $deleteID = $_POST['deleteID'];
    //$tableName = $_POST['tableName'];
    echo $deleteID;    
    //echo $tableName;
    //$sql = "DELETE FROM $tableName WHERE ID=$deleteID";
    //$conn->query($sql);
    
    //移除 hidden 的 $tablename，使用者端無法改變資料庫結構
    $tableName = "yuchun_board";

    $sql = "DELETE FROM $tableName WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$deleteID);
    $stmt->execute();

    $url = './memberBoard.php';
    header("Location: $url");

?>