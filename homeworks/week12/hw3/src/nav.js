import React from 'react'

class Nav extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            active: 'Home'
        }
    }
    handleClick(item){
        const {onChange} = this.props
        onChange(item)
        this.setState({
            active: item
        })
    }
    render(){
        return(
            <ul className="nav">
                <li className="nav__item">
                    <a className={this.state.active=='Home'? 'active' : ''} onClick={()=>this.handleClick('Home')}>Home</a>
                </li>
                <li className="nav__item">
                    <a className={this.state.active=='Article'? 'active' : ''} onClick={()=>this.handleClick('Article')}>Article</a>
                </li>
                <li className="nav__item">
                    <a className={this.state.active=='About'? 'active' : ''} onClick={()=>this.handleClick('About')}>About</a>
                </li>
            </ul>
        )
    }
}

export default Nav