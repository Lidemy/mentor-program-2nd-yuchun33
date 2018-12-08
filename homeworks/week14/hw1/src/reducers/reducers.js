import { GET_POST, APPEND_POST, GET_SINGLE_POST, DELETE_POST, EDIT_POST, LOGIN, GET_USER, LOGOUT, UPDATE_FINISHED, GET_LAST_POST, UPDATE_SINGLE_FINISHED } from '../action/actionType'

function posts(state={
    isFetching: false,
    posts: [],
    post: [],
    login: false,
    updateList: false,
    updateSingle: false
}, action){
    switch(action.type){
        //拿全部的文章
        case `${GET_POST}_FULFILLED`:
            return Object.assign({}, state, {
                isFetching: false,
                posts: action.payload.data,
            })

        //拿單篇文章
        case `${GET_SINGLE_POST}_FULFILLED`:
            return Object.assign({}, state, {
                isFetching: false,
                post: action.payload.data
            })

        //刪除文章
        case `${DELETE_POST}_FULFILLED`:
            console.log('delete successfully');
            return Object.assign({}, state, {
                updateList: true,
                updateSingle: true
            })

        //編輯文章
        case `${EDIT_POST}_FULFILLED`:
            console.log('edit successfully');
            return Object.assign({}, state, {
                updateList: true,
                updateSingle: true
            })//一定要再給一次嗎?
        
        //登入
        case `${LOGIN}_FULFILLED`:       
        
        //取得使用者狀態
        case `${GET_USER}_FULFILLED`:
            console.log(action.payload.data.result);
            return Object.assign({}, state, {
                login: action.payload.data.result
            })
        
        //登出
        case `${LOGOUT}_FULFILLED`:
            return Object.assign({}, state, {
                login: false
            })
        
        //ArticleList component 更新完成
        case UPDATE_FINISHED:
            return Object.assign({}, state, {
                updateList: false
            })
        
        //Article component 更新完成
        case UPDATE_SINGLE_FINISHED:
            return Object.assign({}, state, {
                updateSingle: false
            })
        
        //新增文章
        case `${APPEND_POST}_FULFILLED`:
            return Object.assign({}, state, {
                updateList: true,
                updateSingle: true
        })

        //取最新一篇
        case `${GET_LAST_POST}_FULFILLED`:
            return Object.assign({}, state, {
                post: action.payload.data
        })
        
        default:
            return state
    }
}

export default posts