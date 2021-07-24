import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import './Button.css'
import Login from './Login'
import ScoreItem from './ScoreItem';
import axios from "axios";

class Home extends Component {
   
    setNickname = (nickname) => {
        this.setState({nickname : nickname});
        console.log("Home : ", this.state.nickname);
    }

    getNickname = () => {
        return this.state.nickname;
    }
    constructor(props){
        super(props);
        this.state = {
            board1: [],
            board2 : [],
            board3 : [],
            nickname : "login_please"
        };
    }

    componentDidMount() {
        axios.get(`/api/board1/`)
        .then(response => {
            console.log(response);
            this.setState({board1 : [...response.data]});
        }).then(
        axios.post(`/api/board1/add`, {
            name : "hyemin",
            score : 20
        }).then(response=> console.log(response.status)))
        // axios.get(`/api/board2/`)
        // .then(response => {
        //     console.log(response)
        // });
        // axios.get(`/api/board3/`)
        // .then(response => {
        //     console.log(response)
        // });

        
        if(this.props.location.state  !== undefined) {
            this.setState({nickname : this.props.location.state.nickname});
            console.log("componentDidMount : ",this.props.location.state.nickname);
        }
    }

    render() {
        let gameCard = null;
        if(this.state.nickname === "login_please"){
            gameCard = <div onClick={function(e){
                e.preventDefault();
                alert("Login first. Please input any nickname");
            }}>
            <div className="carousel-item">GAME 1</div>
            <div className="carousel-item">GAME 2</div>
            <div className="carousel-item">GAME 3</div>
            </div>
        } else {
            gameCard = <div>
            <Link to={{pathname : "/game1", state:{nickname : this.state.nickname}}} className="carousel-item">GAME 1</Link>
            <Link to={{pathname : "/game2", state:{nickname : this.state.nickname}}} className="carousel-item">GAME 2</Link>
            <Link to={{pathname : "/game3", state:{nickname : this.state.nickname}}} className="carousel-item">GAME 3</Link>
            </div>
        }

        return(
            <div>
                <br/>
                <br/>

                <h1 style={{color:'white'}}>MAD DANCE</h1> 

                <br/>
                <Login setNickname={this.setNickname} getNickname={this.getNickname}></Login>

                <body>
                    <div className="carousel">
                        <div className="carousel-content">
                            {gameCard}                            
                        </div>
                    </div>

                    <div className="board">
                        <div className="board-content">
                            <div className="board-item">
                                <div className="ScoreBoard">
                                    GAME 1 Score Board <br/>
                                    -----------------------------
                                </div>
                                {this.state.board1.map(row => (<ScoreItem key = {row.rank} row = {row}/>))}
                            </div>
                            <div className="board-item">
                                <div className="ScoreBoard">
                                    GAME 2 Score Board <br/>
                                    -----------------------------
                                </div>
                                {/* {this.state.board2.map(row => (<ScoreItem key = {row.rnk} row = {row}/>))} */}
                            </div>
                            <div className="board-item">
                                <div className="ScoreBoard">
                                    GAME 3 Score Board <br/>
                                    -----------------------------
                                </div>
                                {/* {this.state.board2.map(row => (<ScoreItem key = {row.rnk} row = {row}/>))} */}
                            </div>
                        </div>
                    </div>

                    
                </body>
            </div>
        );
        
    }
}

export default Home;