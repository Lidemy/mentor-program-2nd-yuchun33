<script>
    //新增留言
    $('body').on("submit", ".createCommentForm", function(evt){
        evt.preventDefault()
        var parames = {
            nickname:$(evt.currentTarget).find('input[name="nickname"]').val(),
            content:$(evt.currentTarget).find('textarea[name="content"]').val(),
            parent:$(evt.currentTarget).find('input[name="parent"]').val()
        }
        $.ajax({
            data: parames,
            url: '<?php echo base_url(); ?>index.php/comments/createcomment',//為何直接連到 controller
            method: 'POST',
            success: function(response){
                if(parames.parent==0){
                    console.log(response);//是 view 的內容
                    $('.Y-container').prepend(prependMain(parames.nickname, response.timestamp, response.id, parames.content))
                } else {                 
                    console.log($(evt.currentTarget).parent().parent().prev());
    
                    $(evt.currentTarget).parent().parent().prev().append(prependSub(parames.nickname, response.timestamp, response.id, parames.content))
                }
            }
        })
        $(evt.delegateTarget).find('textarea[name="content"]').val("")
        
    })
    //刪除留言
    $(".Y-container").on("submit", ".deleteForm", function(evt){
        evt.preventDefault()
        var parames = {
            deleteId:$(evt.currentTarget).find('input[name="deleteId"]').val(),
        }
        $.ajax({
            data: parames,
            url: '<?php echo base_url(); ?>index.php/comments/deleteComment',
            method: 'POST',
            success: function(response){
                console.log(response);
                
                console.log('delete successfully')
            }
        })
        if($(evt.currentTarget).parent()[0].className=='comment__main__function row'){
            $(evt.currentTarget).closest('.comment').css("display","none");
        } else {
            $(evt.currentTarget).closest('.comment__sub').css("display","none");
        }
    })

    //顯示編輯框
    $(".Y-container").on("click", ".btn--edit", function(evt){
        if($(evt.currentTarget).parent()[0].className=='comment__main__function row'){
            $(evt.currentTarget).closest('.comment__main').find('.comment__main__content').toggle();
            $(evt.currentTarget).closest('.comment__main').find('.comment__main__updateForm').toggle();
        } else {
            $(evt.currentTarget).closest('.comment__sub').find('.comment__sub__content').toggle();
            $(evt.currentTarget).closest('.comment__sub').find('.comment__sub__updateForm').toggle();            
        }
    })


    $(".Y-container").on("submit", ".updateForm", function(evt){
        evt.preventDefault()
        let params = {
            updateId: $(evt.currentTarget).find('input[name="updateId"]').val(),
            updateComment:  $(evt.currentTarget).find('textarea[name="updateComment"]').val(),
        }
        $.ajax({
            data: params,
            url: '<?php echo base_url(); ?>index.php/comments/updateComment',
            method: 'POST',
            success: function(response){
                console.log(response)
                
                console.log('update successfully')
            }
        })
        if($(evt.currentTarget).parent().parent()[0].className=='comment__main container'){
            $(evt.currentTarget).closest('.comment__main').find('.comment__main__content').css("display","block");
            $(evt.currentTarget).closest('.comment__main').find('.comment__main__updateForm').css("display","none");
            $(evt.currentTarget).closest('.comment__main').find('.comment__main__content').html(params.updateComment);
           
        } else {
            $(evt.currentTarget).closest('.comment__sub').find('.comment__sub__content').css("display","block");
            $(evt.currentTarget).closest('.comment__sub').find('.comment__sub__updateForm').css("display","none");            
            $(evt.currentTarget).closest('.comment__sub').find('.comment__sub__content').html(params.updateComment);
        }

    })

    function prependMain(u_nickname, u_createdAt, u_id, u_content){
        return `<div class='comment shadow-sm p-3 mb-3 bg-white rounded' >
                <div class='comment__main container'>
                <div class='comment__main__info row'>
                    <div class='comment__main__nickname'>${u_nickname}</div>
                    <div class='comment__main__createdAt'>${u_createdAt}</div>
                    <div class='comment__main__function row'>
                        <form class='deleteForm'>
                            <input class="form-control" type='text' name='deleteId' value="${u_id}" hidden>
                            <input class="main__function--delete" type='submit' name="delete" value='刪除'>
                        </form>
                        <button class="btn--edit main__function--edit" type="button" class="button">編輯</button>
                    </div>
                </div>
                <div class='comment__main__content row'>${u_content}</div>
                <div class='comment__main__updateForm form-group p-3 bg-white rounded'>
                    <form class='updateForm'>
                        <input type='text' name='updateId' value="${u_id}" hidden>
                        <textarea class="form-control" name="updateComment">${u_content}</textarea>
                        <input type='submit' name="delete" value='更新'>
                    </form>
                </div>
                </div>
                <div class='comment__subs'>
                </div>
                <div class='Comment__form form-group'>
                    <form class='createCommentForm'>
                        <input type='text' name='nickname' value='<%=user%>' hidden>
                        <input type='text' name='parent' value="${u_id}" hidden>
                        <textarea class="form-control" name="content" placeholder="回應："></textarea>
                        <input type='submit' name='submit' value='送出'>
                    </form>
                </div>
                </div>`
    }
    function prependSub(u_nickname, u_createdAt, u_id, u_content){
        return `
            <div class='comment__sub container'>
                <div class='comment__sub__info row'>
                    <div>${u_nickname}</div>
                        <div class='comment__sub__function row'>
                            <form class='deleteForm'>
                                <input type='text' name='deleteId' value="${u_id}" hidden>
                                <input class="sub__function--delete" type='submit' name="delete" value='刪除'>
                            </form>
                            <button class="btn--edit sub__function--edit" type="button" class="btn btn-primary">編輯</button>
                        </div>
                </div>

                <div class='comment__sub__content row'>${u_content}</div>

                <div class='comment__sub__updateForm form-group p-3 bg-white roundeds'>
                    <form class='updateForm'>
                        <input type='text' name='updateId' value="${u_id}" hidden>
                        <textarea class="form-control" name="updateComment">${u_content}</textarea>
                        <input type='submit' name="delete" value='更新'>
                    </form>
                </div>
            </div>`

    }
</script>