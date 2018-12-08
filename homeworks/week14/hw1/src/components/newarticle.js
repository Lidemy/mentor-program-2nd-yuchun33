import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getPosts } from '../action/actions'
import Article from '../containers/articleContainer'


class NewArticle extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: '',
            body: '',
            author: 'yuchun',
            redirect: false      
        }
    }
    
    //改變輸入框的內容
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    //送出文章
    handleSubmit = (event) => {
        event.preventDefault()
        const { appendPost } = this.props
        appendPost(this.state) 
        this.setState({
            redirect: true
        })
    }

    render(){
        let { title, body, render } = this.state
        let { post } = this.props
        console.log(post);
        if(this.state.redirect){
            //改變畫面
            return <Redirect to="/articles" component={Article}/>
        } else {            
            return(
                <form className='newArticle' onSubmit={this.handleSubmit}>
                    <input type='text' name='title' value={title} placeholder='標題' onChange={this.handleChange}></input>
                    <textarea name='body' value={body} placeholder='...' onChange={this.handleChange}></textarea>
                    <input type='submit' value='+'></input>
                </form>
            )
        }   

    }
}

export default connect()(NewArticle)





