import React from 'react'
import Nav from './nav'
import NewArticle from './newarticle'
import ArticleList from './articleList'
import Article from './article'
import Login from './login'
import { HashRouter as Router, Route, Link } from "react-router-dom"

function About(){
    return(
        <div className='about'>
            I am about
            <img className='home__photo'src='dist/photo.jpg'/>
        </div>
    )
}

function Home() {
    return(
        <div className='home'>
            <img className='home__photo'src='dist/photo.jpg'/>
            <Link to='/login'>
                <button className='home__button'>Create Your Own Memory</button>
            </Link>
        </div>     
    )
}

class Container extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            posts: [],
        }
    }
    //第一次拿資料
    componentDidMount(){
        fetch('http://45.55.26.18:3310/posts?_sort=id&_order=desc')
        .then(response => response.json())
        .then(myJson => this.setState({
                posts: myJson
        }));
    }
    //新增文章、重新渲染
    updateArticle = (newPost) => {  
        console.log(newPost);
        fetch('http://45.55.26.18:3310/posts',{
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        }).then(()=>{
            fetch('http://45.55.26.18:3310/posts?_sort=id&_order=desc')
            .then(response => response.json())
            .then(myJson => {
                if(myJson.length !== this.state.posts.length){
                    this.setState({
                        posts: myJson
                    })
                }}); 
        })      
    }

    render(){        
        return(
            <Router>
            <div className='flexContainer'>
                <Nav />
                <div className='page flexContainer'>
                    <Route exact path='' component={Home}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/about' component={About}/>
                    <Route path='/articles' render={()=>(<ArticleList posts={this.state.posts}/>)}/>
                    <Route exact path='/articles/:id' component={Article}/>
                    
                    {/*這裡的畫面是給兩個元件，是這樣設定嗎?*/}
                    <Route path='/add' render={()=>(
                        <>
                        <ArticleList posts={this.state.posts}></ArticleList>
                        <NewArticle addPost={this.updateArticle}></NewArticle>
                        </>)}>
                    </Route>
                </div>
                    
            </div>
            </Router>
        )
    }
}

export default Container