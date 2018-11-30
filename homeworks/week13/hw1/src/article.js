import React from 'react'
import {withRouter} from 'react-router-dom'
import timeConverter from './function/timeconverter.js'

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            post: [],
        }
    }
    //第一次要從這裡
    componentDidMount(){
        fetch('http://45.55.26.18:3310/posts/' + this.props.match.params.id)
        .then(response => response.json())
        .then(myJson => this.setState({
                post: myJson
        }));
    }
    //點別的文章要從這裡
    shouldComponentUpdate(prevProps, prevState){
        if(prevProps.match.params.id !== this.props.match.params.id){
            fetch('http://45.55.26.18:3310/posts/' + prevProps.match.params.id) //怎麼會是 prev?
            .then(response => response.json())
            .then(myJson => this.setState({
                    post: myJson
            }));
        }
        return true
    }
    render(){
        const {post, loading} = this.state
        let time = timeConverter(post.createdAt)
        return(
            <div className="article">
                <div className="article__time">{time.month}-{time.date} {time.hour}:{time.min}</div>
                <div className="article__title">{post.title}</div>
                <div className="article__body">{post.body}</div>
            </div>
        )
    }
}

export default withRouter(Article)