
<?php
    require('./connect.php'); //連接資料庫

    $username = $_POST['username'];
    $password = $_POST['password'];
    $type = $_POST['type'];

    //$sql = "SELECT * FROM $table WHERE user = '$username'";
    //echo $sql;
    //$result = $conn->query($sql);
    $table = 'yuchun_hashusers';

    $sql = "SELECT * FROM $table WHERE user=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('s',$username);
    $stmt->execute();
    $result = $stmt->get_result();


    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            if(password_verify($password,$row['password'])){ //驗證密碼
                setcookie('cookie', $row['nickname'], time()+3600*24); //不是設兩個，是只要設 server 給的
                addVertifyCookie($username,$certificateTable);
                $url = './memberBoard.php';
                header("Location: $url");
            } 
        }
    } else{      
?>
    <script>
        confirm('帳號或密碼錯誤')
        location.href="./index.html"
    </script>
<?php
    }

    function addVertifyCookie($username){
        require('./connect.php');
        $sql = "SELECT * FROM $certificateTable WHERE user=?";
        $verfify_stmt = $conn->prepare($sql);
        $verfify_stmt->bind_param('s',$username);
        $verfify_stmt->execute();
        $result = $verfify_stmt->get_result();
        if($result->num_rows>0){
            while($row=$result->fetch_assoc()){
                setcookie('vertify',$row['certificate'], time()+3600*24);//增加驗證碼
                //echo $row['certificate'];
            }
        }
    }

?>