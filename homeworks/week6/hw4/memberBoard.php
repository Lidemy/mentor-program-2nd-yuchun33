<!DOCTYPE <!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body{
            box-sizing: border-box;
        }
        body *{
            
            box-sizing: border-box;
            font-size: 16px;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .post,
        .newpost{
            background: white;
            opcacity: 50%;
        }
        .newpost{
            width: 500px;
            display: flex;
            margin: 20 auto;
            box-shadow: 0.5px 0.5px 2px 1px grey;
        }
        .newpost > .avater{
            width: 30px;
            height: 30px;
            border-radius: 30px;
            display: float;
            margin: 10px;
            background: pink;
        }
        .newpost textarea{
            width: 430px;
            border: 0;
            padding: 10px;
        }
        .newpost input[type='submit']{
            position: relative;
            left: 350px;
            height: 30px;
            width: 80px;
            color: white;
            background-color: #3b5998;
            border: 0;
        }
        .post{
            padding: 10px;
            width: 500px;
            box-shadow: 0.5px 0.5px 2px 1px grey;
            margin: 10px auto;
        }
        .main{
            border-bottom: 1px solid gainsboro;
            margin-bottom: 30px;
            padding: 5px;
            position: relative;
        }
        .avater{
            width: 40px;
            height: 40px;
            border-radius: 40px;
            margin-right: 5px;
            background-color: #3b5998;
        }
        .sub{
            padding: 5px;
            position: relative;
        }
        .info{
            display: flex;
            align-items: center;
        }
        .sub .avater{
            width: 30px;
            height: 30px;
            border-radius: 30px;
        }
        .idandcontent{
            border-radius: 15px;
            background-color: aliceblue;
            padding: 8px;
            position: relative;
        }
        .idandcontent *{
            display: inline-block;
        }
        .main__id,
        .sub__id{
            color: #3b5998;
            font-weight: 600px;
        }
        .main__timestamp,
        .sub__timestamp{
            color: grey;
            font-size: 12px;
        }
        .sub__timestamp{
            position: relative;
            left: 40px;
        }
        .addpost{
            padding: 5px;
            display: flex;
            align-items: center;
            margin-top: 10px;    
        }
        .addpost input[type='text']{
            padding: 3px;
            border: 0;
            border: 1px solid gainsboro;
            box-shadow: 0px 0.5px 0.5px 0.5px gainsboro;
            border-radius: 8px;
            width: 450px;
        }
        .addpost > .avater{
            width: 30px;
            height: 30px;
            border-radius: 30px;
            background: pink;
        }
        .subs{
            border-top: 1px solid gainsboro;
        }
        .main__content{
            margin: 10px 0 10px 0;
        }
        .navbar{
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
        .user{
            color: #3b5998;
            font-size: 22px;
            margin-right: 6px;
        }
        .navbar input[type='submit']{
            border: 0;
            position: relative;
            top: 8px;
            padding: 5px;
        }
        .page{
            width: 300px;
            margin: 0 auto;
            display: flex;
            justify-content: center;
        }
        .memberfunction{
            width: 88px;
            position: absolute;
            right: 5px;
            top: 5px;

        }
        .memberfunction input{
            font-size: 14px;
            width: 40px;
            border-radius: 3px;
        }



    </style>

<script>

</script>    
</head>

<body>
    <div class='navbar'>
        <span class='user'>Hello, <?php echo $_COOKIE['cookie'] ?> </span>
        <form action='./logout.php'>
            <input type='submit' value='logout'>
        </form>
    </div>
    <div class='newpost'>
        <div class='avater'></div>
        <form method="POST" action='./add.php'>
            <!--<input type='text' name='nickname' placeholder="暱稱">-->
            <textarea name='content' placeholder="在想些什麼？"></textarea>
            <input type='text' name='parent' value='0', style="display:none">
            <input type='submit' value='發佈'>
        </form>
    </div>

    <div class=container>
<?php
    require('./connect.php');
    $page = 1;
    if(isset($_GET['page'])){
        $page = $_GET['page'];
    }else{
        $page = 1;
    };
    $sql = "show variables like '%time_zone%'";
    $conn->query($sql);
    $init = ($page-1)*10;
    $sql = 'SELECT * FROM yuchun_board ORDER BY timestamp DESC LIMIT ' .$init . ',10';
    $result = $conn->query($sql);
    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
            echo"
                <div class='post'>
                <div class='main'>
                    <div class='info'>
                        <div class='avater'></div>
                        <div class='idandtime'>
                            <div class='main__id'>{$row['user']}</div>
                            <div class='main__timestamp'>{$row['timestamp']}</div>
                            <div>{$row['ID']}</div>";
            echo "</div>";
            echo "</div>";

            //刪除及編輯
            if($row['user']==$_COOKIE['cookie']){
                echo "<div class='memberfunction'>";
                echo "<input type='button' id='delete{$row['ID']}' name='delete' value='刪除' onclick='checkDelete({$row['ID']},\"yuchun_board\")'>";
                echo "<input type='button' id='update{$row['ID']}' name='update' value='編輯' onclick='updateMessage({$row['ID']},\"yuchun_board\")'>";
                echo "</div>";
            } 
            
            //編輯框
            echo "<div class='edityuchun_board{$row['ID']}' style='display:none'>
                <form method='POST' action='./update.php'>
                <input type='hidden' name='updateID' value='{$row['ID']}' >
                <input type='hidden' name='tableName' value='yuchun_board' >
                <input type='text' name='updateContent'>
                <input type='submit' value='送出'>
                </form>
                </div>";

            echo "<div class='main__content'>";
            
            //==============防止 XSS==============
            echo htmlspecialchars($row['content']);
            echo "</div>
                </div>";
            addChildMessage($conn,$row['ID']);          
        }
    }

    
?>
</div>

<?php
    function addChildMessage($conn,$parent){
        echo "<div class='subs'>";
        $subsql = 'SELECT * FROM yuchun_board'.$parent.' ORDER BY timestamp DESC';
        if ($result = $conn->query($subsql)){
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
        echo"
        <div class='sub'>
            <div class='info'>
                <div class='avater'></div>
                <span class='idandcontent'>
                    <div class='sub__id'>{$row['user']}</div>
                    <div class='sub__content'>";
                    
        //==============防止 XSS==============
        echo htmlspecialchars($row['content']);
        echo "</div>
                </span>";
        echo"
        </div>
            <span class='sub__timestamp'>{$row['timestamp']}</span>";
        if($row['user']==$_COOKIE['cookie']){
            echo "<div class='memberfunction'>";
            echo "<input type='button' value='刪除' onclick='checkDelete({$row['ID']},\"yuchun_board\"+{$parent})'>";
            echo "<input type='button' id='update{$row['ID']}' name='update' value='編輯' onclick='updateMessage({$row['ID']},\"yuchun_board\"+{$parent})'>";
            echo "</div>";
        }
        
        //編輯框
        echo "<div class='edityuchun_board{$parent}{$row['ID']}' style='display:none'>
        <form method='POST' action='./update.php'>
        <input type='hidden' name='updateID' value='{$row['ID']}'>
        <input type='hidden' name='tableName' value='yuchun_board{$parent}'>
        <input type='text' name='updateContent'>
        <input type='submit' value='送出'>
        </form>
        </div>";
        echo "</div>";

        }
            }    
        }
?>
        </div>

<?php
        //留言者
        $sql = "SELECT user FROM yuchun_board WHERE ID={$parent}";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();

        echo "<form method='POST' action='./add.php'>
                <div class='addpost'>
                    <div class='avater'></div>
                    <input type='text' name='content' placeholder='留言' oninput='detectUser(\"{$row['user']}\",\"{$_COOKIE['cookie']}\")'>
                    <input type='text' name='parent' value={$parent} style='display:none'>
                    <input type='submit' value='送出' style='display:none'>
                </div>
            </form></div>";
        
    }
?>

</div>
</body>

<div class='page'>
<?php
    $query = "SELECT COUNT(*) c FROM yuchun_board";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);
    $devide = $row['c']/10+1;
    for($i=1; $i<(int)$devide+1; $i++){
        echo "<input type='button' value='$i' onclick='express($i)'>";
    }

?>
<div>

</body>

<script>
    function express(value){
        location.href="./memberBoard.php?page="+value;
    }

    //Q 刪除輸入背景變不回去
    function detectUser(user,cookie){
        if (user==cookie){
            var b = document.querySelector('body')
            b.style.background = '#4d5061'
        }
        else{
            var b = document.querySelector('body')
            b.style.background = 'white'
        }
    }

    function updateMessage(ID,Table){
        var c = document.querySelector('.edit'+Table+ID)
        if (c.style.display === "none") {
            c.style.display = "block";
        } else {
            c.style.display = "none";
        }
    }


    function checkDelete(ID,Table){
    if(confirm('你確定要刪除留言?')){
        alert('你已刪除留言')
        var f = document.createElement('form')
        f.setAttribute('method','post')
        f.setAttribute('action','./delete.php')
        
        var i = document.createElement('input')
        i.setAttribute('type','text')
        i.setAttribute('name','deleteID')
        i.setAttribute('value',ID)
        i.setAttribute('type', 'hidden')

        var t = document.createElement('input')
        t.setAttribute('type','text')
        t.setAttribute('name','tableName')
        t.setAttribute('value',Table)
        t.setAttribute('type', 'hidden')

        f.appendChild(i)
        f.appendChild(t)
        var b = document.querySelector('body')
        b.appendChild(f)
        f.submit()
        }
    }
//這裡怎麼了??????

//var test = document.querySelector('#delete{$row['ID']}')
//var ID = {$row['ID']};
//alert(ID)
//test.addEventListener('click',function(){
//alert(ID)
//checkDelete(ID)
//})

</script>
