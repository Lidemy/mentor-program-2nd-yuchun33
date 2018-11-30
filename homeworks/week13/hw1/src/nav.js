import React from 'react'
import { HashRouter as Router, Link, withRouter } from "react-router-dom";

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: 'Home'
        }
    }
    render(){
        const {location} = this.props
        let tab = location.pathname
        return(
            <Router>
            <ul className="nav">
                <li className="nav__item">
                    <Link className={"nav__Link " + (tab == '/' && 'active')} to={'/'}>Home</Link>
                </li>
                <li className="nav__item">
                    <Link className={"nav__Link " + ((tab.includes('/articles') || tab=='/add')&& 'active')} to={'/articles'}>Article</Link>
                </li>
                <li className="nav__item">
                    <Link className={"nav__Link " + (tab == '/about' && 'active')} to={'/about'}>About</Link>
                </li>
            </ul>
            </Router>
        )
    }
}

export default withRouter(Nav)