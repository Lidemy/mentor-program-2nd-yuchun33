import newArticle from '../components/newarticle'
import { connect } from 'react-redux'
import { appendPost, getPosts } from '../action/actions'

const mapStatetoProps = (state) => ({
    post: state.post
})

const mapDispatchtoProps = (dispatch) => ({
    appendPost: (content) => dispatch(appendPost('http://45.55.26.18:3310/posts',content)),
    getPosts: () => dispatch(getPosts('http://45.55.26.18:3310/posts?_sort=id&_order=desc')),
    
})

export default connect(mapStatetoProps, mapDispatchtoProps)(newArticle)