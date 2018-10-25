<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Page Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="./style.css">
</head>

<script>
//---------------------------------不換頁---------------------------------
$(function(){
    //-------------更新留言內容-------------
    $('body').on('submit','.updateForm',function(event){
        $.ajax({
            url:"./update.php",
            method:"POST",
            data:{
                updateID:$(this).find('input[name="updateID"]').val(),
                updateContent:$(this).find('input[name="updateContent"]').val()
            },
            success:function(){
                $(event.currentTarget).css('display','none')
                if($(event.currentTarget).parent().parent()[0].className=="main"){
                    $(event.currentTarget).parent().parent().find('.main__content').html($(event.currentTarget).find('input[name="updateContent"]').val());
                }else{
                    $(event.currentTarget).parent().parent().find('.sub__content').html($(event.currentTarget).find('input[name="updateContent"]').val());
                }
            }
        }).fail(function(){
            alert('fail')
        })
        event.preventDefault()
    })

    //-------------新增主留言-------------
    $('.mainForm').on('submit',function(event){
        $.ajax({
            url:"./add.php",
            method:"POST",
            data:{
                content:$(event.delegateTarget).find('textarea[name="content"]').val(),
                parent:$(event.delegateTarget).find('input[name="parent"]').val()
            },
            success:function(){
                $.getJSON('./lastID.json',function(data){
                    var ID = data.ID
                    console.log(ID);
                    
                    var content = $(event.delegateTarget).find('textarea[name="content"]').val()
                    var user = "<?php echo $_COOKIE['cookie']?>"
                    $(event.delegateTarget).parent().after(
                        `<div class='post'>\
                            <div class='main'>\
                                <div class='info'>\
                                    <div class='avater'></div>\
                                    <div class='idandtime'>\
                                        <div class='main__id'>${user}</div>\
                                        <div class='main__timestamp'>php</div>\
                                    </div>\
                                </div>\
                                <div class='memberfunction'>\
                                    <input type='button' class='delete'+${ID} name='delete' value='刪除' onclick='checkDelete(${ID})'>\ <!--新增的無法用ajax刪除-->
                                    <input type='button' class='update'+${ID} name='update' value='編輯' onclick='updateMessage(${ID})'>\
                                </div>\
                                <div class='main__content'>${content}</div>\
                                <div class='edit${ID}' style='display:none'>\
                                    <form class='updateForm form-inline'>\
                                        <input type='hidden' name='updateID' value='${ID}'>\
                                        <input type='text' class='form-group mx-sm-3 mb-2' name='updateContent' required>\
                                        <input type='submit' class='btn btn-primary mb-2' value='送出'>\
                                    </form>\
                                </div>\
                            </div>\
                            <div class='subs'>\
                            </div>\
                        <!--留言框-->\
                        <form class='addForm'>\
                            <div class='addpost addpost0'>\
                                <div class='avater'></div>\
                                <input type='text' name='content' placeholder='留言' oninput='detectUser(0,\"${user}\",\"${user}\")'>\
                                <input type='text' name='parent' value='${ID}' style='display:none'>\
                                <input type='submit' value='送出' style='display:none'>\
                            </div>\
                        </form>\
                        </div>\
                        </div>`)
                    $(event.delegateTarget).find('textarea[name="content"]').val('')
                    //$(event.delegateTarget).find('.sub__content').html($(event.currentTarget).find('input[name="updateContent"]').val());
                })
            }
        }).fail(function(){
            alert('fail')
        })
        event.preventDefault()
    })

    //-------------新增子留言-------------
    $('body').on('submit','.addForm',function(event){
        $.ajax({
            url:"./add.php",
            method:"POST",
            data:{
                content:$(event.currentTarget).find('input[name="content"]').val(),
                parent:$(event.currentTarget).find('input[name="parent"]').val()
            },
            success:function(){
                $.getJSON('./lastID.json',function(data){
                    var ID = data.ID
                    console.log($(event.currentTarget).find('input[name="content"]').val());
                    console.log($(event.currentTarget).find('input[name="parent"]').val());
                    
                    console.log(ID);
                    
                    var user = "<?php echo $_COOKIE['cookie']?>"
                    var content = $(event.currentTarget).find('input[name="content"]').val()

                    $(event.currentTarget).prev().prepend(
                    `<div class='sub'>\
                        <div class='info'>\
                            <div class='avater'></div>\
                            <span class='idandcontent'>\
                                <div class='sub__id'>${user}</div>\
                                <div class='sub__content'>${content}</div>\
                            </span>\
                        </div>\
                        <span class='sub__timestamp'>php</span>\
                        <div class='memberfunction'>\
                            <input type='button' class='delete'+${ID} name='delete' value='刪除' onclick='checkDelete(${ID})'>\ <!--新增的無法用ajax刪除-->
                            <input type='button' class='update'+${ID} name='update' value='編輯' onclick='updateMessage(${ID})'>\
                        </div>\
                        <!--編輯框-->\
                        <div class='edit${ID}' style='display:none'>\
                            <form class='updateForm'>\
                                <input type='hidden' name='updateID' value='${ID}'>\
                                <input type='text' name='updateContent'>\
                                <input type='submit' value='送出'>\
                            </form>\
                        </div>\
                    </div>`)
                    $(event.currentTarget).find('input[name="content"]').val('')
                })
            }
        }).fail(function(){
            alert('fail')
        })
        event.preventDefault()
    })
})
</script>

<body>
    <nav class='navbar navbar-light bg-light'>
<!---------------------------------------------------有登入才可以留言--------------------------------------------------->
    <?php if(isset($_COOKIE['cookie'])){
    ?>
        <span class='user'>Hello,
            <?php echo $_COOKIE['cookie'];?> 
        </span>
        <form action='./logout.php'>
            <button type='submit' class="btn btn-outline-dark">登出</button>
        </form>
    <?php    
    } else{
        echo '登入才可以留言ㄛ';?>
        <a class="btn btn-outline-dark" href="./index.html">登入</a>
    <?php
    }
    ?>
    </nav>
<!---------------------------------------------------發布新留言--------------------------------------------------->
    <div class='container'>
        <div class='newpost'>
            <div class='avater'></div>
            <form class='mainForm'>
                <!--<input type='text' name='nickname' placeholder="暱稱">-->
                <textarea name='content' class='form-control' placeholder='在想些什麼？' required></textarea>
                <input type='text' name='parent' value='0', style="display:none">
                <button type='submit' class='btn btn-primary'>發佈</button>
            </form>
        </div>


<?php
//---------------------------------------------------連接資料庫，篩選資料---------------------------------------------------
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
<!---------------------------------------------------主留言--------------------------------------------------->
        <div class='post'>
            <div class='main'>
                <div class='info'>
                    <div class='avater'></div>
                    <div class='idandtime'>
                        <div class='main__id'><?php echo $row['user']?></div>
                        <div class='main__timestamp'><?php echo $row['timestamp']?></div>
                    </div>
                </div>
<!---------------------------------------------------使用者可編輯和刪除--------------------------------------------------->
<?php 
        if(isset($_COOKIE['cookie'])){
            if($row['user']==$_COOKIE['cookie']){
?>               
                <div class='memberfunction'>
<?php       
            echo "<input class='delete{$row['ID']}' type='button' name='delete' value='刪除' onclick='checkDelete({$row['ID']})'>";
            echo "<input class='update{$row['ID']}' type='button' name='update' value='編輯' onclick='updateMessage({$row['ID']})'>";
?>
                </div>
<?php
            }
        }    
?>
<!---------------------------------------------------主留言編輯框--------------------------------------------------->            
            <div class='main__content'>
<?php
        echo htmlspecialchars($row['content']);
?>
            </div>
            <div class='edit<?php echo $row['ID']?>' style='display:none'>
                <form class='updateForm form-inline'>
                    <input type='hidden' name='updateID' value='<?php echo $row['ID']?>'>
                    <input type='text' class='form-group mx-sm-3 mb-2' name='updateContent'>
                    <input type='submit' class='btn btn-primary mb-2' value='送出'>
                </form>
            </div>
        </div>
<?php
        addChildMessage($conn,$row['ID'],$mainTable);          
        }
    } 
?>
</div>
<!---------------------------------------------------子留言-------------------------------------------------->
<?php
    function addChildMessage($conn,$parent,$mainTable){
?>
        <div class='subs'>
<?php
        //$subTable = "yuchun_board$parent";
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
//---------------------------------------------------刪除編輯按鈕---------------------------------------------------            
    if(isset($_COOKIE['cookie'])){
        if($row['user']==$_COOKIE['cookie']){
            echo "<div class='memberfunction'>";
            echo "<input class='delete{$row['ID']}' type='button'  name='delete' value='刪除' onclick='checkDelete({$row['ID']})'>";
            echo "<input class='update{$row['ID']}' type='button'  name='update' value='編輯' onclick='updateMessage({$row['ID']})'>";
            echo "</div>";
        }
    } 
?>
<!---------------------------------------------------編輯框--------------------------------------------------->
    <div class='edit<?php echo $row['ID']?>' style='display:none'>
        <form class='updateForm form-inline'>
            <input type='hidden' name='updateID' value='<?php echo$row['ID']?>'>
            <input type='text' class='form-group mx-sm-3 mb-2' name='updateContent'>
            <input type='submit' class='btn btn-primary mb-2' value='送出'>
        </form>
    </div>
    </div>
<?php
        }
            }    
        }
?>
        </div>
<!---------------------------------------------------留言框--------------------------------------------------->
<?php
    if(isset($_COOKIE['cookie'])){
        $sql = "SELECT user FROM {$mainTable} WHERE ID={$parent}";
        $result = $conn->query($sql);
        $row = $result->fetch_assoc();
?>
        <form class="addForm">
            <div class='addpost addpost<?php echo $parent?>'>
                <div class='avater'></div>
<?php
            echo "<input type='text' name='content' class='form-control' placeholder='留言' oninput='detectUser({$parent},\"{$row['user']}\",\"{$_COOKIE['cookie']}\")' required>";
?>
                <input type='text' name='parent' value='<?php echo $parent?>' style='display:none'>
                <input type='submit' value='送出' style='display:none'>
            </div>
        </form>
<?php
    }    
    echo "</div>";
    }
?>
</div>
<!---------------------------------------------------換頁--------------------------------------------------->
<div class='page'>
<?php
    $query = "SELECT COUNT(*) c FROM $mainTable";
    $result = $conn->query($query);
    $row = mysqli_fetch_assoc($result);
    $devide = $row['c']/10+1;
    for($i=1; $i<(int)$devide+1; $i++){
        echo "<input type='button' class='btn btn-light' value='$i' onclick='express($i)'>";
    }
?>
<div>

<!---------------------------------------------------Function--------------------------------------------------->
<script>
    function express(value){
        location.href="./memberBoard.php?page="+value;
    }

    //Q 刪除輸入背景變不回去
    function detectUser(ID,user,cookie){
        if (user==cookie){
            var b = document.querySelector('.addpost'+ID)
            b.parentElement.parentElement.style.background = 'rgb(248, 249, 250)'
        }
        else{
            var b = document.querySelector('body')
            b.style.background = 'white'
        }
    }
//---------------------------------------------------更新留言後隱藏---------------------------------------------------
    function updateMessage(ID){
        var c = document.querySelector('.edit'+ID)
        if (c.style.display === "none") {
            c.style.display = "block";
        } else {
            c.style.display = "none";
        }
    }
//---------------------------------------------------刪除留言的function---------------------------------------------------
    function checkDelete(ID){
        if(confirm('你確定要刪除留言?')){
            alert('你已刪除留言')
            var f = document.createElement('form')
            f.className = 'deleteForm'
            //f.setAttribute('method','post')
            //f.setAttribute('action','./delete.php')
            
            var i = document.createElement('input')
            i.setAttribute('type','text')
            i.setAttribute('name','deleteID')
            i.setAttribute('value',ID)
            i.setAttribute('type', 'hidden')

            f.appendChild(i)
            var b = document.querySelector('body')
            b.appendChild(f)
            
    //-----------------------不換頁--------------------
            $.ajax({
                url:"./delete.php",
                method:"POST",
                data:{
                    deleteID:i.value
                },
                success:function(){        
                    console.log(ID);
                    console.log($('.delete'+ID).parent()); // ajax 新增的無法取得物件
                    if($('.delete'+ID).parent().parent()[0].className=="main"){
                        $('.delete'+ID).closest('.post').css("display","none");
                        
                    } else{
                        $('.delete'+ID).parent().parent().css("display","none");
                    }
                }
            })
        }
    }
</script>


</body>