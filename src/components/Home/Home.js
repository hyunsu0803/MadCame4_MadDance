import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import './Button.css'
import Login from './Login'
import ScoreItem from './ScoreItem';
import axios from "axios";

class Home extends Component {

    state = {
        Nickname : "login_please"
    }

    setNickname = (nickname) => {
        this.setState({Nickname : nickname});
        console.log("Home : ", this.state.Nickname);
    }

    getNickname = () => {
        return this.state.Nickname;
    }

    componentDidMount() {
        axios.get(`/api/board1/`)
        .then(response => {
            console.log(response)
        });
    }

    render() {
        if (this.state.Nickname === 'login_please'){
            return(
                <div>
                    <br/>
                    <br/>
    
                    <h1 style={{color:'white'}}>MAD DANCE</h1> 
    
                    <br/>
                    <Login setNickname={this.setNickname} getNickname={this.getNickname}></Login>
    
                    <body>
                        <div className="carousel">
                            <div className="carousel-content" 
                            onClick={function(e){
                                e.preventDefault();
                                alert("Login first. please input any nickname.");
                            }}>
                                <div className="carousel-item">GAME 1</div>
                                <div className="carousel-item">GAME 2</div>
                                <div className="carousel-item">GAME 3</div>
                            </div>
                        </div>
    
                        <div className="board">
                            <div className="board-content">
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 1 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                    
                                </div>
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 2 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                </div>
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 3 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            );
        }
        else {
            return(
                <div>
                    <br/>
                    <br/>
    
                    <h1 style={{color:'white'}}>MAD DANCE</h1> 
    
                    <br/>
                    <Login setNickname={this.setNickname} getNickname={this.getNickname}></Login>
    
                    <body>
                        <div className="carousel">
                            <div className="carousel-content" >
                                <Link to="/game1" className="carousel-item">GAME 1</Link>
                                <Link to="/game2" className="carousel-item">GAME 2</Link>
                                <Link to="/game3" className="carousel-item">GAME 3</Link>
                            </div>
                        </div>
    
                        <div className="board">
                            <div className="board-content">
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 1 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                    
                                </div>
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 2 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                </div>
                                <div className="board-item">
                                    <div className="ScoreBoard">
                                        GAME 3 Score Board <br/>
                                        -----------------------------
                                    </div>
                                    <ScoreItem ranking="1" name="LeeJuEun" score="100"></ScoreItem>
                                    <ScoreItem ranking="2" name="LeeHyeMin" score="100"></ScoreItem>
                                    <ScoreItem ranking="3" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="4" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="5" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="6" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="7" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="8" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="9" name="KimHyunSoo" score="100"></ScoreItem>
                                    <ScoreItem ranking="10" name="KimHyunSoo" score="100"></ScoreItem>
                                </div>
                            </div>
                        </div>
                    </body>
                </div>
            );
        }
        
    }
}

export default Home;