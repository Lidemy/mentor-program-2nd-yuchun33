import React from 'react'
import { withRouter } from 'react-router-dom'
import { createMarkup, timeConverter } from '../function/functions'

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            mode: 'view',
            title: '',
            body: ''
        }
    }

    //第一次要從這裡
    componentDidMount(){
        const { getSinglePost } = this.props
        getSinglePost(this.props.match.params.id)
    }

    //都沒用
    static getDerivedStateFromProps(nextProps, prevState){
        console.log('getDerivedStateFromProps');
    }
    //都沒用
    shouldComponentUpdate(prevProps, prevState){
        console.log('shouldComponentUpdate');
        const { getSinglePost } = this.props
        if(prevProps.match.params.id !== this.props.match.params.id){
            console.log(this.props.match.params.id);
            getSinglePost(this.props.match.params.id)
        }
        return true
    }
    //都沒用
    componentDidUpdate (prevProps, prevState){
        console.log('Article: componentDidUpdate');
        const { getSinglePost } = this.props

        console.log(prevProps.match.params.id, ' ++++ ', this.props.match.params.id);
        
        if(prevProps.match.params.id !== this.props.match.params.id){
            console.log(this.props.match.params.id);
            getSinglePost(this.props.match.params.id)
        }
        return true
    }

    //刪除文章
    handleDelete = () => {
        const { deletePost } = this.props
        if(confirm('確定要刪除')){
            deletePost(this.props.match.params.id)
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
            mode: 'view'
        })
    }

    render(){
        console.log('article render');
        
        const { post, login } = this.props
        let time = timeConverter(post.createdAt)

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
                    <div className="article__title">{post.title}</div>
                    <div className="article__body" dangerouslySetInnerHTML={createMarkup(post.body)} />
                </div>
            )
        }
    }
}


  
export default withRouter(Article)