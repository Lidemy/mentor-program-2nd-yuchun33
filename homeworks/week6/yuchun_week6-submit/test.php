<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="./style.css">
</head>

<!--發布新留言-->
<body>
    hihihi
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

    <div class='container'>

<!--主留言-->
<?php
    require('./connect.php');
    $page = 1;
    if(isset($_GET['page'])){
        $page = $_GET['page'];
    }else{
        $page = 1;
    };

    $mainTable = "yuchun_board";

    $sql = "show variables like '%time_zone%'";
    $conn->query($sql);
    $init = ($page-1)*10;
    $sql = "SELECT * FROM $mainTable WHERE parent='0' ORDER BY timestamp DESC LIMIT " .$init . ',10';
    $result = $conn->query($sql);
    if(!$result){
        echo $conn->error;
        echo $sql;
    }

    if($result->num_rows>0){
        while($row = $result->fetch_assoc()){
?>
        <div class='post'>
            <div class='main'>
                <div class='info'>
                    <div class='avater'></div>
                    <div class='idandtime'>
                        <div class='main__id'><?php echo $row['user']?></div>
                        <div class='main__timestamp'><?php echo $row['timestamp']?></div>
                        <div><?php echo $row['ID']?></div>
            </div>
        </div>
<!--使用者可編輯和刪除-->
<?php
        if($row['user']==$_COOKIE['cookie']){      
            echo "<div class='memberfunction'>";
            echo "<input type='button' id='delete{$row['ID']}' name='delete' value='刪除' onclick='checkDelete({$row['ID']},\"{$mainTable}\")'>";
            echo "<input type='button' id='update{$row['ID']}' name='update' value='編輯' onclick='updateMessage({$row['ID']},\"{$mainTable}\")'>";
            echo "</div>";
        }
?> 
        <div class='edit<?php echo $mainTable.$row['ID']?>' style='display:none'>
            <form method='POST' action='./update.php'>
                <input type='hidden' name='updateID' value='<?php echo $row['ID']?>'>
                <input type='hidden' name='tableName' value='<?php echo $mainTable?>' >
                <input type='text' name='updateContent'>
                <input type='submit' value='送出'>
            </form>
            </div>
        <div class='main__content'>        
<?php
        echo htmlspecialchars($row['content']);
?>
        </div>
        </div>
<?php
        addChildMessage($conn,$row['ID'],$mainTable); 
        }
    }
?>


<?php
    function addChildMessage($conn,$parent,$mainTable){
        echo "<div class='subs'>";
        $subTable = "yuchun_board";
        $subsql = "SELECT * FROM $subTable WHERE parent=$parent ORDER BY timestamp DESC";
        if ($result = $conn->query($subsql)){
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
?>
        <div class='sub'>
            <div class='info'>
                <div class='avater'></div>
                <span class='idandcontent'>
                    <div class='sub__id'><?php echo $row['user']?></div>
                    <div class='sub__content'>

<?php
        echo htmlspecialchars($row['content']);
?>
        </div>
            </span>
        </div>
            <span class='sub__timestamp'><?php echo $row['timestamp']?></span>
<?php
        if($row['user']==$_COOKIE['cookie']){
            echo "<div class='memberfunction'>";
            echo "<input type='button' value='刪除' onclick='checkDelete({$row['ID']},\"Board\"+{$parent})'>";
            echo "<input type='button' id='update{$row['ID']}' name='update' value='編輯' onclick='updateMessage({$row['ID']},\"Board\"+{$parent})'>";
            echo "</div>";
            }
?>
<!--編輯框-->
    <div class='edit<?php echo $subTable.$row['ID']?>' style='display:none'>
        <form method='POST' action='./update.php'>
            <input type='hidden' name='updateID' value='<?php echo$row['ID']?>'>
            <input type='hidden' name='tableName' value='<?php echo$subTable?>'>
            <input type='text' name='updateContent'>
            <input type='submit' value='送出'>
        </form>
    </div>
    </div>

<?php
            }        
        }  
    }
    
?>
    </div>
<!--留言框-->
<?php
        $sql = "SELECT user FROM {$mainTable} WHERE ID={$parent}";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
?>
        <form method='POST' action='./add.php'>
            <div class='addpost addpost<?php echo $parent?>'>
                <div class='avater'></div>
<?php
            echo "<input type='text' name='content' placeholder='留言' oninput='detectUser({$parent},\"{$row['user']}\",\"{$_COOKIE['cookie']}\")'>";
?>
                <input type='text' name='parent' value='<?php echo $parent?>' style='display:none'>
                <input type='submit' value='送出' style='display:none'>
            </div>
        </form></div>
<?php    
    }
?>    
    
</div>
</body>


<!--換頁-->
<div class='page'>
<?php
    $query = "SELECT COUNT(*) c FROM $mainTable";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);
    $devide = $row['c']/10+1;
    for($i=1; $i<(int)$devide+1; $i++){
        echo "<input type='button' value='$i' onclick='express($i)'>";
    }

?>
<div>

</body>
</html>

<!--Function-->
<script>
    function express(value){
        location.href="./memberBoard.php?page="+value;
    }

    //Q 刪除輸入背景變不回去
    function detectUser(ID,user,cookie){
        if (user==cookie){
            var b = document.querySelector('.addpost'+ID)
            b.parentElement.parentElement.style.background = '#4d5061'
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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    }
?>

