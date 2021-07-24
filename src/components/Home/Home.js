import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import ScoreItem from './ScoreItem';
import axios from "axios";

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            board1: [],
            board2 : [],
            board3 : []
        };
    }


    componentDidMount() {
        axios.get(`/api/board1/`)
        .then(response => {
            console.log(response);
            this.setState({board1 : [...response.data]});
        });
        // axios.get(`/api/board2/`)
        // .then(response => {
        //     console.log(response)
        // });
        // axios.get(`/api/board3/`)
        // .then(response => {
        //     console.log(response)
        // });
    }

    render() {
        console.log(this.state.board1);
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
                                {this.state.board1.map(row => (<ScoreItem key = {row.rnk} row = {row}/>))}
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
                                {/* {this.state.board3.map(row => (<ScoreItem key = {row.rnk} row = {row}/>))} */}
                            </div>
                        </div>
                    </div>
                </body>
            </div>
        );
    }
}

export default Home;