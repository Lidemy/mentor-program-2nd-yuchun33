import React from 'react'
import { getUser } from '../action/actions';


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username: '',
            password: ''
        }
    }
    handleSubmit = (event) => {
        const { login } = this.props
        login(this.state)
        getUser('me')//不知道要放哪
        event.preventDefault()   
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className='login'>
            <img className='login__photo'src='dist/photo.jpg'/>
            <form className="login__form" onSubmit={this.handleSubmit}>
                <div className="field">
                    <label>Username</label>
                    <input type="text" name="username" placeholder="Username" onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={this.handleChange}/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            </div>
        )
    }
}

export default Login