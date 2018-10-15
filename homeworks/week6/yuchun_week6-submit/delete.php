<?php
    require('./connect.php'); //連接資料庫

    $deleteID = $_POST['deleteID'];
    $tableName = $_POST['tableName'];
    echo $deleteID;    
    echo $tableName;
    //$sql = "DELETE FROM $tableName WHERE ID=$deleteID";
    //$conn->query($sql);
    
    $sql = "DELETE FROM $tableName WHERE ID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$deleteID);
    $stmt->execute();

    $url = './memberBoard.php';
    header("Location: $url");

?>