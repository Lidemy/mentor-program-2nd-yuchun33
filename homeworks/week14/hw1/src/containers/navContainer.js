import Nav from '../components/nav'
import { connect } from 'react-redux'
import { logout } from '../action/actions'

const mapStatetoProps = (state) => ({
    login: state.login
})

const mapDispatchtoProps = (dispatch) => ({
    logout: () => dispatch(logout('http://45.55.26.18:3310/logout'))
})
export default connect(mapStatetoProps, mapDispatchtoProps)(Nav)