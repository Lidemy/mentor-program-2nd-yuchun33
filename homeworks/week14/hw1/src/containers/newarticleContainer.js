import newArticle from '../components/newarticle'
import { connect } from 'react-redux'
import { appendPost } from '../action/actions'

const mapDispatchtoProps = (dispatch) => ({
    appendPost: (content) => dispatch(appendPost('http://45.55.26.18:3310/posts',content))
})

export default connect(null,mapDispatchtoProps)(newArticle)