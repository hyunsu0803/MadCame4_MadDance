import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import ScoreItem from './ScoreItem';
class Home extends Component {
    render() {
        return(
            <div>
                <br/>
                <br/>

                <h1 style={{color:'white'}}>MAD DANCE</h1> 

                <body>
                    <div className="carousel">
                        <div className="carousel-content">
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

export default Home;