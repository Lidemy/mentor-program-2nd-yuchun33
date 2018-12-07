import Login from '../components/login'
import { login, getUser } from '../action/actions'
import { connect } from 'react-redux'


const mapDispatchtoProps = (dispatch) => ({
    login: (user) => dispatch(login('http://45.55.26.18:3310/login', user)),
    getUser: (user) => dispatch(getUser('http://45.55.26.18:3310/'), user)
})

export default connect(null, mapDispatchtoProps)(Login)

