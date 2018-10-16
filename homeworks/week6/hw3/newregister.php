<style>
    *{
        font-size: 22px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    body{
        color: #3b5998;
        padding: 50px;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }
    .title{
        margin: 0 auto;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 300px;
        height: 350px;
        padding: 10px;
        margin: 0 auto;
        border: 2px solid #3b5998;
        border-radius: 5px;   
        position: relative; 
    }
    form input{
        margin: 5px;
    }
    form input[type='submit']{
        background: #3b5998;
        color: white;
    }

</style>

<body>
    <span class='title'><h2>請輸入您的資料</h2></span>
    <div class='register'>
        <form method="POST" action="./register.php">
            帳號 <input type="text" name="user" required>
            密碼 <input type="password" name="password" required>
            確認密碼 <input type="password" name="doublecheckpassword" required>
            暱稱<input type="text" name="nickname" required>
            <input type="submit" name="type" value="註冊">
        </form>
    </div>
</body>