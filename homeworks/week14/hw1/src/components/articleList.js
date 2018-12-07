import React from 'react'
import { Link } from "react-router-dom";
import { createMarkup, timeConverter } from '../function/functions'

class ArticleList extends React.Component{
    //第一次
    componentDidMount(){
        const { getPosts } = this.props
        getPosts()
    }

    //是否更新文章列表
    componentDidUpdate (prevProps, prevState){
        const { updateList, getPosts, updateFinished } = this.props
        if(updateList){
            getPosts()
            updateFinished()
        }
    }

    render(){   
        const { posts, login } = this.props //從 redux 傳來的   
        //調整資料結構
        let mypost = posts.slice(0,-1).map(post => ({
                'id': post.id,
                'title': post.title,
                'body': post.body,
                'createdAt': timeConverter(post.createdAt)
            })
        )

        return(
        <div className="posts">
            {login ?
                <Link to='/add'>
                    <div className="newpost">新增文章</div>
                </Link> : 
                <Link to='/login'>
                    <div className="newpost">登入</div>
                </Link>
            }
            {mypost.map(post => (
                <Link key={post.id} className="nav__Link" to={`/articles/${post.id}`}>
                <div className="post">
                    <div className='post--left'>
                        <div className="post__title">{post.title}</div>
                        <div className="post__body" dangerouslySetInnerHTML={createMarkup(post.body)} />
                    </div>
                    <div className='post--right'>
                        <div className="post__month">{post.createdAt.month}</div>
                        <div className="post__date">{post.createdAt.date}</div>                    
                    </div>
                </div>
                </Link>
            ))}

        </div>
        )
    }
}

export default ArticleList