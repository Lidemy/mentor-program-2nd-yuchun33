<?php
    setcookie('cookie', "", time()+3600*24);
    setcookie('vertify', "", time()+3600*24);
    echo 'log out';
    $url = './index.html';
    header("Location: $url");
?>