import axios from 'axios'
import { GET_POST, APPEND_POST, GET_SINGLE_POST, DELETE_POST, EDIT_POST, LOGIN, GET_USER, LOGOUT } from './actionType'

export const getPosts = (URL) => ({
    type: GET_POST,
    payload: axios.get(URL)
})

export const appendPost = (URL,content) => ({
    type: APPEND_POST,
    payload: axios.post(URL,content)
})

export const getSinglePost = (URL, id) => ({
    type: GET_SINGLE_POST,
    payload: axios.get(URL+id)
})

export const deletePost = (URL, id) => ({
    type: DELETE_POST,
    payload: axios.delete(URL+id)
})

export const editPost = (URL, content) => ({
    type: EDIT_POST,
    payload: axios.put(URL, content)    
})

export const login = (URL, user) => ({
    type: LOGIN,
    payload: axios.post(URL, user)
})

export const getUser = (URL, user) => ({
    type: GET_USER,
    payload: axios.get(URL, user)
})

export const logout = (URL) =>({
    type: LOGOUT,
    payload: axios.get(URL)
})