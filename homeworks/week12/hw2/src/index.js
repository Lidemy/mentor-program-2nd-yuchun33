import React from 'react';
import ReactDOM from 'react-dom';

const SIZE = 19

function Square(props){
    if(props.content.marked){
        if(props.content.value == 'black'){
            return (<button className="square clicked marked" onClick={props.onClick}><i className="fas fa-circle fa-xs"></i></button>)
        } else {
            return (<button className="square clicked marked" onClick={props.onClick}><i className="far fa-circle fa-xs"></i></button>)
        }
    } else if (props.content.value){
        if(props.content.value == 'black'){
            return (<button className="square clicked" onClick={props.onClick}><i className="fas fa-circle fa-xs"></i></button>)
        } else {
            return (<button className="square clicked" onClick={props.onClick}><i className="far fa-circle fa-xs"></i></button>)
        }
    } else {
        return (<button className="square" onClick={props.onClick}>{props.content.value}</button>)
    }
}

class Board extends React.Component{
    //畫格子
    renderSquare(i,j){
        return (
        <Square 
            key = {i*SIZE+j}
            content = {this.props.squares[i][j]}
            onClick = {() => this.props.onClick(i,j)}/>
        )
    }
    //畫棋盤
    createBoard = () =>{
        let row = []
        for(let i=0; i<SIZE; i++){
            let column = []
            for(let j=0; j<SIZE; j++){
                column.push(this.renderSquare(i,j))
            }
            row.push(<div>{column}</div>)
        }
        return row
    }
    render(){
        return(            
            <div>
                {this.createBoard()}
            </div>
        )
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            history: [{
                squares: Array(SIZE).fill(Array(SIZE).fill({value: null, marked: false})),//格子內：值、標記
            }],
            stepNumber: 0,
            blackIsNext: true,
        }
    }
    //改變狀態
    handleClick(i,j){;
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length-1]
        const squares = current.squares.map(function(arr) {
            return arr.map(function(obj){
                return Object.assign({}, obj)
            })
        });  
        if (squares[i][j].value||calculateWinner(squares)) {
            return 
        } else {
            squares[i][j].value = this.state.blackIsNext ? 'black' : 'white' //標記新的點
            if (calculateWinner(squares)){
                let line = calculateWinner(squares)
                for (let i=0; i<line.length; i++){
                    squares[line[i][0]][line[i][1]].marked = true //標記連線
                }
            }
            this.setState({
                history: history.concat([{
                    squares: squares,
                }]),
                stepNumber: history.length,
                blackIsNext: !this.state.blackIsNext
            })
        }
    }
    //重新玩一局，清空
    handleRestart = () => {
        this.setState({
            history: [{
                squares: Array(SIZE).fill(Array(SIZE).fill({value: null, marked: false})),
            }],
            stepNumber: 0,
            xIsNext: true,
        })
    }
    render(){
        const history = this.state.history //歷史紀錄
        const current = history[this.state.stepNumber] //現在的狀態
        const winner = calculateWinner(current.squares) // 5 顆連線
        
        let status
        let again
        if(winner){
            status = 'Winner: ' + (this.state.blackIsNext ? '白棋' : '黑棋')
            again = '再玩一次'
        } else if(this.state.stepNumber == (SIZE*SIZE)){
            status = '和局'
            again = '再玩一次'
        } else{
            status = '現在輪到: ' + (this.state.blackIsNext ?　'黑棋' : '白棋')
            again = '重來一局'
        }
        return(
            <div className="game">
                <div className="game-board">
                    <Board 
                        line = {winner}
                        squares={current.squares}
                        onClick={(i,j) => this.handleClick(i,j)}
                    />
                </div>
                <div className="game-info">
                    <h1 className="title">五子棋</h1>
                    <h2 className="status">{status}</h2>
                    <button className="restartbtn" onClick={this.handleRestart}>{again}</button>
                </div>

            </div>
        )
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
)

//檢查輸贏
function calculateWinner(squares){
    for(let i=2; i<SIZE-2; i++){
        for(let j=2; j<SIZE-2; j++){
            if (squares[i][j].value && squares[i][j].value==squares[i][j-2].value && squares[i][j].value==squares[i][j-1].value && squares[i][j].value==squares[i][j+1].value && squares[i][j].value==squares[i][j+2].value){
                let line = [[i,j-2], [i,j-1], [i,j], [i,j+1], [i,j+2]]
                return line
            } else if (squares[i][j].value && squares[i][j].value==squares[i-2][j].value && squares[i][j].value==squares[i-1][j].value && squares[i][j].value==squares[i+1][j].value && squares[i][j].value==squares[i+2][j].value) {
                let line = [[i-2,j], [i-1,j], [i,j], [i+1,j], [i+2,j]]
                return line
            } else if (squares[i][j].value && squares[i][j].value==squares[i-2][j-2].value && squares[i][j].value==squares[i-1][j-1].value && squares[i][j].value==squares[i+1][j+1].value && squares[i][j].value==squares[i+2][j+2].value){
                let line = [[i,j], [i-2,j-2], [i-1,j-1], [i+1,j+1], [i+2,j+2]]
                return line
            } else if (squares[i][j].value && squares[i][j].value==squares[i-1][j+1].value && squares[i][j].value==squares[i-2][j+2].value && squares[i][j].value==squares[i+1][j-1].value && squares[i][j].value==squares[i+2][j-2].value){
                let line = [[i,j], [i-1,j+1], [i-2,j+2], [i+1,j-1], [i+2,j-2]]
                return line
            }
        }
    }
    return null   
}