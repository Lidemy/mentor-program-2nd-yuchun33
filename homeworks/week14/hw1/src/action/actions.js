import axios from 'axios'
import { GET_POST, APPEND_POST, GET_SINGLE_POST, DELETE_POST, EDIT_POST, LOGIN, GET_USER, LOGOUT, UPDATE_FINISHED, GET_LAST_POST, UPDATE_SINGLE_FINISHED } from './actionType'

//拿全部的文章
export const getPosts = (URL) => ({
    type: GET_POST,
    payload: axios.get(URL)
})

//新增文章
export const appendPost = (URL,content) => ({
    type: APPEND_POST,
    payload: axios.post(URL,content)
})

//拿單篇文章
export const getSinglePost = (URL, id) => ({
    type: GET_SINGLE_POST,
    payload: axios.get(URL+id)
})

//刪除文章
export const deletePost = (URL, id) => ({
    type: DELETE_POST,
    payload: axios.delete(URL+id)
})

//編輯文章
export const editPost = (URL, content) => ({
    type: EDIT_POST,
    payload: axios.put(URL, content)    
})

//登入
export const login = (URL, user) => ({
    type: LOGIN,
    payload: axios.post(URL, user)
})

//確認登入
export const getUser = (URL, user) => ({
    type: GET_USER,
    payload: axios.get(URL, user)
})

//登出
export const logout = (URL) =>({
    type: LOGOUT,
    payload: axios.get(URL)
})

//更新完畢文章列表
export const updateFinished = () =>({
    type: UPDATE_FINISHED
})

//更新完畢文章內容
export const updateSingleFinished = () =>({
    type: UPDATE_SINGLE_FINISHED
})

//拿最新的文章
export const getLastPost = (URL) =>({
    type: GET_LAST_POST,
    payload: axios.get(URL)
})