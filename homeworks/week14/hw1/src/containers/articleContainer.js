import Article from '../components/article'
import { connect } from 'react-redux'
import { getSinglePost, deletePost, editPost, getLastPost, updateSingleFinished } from '../action/actions'
import { withRouter } from 'react-router-dom'

const mapStatetoProps = (state) => ({
    post: state.post,
    login: state.login,
    updateSingle: state.updateSingle
})

const mapDispatchtoProps = (dispatch) => ({
    getSinglePost: (id) => dispatch(getSinglePost('http://45.55.26.18:3310/posts/',id)),
    deletePost: (id) => dispatch(deletePost('http://45.55.26.18:3310/posts/',id)),
    editPost: (id, content) => dispatch(editPost('http://45.55.26.18:3310/posts/'+id, content)),
    getLastPost: () => dispatch(getLastPost('http://45.55.26.18:3310/posts?_sort=id&_order=desc&_limit=1')),
    updateSingleFinished: () => dispatch(updateSingleFinished())
})
export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Article))//withRouter 改成在這裡，但其他完全沒變，神奇