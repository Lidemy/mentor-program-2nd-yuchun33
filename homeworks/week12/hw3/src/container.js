import React from 'react'
import Nav from './nav'
import Article from './article'


function About(){
    return(
        <div className='about'>I am about</div>
    )
}

function Home() {
    return(
        <div className='home'>I am homepage</div>
    )
}

class Container extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tab: 'Home'
        }
    }
    handleChange = (page) =>{
        this.setState({
            tab: page
        })
    }
    render(){
        return(
            <div>
                <Nav onChange={this.handleChange}/>
                <div className="page">
                    {this.state.tab=='Home' && <Home/>}
                    {this.state.tab=='Article' && <Article/>}
                    {this.state.tab=='About' && <About/>}
                </div>
            </div>
            
        )
    }
}

export default Container