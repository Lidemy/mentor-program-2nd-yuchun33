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


    </style>
</head>

<body>
    <div class='navbar'>
        <span class='user'>Hello, <?php echo $_COOKIE['cookie'] ?> </span>
        <form action='logout.php'>
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
    $sql = "show variables like '%time_zone%'";
    $conn->query($sql);
    $sql = 'SELECT * FROM Board ORDER BY timestamp DESC';
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
                        </div> 
                    </div>
                    <div class='main__content'>{$row['content']}</div>
                </div>";
            addChildMessage($conn,$row['ID']);

            
        }
    }
    
?>

</div>

<?php
    function addChildMessage($conn,$parent){
        echo "<div class='subs'>";
        $subsql = 'SELECT * FROM Board'.$parent.' ORDER BY timestamp DESC';
        if ($result = $conn->query($subsql)){
            if($result->num_rows>0){
                while($row = $result->fetch_assoc()){
                    echo"<div class='sub'>
                            <div class='info'>
                                <div class='avater'></div>
                                <span class='idandcontent'>
                                    <div class='sub__id'>{$row['user']}</div>
                                    <div class='sub__content'>{$row['content']}</div>
                                </span>
                            </div>
                            <span class='sub__timestamp'>{$row['timestamp']}</span>
                        </div>";
                }
            }    
        }
        echo "</div>";
        echo "<form method='POST' action='./add.php'>
                <div class='addpost'>
                    <div class='avater'></div>
                    <input type='text' name='content' placeholder='留言'>
                    <input type='text' name='parent' value={$parent} style='display:none'>
                    <input type='submit' value='送出' style='display:none'>
                </div>
            </form></div>";
    }
?>
        


</div>
</body>
