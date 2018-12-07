import React from 'react'
import Nav from '../containers/navContainer'
import NewArticle from '../containers/newarticleContainer'
import ArticleList from '../containers/articleListContainer'
import Article from '../containers/articleContainer'
import Login from '../containers/loginContainer'
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom"


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
    }
    componentDidMount(){
        const { getPosts } = this.props
        getPosts()
    }
    
    render(){
        const { login } = this.props
        return(
            <Router>
            <div className='flexContainer'>
                <Nav />
                <div className='page flexContainer'>
                    <Route exact path='' component={Home}/>
                    <Route exact path="/login" render={() => (
                        login ? (<Redirect to="/articles"/>) : (<Login/>)
                    )}/>
                    <Route exact path='/about' component={About}/>
                    <Route exact path='/articles' render={()=>(
                        <>
                        <ArticleList/>
                        <Article/>
                        </>)}>
                    </Route>
                    
                    <Route exact path='/articles/:id' render={()=>(
                        <>
                        <ArticleList/>
                        <Article/>
                        </>)}>
                    </Route>
                    
                    <Route path='/add' render={()=>(
                        <>
                        <ArticleList></ArticleList>
                        <NewArticle/>
                        </>)}>
                    </Route>
                </div>
                    
            </div>
            </Router>
        )
    }
}


export default Container