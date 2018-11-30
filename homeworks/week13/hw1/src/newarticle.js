import React from 'react'

class NewArticle extends React.Component{
    constructor(props){
        super(props)
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
        this.props.addPost(this.state)
    }
    render(){
        let {title, content} = this.state
        return(
            <form className='newArticle' onSubmit={this.handleSubmit}>
                <input type='text' name='title' value={title} placeholder='標題' onChange={this.handleChange}></input>
                <textarea name='body' value={content} placeholder='...' onChange={this.handleChange}></textarea>
                <input type='submit' value='+'></input>
            </form>
        )
    }
}

export default NewArticle





