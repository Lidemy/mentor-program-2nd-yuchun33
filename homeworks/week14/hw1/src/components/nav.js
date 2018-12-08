import React from 'react'
import { HashRouter as Router, Link } from "react-router-dom";

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: 'Home'
        }
    }
    //登出
    handleLogout = () =>{
        const { logout } = this.props
        logout()
    }
    render(){
        const {location, login} = this.props
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
                <li className="nav__item">
                    {login?
                        <Link className="nav__Link" to={'/'}><div onClick={this.handleLogout}>登出</div></Link>:<></>}
                </li>
            </ul>
            </Router>
        )
    }
}

export default Nav