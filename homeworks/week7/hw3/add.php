<?php
    require('./connect.php'); //連接資料庫

    if(isset($_COOKIE['cookie'])){
        $username = $_COOKIE['cookie'];
        $content = $_POST['content'];
        $timestamp = date('m-d H:i:s', strtotime('+8 hours'));  
        $parent = $_POST['parent'];
    }

    if(!empty($_COOKIE['vertify'])){
        $table = 'yuchun_board';
        $sql = "INSERT INTO $table (user, content, timestamp, parent) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssi",$username,$content,$timestamp,$parent);

        if($stmt->execute()===TRUE){
            $last_id = $conn->insert_id;
            $comment = array(
                "content"=>$_POST['content'],
                "ID"=>$last_id
            );
            echo json_encode($comment);
        } else {
            //echo $sql . '<br>';
            //echo 'error creating record: ' . $conn->error . '<br>';
        }
    }else{
?>
    <script>
        confirm('登入才可以留言ㄛ');
        location.href='./index.html'
    </script>
<?php
    }
    
   

?>