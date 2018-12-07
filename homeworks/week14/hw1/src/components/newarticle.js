import React from 'react'
import { connect } from 'react-redux'


class NewArticle extends React.Component{
    constructor(props){
        super(props)
        //這邊留著是對的嗎?
        this.state = {
            title: '',
            body: '',
            author: 'yuchun'
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault()
        const { appendPost } = this.props
        appendPost(this.state) 
    }

    render(){
        let {title, body} = this.state
        return(
            <form className='newArticle' onSubmit={this.handleSubmit}>
                <input type='text' name='title' value={title} placeholder='標題' onChange={this.handleChange}></input>
                <textarea name='body' value={body} placeholder='...' onChange={this.handleChange}></textarea>
                <input type='submit' value='+'></input>
            </form>
        )
    }
}

export default connect()(NewArticle)





