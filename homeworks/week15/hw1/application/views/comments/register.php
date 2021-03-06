<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>留言板</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link href="<?php echo base_url(); ?>/css/loginpage.css" rel="stylesheet" type="text/css">
</head>


<div class='error'><%=err%><div>

<div class="container shadow-sm p-3 mb-5 bg-white rounded">
    <h1>註冊</h1>
    <?php echo form_open('/register/registerhandler'); ?>
        <div class="form-group">
            <label for="nickname">暱稱</label>
            <input class="form-control" type='text' name='nickname' id='nickname' placeholder='請輸入暱稱'>
        </div>
        <div class="form-group">
            <label for="userEmail">信箱</label>
            <input class="form-control" type='email' name='userEmail' id='userEmail' placeholder='請輸入信箱'><!--開通的原理?-->
        </div>
        <div class="form-group">
            <label for="userPassword">密碼</label>
            <input class="form-control" type='password' name='password' id='userPassword' laceholder='請輸入密碼'>
        </div>
        <div class="form-group">
            <label for="doublePassword">確認密碼</label>
            <input class="form-control" type='password' name='doublePassword' id='doublePassword' placeholder='請再輸入一次密碼'>
        </div>
            <input class='register--btn btn--green' type='submit' name='submit' value='送出'>
    </form>
    <?php echo form_open('/login'); ?>
        <input class='login--btn btn--white' type='submit' value='已是會員'>
    </form>
</div>
</html>

