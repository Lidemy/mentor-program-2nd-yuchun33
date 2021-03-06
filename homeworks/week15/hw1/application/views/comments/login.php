<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>留言板</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <link href="<?php echo base_url(); ?>/css/loginpage.css" rel="stylesheet" type="text/css">
</head>

<div class="container shadow-sm p-3 mb-5 bg-white rounded">
    <h1>登入</h1>
    <?php echo form_open('/login/loginhandler'); ?>
        <div class="form-group">
            <label for="userEmail">信箱</label>
            <input class="form-control" type='text' name='username' id='userEmail' placeholder='請輸入註冊信箱'>
        </div>
        <div class="form-group">
            <label for="userPassword">密碼</label>
            <input class="form-control" type='password' name='password' id='userPassword' placeholder='請輸入密碼'>
        </div>
        <input class= 'login--btn btn--green' type='submit' name='submit' value='登入'>
    </form>
    <?php echo form_open('/register'); ?>
        <input class='register--btn btn--white' type='submit' value='尚未註冊'>
    </form>
</div>
</html>