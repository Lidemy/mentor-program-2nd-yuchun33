import React from 'react'
import ReactDOM from 'react-dom'

class NewMission extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value: ''
        }
    }
    //新增任務
    handleSubmit = (event) => {
        this.props.onSubmit(this.state.value)
        event.preventDefault()
    }
    //連接輸入
    handleChange = (event) => {
        this.setState({value: event.target.value})
    }
    render(){
        return(
            <form className='new' onSubmit={this.handleSubmit}>
                <input className='new__input' type='text' value={this.state.value} placeholder='新任務' onChange={this.handleChange}></input>
                <input className='new__submitbtn' type='submit' value='add'></input>
            </form>
        )
    }
}

class Mission extends React.Component{
    //打勾
    handleCheck = () => {
        this.props.onCheck(this.props.index)
    }
    //刪除
    handleDelete = () => {
        this.props.onDelete(this.props.index)
    }
    render(){
        return(
            <div className='mission'>
                <div className='mission__checkbtn'>{this.props.checked ? <button className='mission__checkbtn--checked' onClick={this.handleCheck}></button> : <button className='mission__checkbtn--unchecked' onClick={this.handleCheck}></button>}</div>
                <div className='mission__content'>{this.props.content}</div>
                <button className='mission__deletebtn' onClick={this.handleDelete}>X</button>
            </div>
        )
    }
}

class Container extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            todolist: []
        }
        this.onSubmit = this.onSubmit.bind(this)
    }
    //改變狀態：打勾
    onCheck = (chechedIndex) => {
        let newtodolist = [...this.state.todolist]
        newtodolist[chechedIndex].checked = !newtodolist[chechedIndex].checked
        this.setState({
            todolist: newtodolist
        })
    }
    //改變狀態：刪除
    onDelete = (deleteIndex) => {
        this.setState({
            todolist: this.state.todolist.filter((item,index) => index!=deleteIndex)
        })
    }
    //改變狀態：新增
    onSubmit = (m) => {      
        this.setState({
            todolist: [...this.state.todolist, {checked: false, content: m}]
        })
    }
    render(){
        console.log(this.state.todolist);
        
        return(
            <div>
            <h1 className='title'>待辦清單</h1>
            <NewMission onSubmit = {this.onSubmit}/>
            {this.state.todolist.map( (item,index) => {
                return <Mission key={index} checked={item.checked} content={item.content} index={index} onDelete={this.onDelete} onCheck={this.onCheck}/>
            })}
            </div>
        )
    }
}

ReactDOM.render(
    <Container />,
    document.getElementById('root')
)