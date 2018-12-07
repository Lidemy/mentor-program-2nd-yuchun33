import { GET_POST, APPEND_POST, GET_SINGLE_POST, DELETE_POST, EDIT_POST, LOGIN, GET_USER, LOGOUT } from '../action/actionType'

function posts(state={
    isFetching: false,
    posts: [],
    post: [],
    login: false,
    updateList: false

}, action){
    switch(action.type){
        case `${GET_POST}_FULFILLED`:
            console.log(action.payload);
            return Object.assign({}, state, {
                isFetching: false,
                posts: action.payload.data,
            })
        case `${GET_SINGLE_POST}_FULFILLED`:
            console.log(action.payload);
            return Object.assign({}, state, {
                isFetching: false,
                post: action.payload.data
            })
        case `${DELETE_POST}_FULFILLED`:
            console.log('delete successfully');
            return Object.assign({}, state, {
                updateList: true
            })
        case `${EDIT_POST}_FULFILLED`:
            console.log('edit successfully');
            return Object.assign({}, state, {
                updateList: true
            })//一定要再給一次嗎?
        case `${LOGIN}_FULFILLED`:            
            console.log('成功登入');
        case `${GET_USER}_FULFILLED`:
            console.log(action.payload.data.result);
            return Object.assign({}, state, {
                login: action.payload.data.result
            })
        case `${LOGOUT}_FULFILLED`:
            return Object.assign({}, state, {
                login: false
            })
        default:
            return state
    }
}

export default posts