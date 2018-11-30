import React from 'react'
import { HashRouter as Router, Link} from "react-router-dom";
import timeConverter from './function/timeconverter.js'

class ArticleList extends React.Component{
    render(){
        const {posts} = this.props
        let mypost = []
        //調整資料結構
        posts.slice(0,-1).map(post => (
            mypost.push({
                'id': post.id,
                'title': post.title,
                'body': post.body,
                'createdAt': timeConverter(post.createdAt)
            })
        ))

        return(
        <Router>
        <div className="posts">
            <Link to='/add'>
                <div className="newpost">新增文章</div>
            </Link>
            {mypost.map(post => (
                <Link key={post.id} className="nav__Link" to={`/articles/${post.id}`}>
                <div className="post">
                    <div className='post--left'>
                        <div className="post__title">{post.title}</div>
                        <div className="post__body">{post.body}</div>
                    </div>
                    <div className='post--right'>
                        <div className="post__month">{post.createdAt.month}</div>
                        <div className="post__date">{post.createdAt.date}</div>                    
                    </div>
                </div>
                </Link>
            ))}
        </div>
        </Router>
        )
    }
}





export default ArticleList