
<?php
    require('./connect.php'); //連接資料庫

    $table = 'users';
    $sql = "CREATE TABLE IF NOT EXISTS " . $table . " (
            ID int NOT NULL AUTO_INCREMENT,
            user varchar(30),
            password varchar(30),
            PRIMARY KEY (ID)
            )";
    if(!$conn->query($sql)===TRUE){
        echo "error creating table $table " . $conn->error;
    }

    $username = $_POST['username'];
    $password = $_POST['password'];
    $type = $_POST['type'];

    //註冊
    if($type=='register') {
        //檢查是否已註冊過
        $sql = "SELECT user FROM $table where user = '$username'";
        $result = $conn->query($sql);
        if($result->num_rows>0){
            echo "have registered";
        }
        //新增使用者
        else{
            $sql = "INSERT INTO $table ( user, password ) VALUES ('$username', '$password')";
            if($conn->query($sql)===TRUE){
                echo "welcome, " . $username;
                setcookie('cookie', $username, time()+3600*24);
                $url = './memberBoard.php';
                header("Location: $url");
            } else {
                echo 'INSERT error '. $conn->error;
            }
        }
    } 
    
    //登入
    else {
        $sql = "SELECT user FROM $table WHERE user = '$username'";
        $result = $conn->query($sql);
        if($result->num_rows>0){
            $sql = "SELECT * FROM $table WHERE user='$username' and password='$password'";
            $result = $conn->query($sql);
            if($result->num_rows>0) {
                setcookie('cookie', $username, time()+3600*24);
                echo 'login success';
                $url = './memberBoard.php';
                header("Location: $url");
            }
            else{
                echo 'wrong password';
            }
        } else {
            echo 'login fail';
            echo $conn->error;
        }

    }

/*

    $sql = "SELECT * FROM " . $table . " where users='" . $username . "' and password='" . $password . "'";
    $result = $conn->query($sql);
    if ($result->num_rows>0){
        echo 'r';
        //echo 'Hello, ' . $username . '<br>';
        setcookie('cookie', $username, time()+3600*24);
        $url = './memberBoard.php';
        header("Location: " . $url);
    }else{
        echo 'd';
        $url = './index.html';
        header("Location: " . $url);
        //$sql = 'INSERT INTO ' . $table . '( users, password ) VALUES ' . '( "' . $username . '" , "' . $password .'")';
        if($conn->query($sql)===TRUE){
            echo 'welcome, ' . $username;
        } else{
            echo 'INSERT error '. $conn->error;
        }
    }
*/
?>