import React from 'react'

//還沒有真的功能
class Login extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='login'>
            <img className='login__photo'src='dist/photo.jpg'/>
            <form className="login__form">
                <div className="field">
                    <label>First Name</label>
                    <input type="text" name="first-name" placeholder="First Name"/>
                </div>
                <div className="field">
                    <label>Last Name</label>
                    <input type="text" name="last-name" placeholder="Last Name"/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            </div>
        )
    }
}

export default Login