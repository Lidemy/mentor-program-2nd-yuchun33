import Nav from '../components/nav'
import { connect } from 'react-redux'
import { logout } from '../action/actions'
import { withRouter } from "react-router-dom";

const mapStatetoProps = (state) => ({
    login: state.login,
    post: state.post
})

const mapDispatchtoProps = (dispatch) => ({
    logout: () => dispatch(logout('http://45.55.26.18:3310/logout'))
})
export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Nav))