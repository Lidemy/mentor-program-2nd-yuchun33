import React from 'react'
import { createMarkup, timeConverter } from '../function/functions'

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mode: 'view',
            title: '',
            body: '',
            update: true,
        }
    }

    //第一次要從這裡
    componentDidMount(){
        const { getSinglePost, getLastPost, updateSingleFinished } = this.props
        //沒有 id 就拿最新的
        if(this.props.match.params.id){
            getSinglePost(this.props.match.params.id)
            
        }else{
            getLastPost()
        }
    }

    //修改跟第二次以後
    componentDidUpdate (prevProps, prevState){
        const { updateSingle, getSinglePost, getLastPost, updateSingleFinished } = this.props
        if(prevProps.match.params.id !== this.props.match.params.id){
            getSinglePost(this.props.match.params.id)
        } else if (updateSingle){
            if (this.props.match.params.id) {
                getSinglePost(this.props.match.params.id)
                updateSingleFinished()
            } else {
                getLastPost()
                updateSingleFinished()
            }
        }
    }

    //刪除文章
    handleDelete = () => {
        const { deletePost } = this.props
        if(confirm('確定要刪除')){
            deletePost(this.props.match.params.id)
            //但畫面沒變
        }
        alert('刪除成功')
    }
    //編輯文章
    handleEdit = () =>{
        this.setState({
            mode: 'edit',
            title: this.props.post.title,
            body: this.props.post.body
        })
    }
    //編輯中
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })        
    }
    //編輯完成
    handleSubmit = (event) => {
        event.preventDefault()
        const { editPost, post } = this.props
        const { title, body } = this.state       
        editPost(post.id, {title:title, body:body, author:'user01', createdAt: Date.now()})
        this.setState({
            mode: 'view',
            update: true
        })
        
    }

    render(){        
        const { post, login } = this.props
        console.log('post', post);
        let mypost = {}
        //轉換格式
        post.length ? mypost = {...post[0]} : mypost = {...post}
        let time = timeConverter(mypost.createdAt)
        
       
        if(this.state.mode === 'edit'){
            const { title, body } = this.state
            return(
                <form className="editarticle" onSubmit={this.handleSubmit}>
                    <div className="article__time">{time.month}-{time.date} {time.hour}:{time.min}</div>
                    <input type='text' name='title' value={title} onChange={this.handleChange}></input>
                    <textarea name='body' value={body} onChange={this.handleChange}></textarea>
                    <input type='submit' value='完成'></input>
                </form>
            )
        } else {
            return(
                <div className="article">
                    {login&&<>
                        <button onClick={this.handleDelete}>刪除</button>
                        <button onClick={this.handleEdit}>編輯</button></>}
                    <div className="article__time">{time.month}-{time.date} {time.hour}:{time.min}</div>
                    <div className="article__title">{mypost.title}</div>
                    <div className="article__body" dangerouslySetInnerHTML={createMarkup(mypost.body)} />
                </div>
            )
        }
    }
}


  
export default Article