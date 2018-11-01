<?php
    require("./conn.php");
    $table = "yuchun_products";
    $query = "SELECT items FROM $table";

    $item1 = $_POST['item1'];
    $item2 = $_POST['item2'];
    $item3 = $_POST['item3'];
    $item4 = $_POST['item4'];
    $item5 = $_POST['item5'];
    $itemName = array("'item1'","'item2'","'item3'","'item4'","'item5'");
    $itemQuantity = array($item1, $item2, $item3, $item4, $item5);

    $conn->autocommit(FALSE);
    $conn->begin_transaction();
    $check = true;
    for($i=0;$i<sizeof($itemQuantity);$i++){
        $sql = "SELECT quantity FROM $table WHERE items=$itemName[$i] FOR UPDATE";
        $result = $conn->query($sql);

        if($result->num_rows>0){
            while($row=$result->fetch_assoc()){
                if($row['quantity']>=$itemQuantity[$i]){
                    $newQuan = $row['quantity']-$itemQuantity[$i];
                    $sql = "UPDATE $table SET quantity=$newQuan WHERE items=$itemName[$i]";
                    $conn->query($sql);
                } else{
                    $check = false;
                }
            }
        }
    }

    if($check){
        $conn->commit();
        echo "成功訂購";
    } else{
        $conn->rollback();
        echo "訂購出錯";
        $check = true;
        ?>
        <a href="./index.html" class='btn'>重新訂購</a>
        <?php
    }
?>
<style>
.btn{
    color: #d17a22;
}
</style>