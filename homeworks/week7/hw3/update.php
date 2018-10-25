<?php
    require('./connect.php');

    $updateID = $_POST['updateID'];
    $updateContent = $_POST['updateContent'];
    
    
    //$sql = "UPDATE {$tableName} SET content='{$updateContent}' WHERE ID={$updateID}";
    //echo $sql;
    //$conn->query($sql);
    //移除 hidden 的 $tablename
    $tableName = "yuchun_board";
    $sql = "UPDATE $tableName SET content=? WHERE ID=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss",$updateContent,$updateID);
    $stmt->execute();

    $url='./memberBoard.php';
    header("Location:$url");


?>