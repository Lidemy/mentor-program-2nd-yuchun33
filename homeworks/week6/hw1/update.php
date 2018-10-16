<?php
    require('./connect.php');

    $updateID = $_POST['updateID'];
    $updateContent = $_POST['updateContent'];
    $tableName = $_POST['tableName'];
    
    //$sql = "UPDATE {$tableName} SET content='{$updateContent}' WHERE ID={$updateID}";
    //echo $sql;
    //$conn->query($sql);

    $sql = "UPDATE $tableName SET content=? WHERE ID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss",$updateContent,$updateID);
    $stmt->execute();

    $url='./memberBoard.php';
    header("Location:$url");


?>