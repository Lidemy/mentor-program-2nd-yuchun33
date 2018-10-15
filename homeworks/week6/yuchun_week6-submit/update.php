<?php
    require('./connect.php');

    $updateID = $_POST['updateID'];
    $updateContent = $_POST['updateContent'];
    $tableName = $_POST['tableName'];
    
    echo $updateID;
    echo $updateContent;
    echo $tableName;
    
    //$sql = "UPDATE {$tableName} SET content='{$updateContent}' WHERE ID={$updateID}";
    //echo $sql;
    //$conn->query($sql);

    $sql = "UPDATE $tableName SET content=? WHERE ID=?";
    echo $sql;
    $stmt = $conn->prepare($sql);
    $conn->error;
    $stmt->bind_param("ss",$updateContent,$updateID);
    $stmt->execute();
    $stmt->error;

    $url='./memberBoard.php';
    header("Location:$url");


?>