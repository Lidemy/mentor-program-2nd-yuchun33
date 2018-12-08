import container from '../components/container'
import { getPosts } from '../action/actions'
import { connect } from 'react-redux'

const mapStatetoProps = (state) => ({
    login: state.login 
})

const mapDispatchtoProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts('http://45.55.26.18:3310/posts?_sort=id&_order=desc')),

})
export default connect(mapStatetoProps, mapDispatchtoProps)(container)