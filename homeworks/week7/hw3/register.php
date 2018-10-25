<?php
    require_once('./connect.php');

    $user = $_POST['user'];
    $password = $_POST['password'];
    $doublecheckpassword = $_POST['doublecheckpassword'];
    $nickname = $_POST['nickname'];
    $table = 'yuchun_hashusers';

    if(!$password==$doublecheckpassword){
?>
    <script>
        confirm($password+' '+$doublecheckpassword+'您的密碼輸入不相同')
        location.href="newregister.php"
    </script>        
<?php
    }

    //是否已註冊過?
    //$sql = "SELECT user FROM $table WHERE user='{$username}'";
    //$result = $conn->query($sql);
    //if($result->num_rows>0){
    
    //改成 preparedstatement
    $sql = "SELECT user FROM $table WHERE user=?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s",$user);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows>0){
?>   
    <script>
        confirm('此帳號已註冊') //是否已註冊過
        window.location.href='./index.html'
    </script>
<?php
    }else{
        $hashPassword = password_hash($password, PASSWORD_DEFAULT);//增加密碼
        //$sql = "INSERT INTO $table ( user, password ) VALUES ('$username', '$hashPassword')";
        //$conn->query($sql);
        //echo $conn->error;
        
        //改成 preparedstatement
        $sql = "INSERT INTO $table (user, password, nickname) VALUES (?,?,?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sss",$user,$hashPassword,$nickname);
        $stmt->execute();

        
        $sql = "INSERT INTO $certificateTable (user, certificate) VALUES (?,?)";
        $cerificate = md5(uniqid(rand(), true));
        $stmt = $conn->prepare($sql);
        if ($stmt) {
            $stmt->bind_param("ss",$user,$cerificate);
            $stmt->execute();  
        } else {
            echo "INSERT Fail";
        }
?>

<div>
    哈溜，成功註冊
    <input type='button' value='登入' onclick=loginPage()>
</div>

<script>
    function loginPage(){
        window.location.href='./index.html'
    }
</script>

<?php
    };
?>