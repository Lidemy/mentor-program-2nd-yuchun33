import articleList from '../components/articleList'
import { getPosts, updateFinished } from '../action/actions'
import { connect } from 'react-redux'

const mapStatetoProps = (state) => ({
    posts: state.posts,
    login: state.login,
    updateList: state.updateList
})

const mapDispatchtoProps = (dispatch) => ({
    getPosts: () => dispatch(getPosts('http://45.55.26.18:3310/posts?_sort=id&_order=desc')),
    updateFinished: ()=> dispatch(updateFinished())

})
export default connect(mapStatetoProps,mapDispatchtoProps)(articleList)