<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>留言板</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="<?php echo base_url(); ?>css/style.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
</head>

<body>


<?php if($user){ ?>
    <div class='nav'>
        <div class='nav__username'><?php echo $user ?></div>
        <?php echo form_open('login/logout'); ?>
            <input class="btn" type='submit' name='submit' value='登出'>
        </form>
    </div>

    <div class='createComment form-group shadow-sm p-3 mb-5 bg-white rounded'>
        <h1>新增留言：</h1>
        <form class='createCommentForm'>
            <input type='text' name='nickname' value='<?php echo $user?>' hidden>
            <input type='text' name='parent' value='0' hidden>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" name="content">在想什麼？</textarea>
            <input class="btn" type='submit' name='submit' value='送出'>
        </form>
    </div>


<?php }else{ ?>
    <div class='nav'>
    <?php echo form_open('login'); ?>
        <input class="btn" type='submit' name='submit' value='登入留言'>
    </form>
    </div>
<?php } ?>    


<div class='Y-container'>    
    <?php foreach ($comments as $comment){ ?>
        <?php if($comment['parent']==0){ ?>
        <div class='comment shadow-sm p-3 mb-3 bg-white rounded' >
            <div class='comment__main container'>
                <div class='comment__main__info row'>
                    <div class='comment__main__nickname'><?php echo $comment['user'] ?></div>
                    <div class='comment__main__createdAt'><?php echo $comment['timestamp'] ?></div>
                    
                    <?php if($user==$comment['user']){ ?>
                        <div class='comment__main__function row'>
                            <form class='deleteForm'>
                                <input class="form-control" type='text' name='deleteId' value="<?php echo $comment['ID'] ?>" hidden>
                                <input class="main__function--delete" type='submit' name="delete" value='刪除'>
                            </form>
                            <button class="btn--edit main__function--edit" type="button" class="button">編輯</button>
                        </div>
                    <?php } ?>

                </div>

                <div class='comment__main__content row'><?php echo $comment['content'] ?></div>
                <div class='comment__main__updateForm form-group p-3 bg-white rounded'>
                    <form class='updateForm'>
                        <input type='text' name='updateId' value="<?php echo $comment['ID'] ?>" hidden>
                        <textarea class="form-control" name="updateComment"><?php echo $comment['content'] ?></textarea>
                        <input type='submit' name="delete" value='更新'>
                    </form>
                </div>

                
            </div>

            <div class='comment__subs'>
                <?php for($j=0; $j<count($comments); $j++){ ?>
                    <?php if($comment['ID'] == $comments[$j]['parent']){ ?>
                        <div class='comment__sub container'>
                            <div class='comment__sub__info row'>
                                <div><?php echo $comments[$j]['user'] ?></div>
                                <?php if($user == $comments[$j]['user'] ){ ?>
                                    <div class='comment__sub__function row'>
                                        <form class='deleteForm'>
                                            <input type='text' name='deleteId' value="<?php echo $comments[$j]['ID'] ?>" hidden>
                                            <input class="sub__function--delete" type='submit' name="delete" value='刪除'>
                                        </form>
                                        <button class="btn--edit sub__function--edit" type="button" class="btn btn-primary">編輯</button>
                                    </div>
                                <?php } ?>
                            </div>

                            <div class='comment__sub__content row'><?php echo $comments[$j]['content'] ?></div>

                            <div class='comment__sub__updateForm form-group bg-white roundeds'>
                                <form class='updateForm'>
                                    <input type='text' name='updateId' value="<?php echo $comments[$j]['ID'] ?>" hidden>
                                    <textarea class="form-control" name="updateComment"><?php echo $comments[$j]['content'] ?></textarea>
                                    <input type='submit' name="delete" value='更新'>
                                </form>
                            </div>

                        </div>
                    <?php } ?>
                <?php } ?>
            </div>
            <?php if($user!==''){ ?>
            <div class='comment__form'>
                <div class='form-group'>
                    <form class='createCommentForm'>
                        <?php $parent = $comment['ID'] ?>
                        <input type='text' name='nickname' value='<?php echo $user ?>' hidden>
                        <input type='text' name='parent' value=<?php echo $parent ?> hidden>
                        <textarea class="form-control" name="content" placeholder="回應："></textarea>
                        <input class="btn" type='submit' name='submit' value='送出'>
                    </form>
                </div>
            </div>
            <?php } ?>

        </div>
        <?php } ?>
    <?php } ?>
</div>

</body>
</html>

