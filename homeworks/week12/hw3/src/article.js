import React from 'react'

class Article extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            posts: []
        }
    }
    handleClick = (id) => {
        this.setState({
            postId: id
        })
    }
    handleBack = () =>{
        this.setState({
            postId: null
        })
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(myJson => this.setState({
                posts: myJson,
                postId: null
        }));
    }

    render(){
        const {posts, postId} = this.state
        return(
        <div>
        {postId == null && posts.map(post => (
            <div className="post" key={post.id} onClick={()=>this.handleClick(post.id-1)}>
                <div className="post__id">{post.id}</div>
                <div className="post__title">{post.title}</div>
                <div className="post__body">{post.body}</div>
            </div>
            ))
        }
        {postId != null && (
            <div className="article">
                <button className="backbtn" onClick={this.handleBack}>返回文章列表</button>
                <div className="article__title">{posts[postId].title}</div>
                <div className="article__body">{posts[postId].body}</div>
            </div>
        )}
        </div>
        )
    }
}

export default Article