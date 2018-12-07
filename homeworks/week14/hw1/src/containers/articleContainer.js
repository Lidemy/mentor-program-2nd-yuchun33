import Article from '../components/article'
import { connect } from 'react-redux'
import { getSinglePost, deletePost, editPost } from '../action/actions'

const mapStatetoProps = (state) => ({
    post: state.post,
    login: state.login
})

const mapDispatchtoProps = (dispatch) => ({
    getSinglePost: (id) => dispatch(getSinglePost('http://45.55.26.18:3310/posts/',id)),
    deletePost: (id) => dispatch(deletePost('http://45.55.26.18:3310/posts/',id)),
    editPost: (id, content) => dispatch(editPost('http://45.55.26.18:3310/posts/'+id, content)),
})
export default connect(mapStatetoProps, mapDispatchtoProps)(Article)