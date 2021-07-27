import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import './Button.css'
import './Home.css'
import ScoreItem from './ScoreItem';
import axios from "axios";

class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            board1: [],
            board2 : [],
            board3 : [],
            nickname : ""
        };
    }

    componentDidMount() {
        axios.get(`/api/board1/`)
        .then(response => {
            console.log(response);
            this.setState({board1 : [...response.data]});
        })

        if(this.props.location.state  !== undefined) { //nickname from coverpage
            this.setState({nickname : this.props.location.state.nickname});
            console.log("componentDidMount : ",this.props.location.state.nickname);
        }
    }

    render() {
        let gameCard = 
        <div>
            <Link to={{pathname : "/game1", state:{nickname : this.state.nickname}}} className="carousel-item">
                <div className = "carousel-thumbnail-wraper">
                    <img className = "carousel-thumbnail"src = "/img/game2_thumbnail.png"></img>
                </div>
                <link rel="prefetch" href="/images/madDance_background2.png"></link>
            </Link>
            <Link to={{pathname : "/game2", state:{nickname : this.state.nickname}}} className="carousel-item">GAME 2</Link>
            <Link to={{pathname : "/game3", state:{nickname : this.state.nickname}}} className="carousel-item">GAME 3</Link>
        </div>

        return(
            <div className = "Home" style ={{backgroundImage : "url(/img/madDance_background1.jpg)", backgroundSize : "100% 100%"}}>
                <div className = "Home_content_wraper">
                    <div>
                        <div className = "welcome_ment">Wellcome {this.state.nickname} :D</div>
                    </div>
                    <div>
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
                    </div>
                </div>
            </div>
        );
        
    }
}

export default Home;