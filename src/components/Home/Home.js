import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import './gameCard.css'
import './scoreBoard.css'
import './Button.css'
import './Home.css'
import ScoreItem from './ScoreItem';
import axios from "axios";
import {Howl, Howler} from 'howler';
import { withRouter } from 'react-router-dom';

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
        axios.get(`/api/board2/`)
        .then(response => {
            console.log(response);
            this.setState({board2 : [...response.data]});
        })
        axios.get(`/api/board3/`)
        .then(response => {
            console.log(response);
            this.setState({board3 : [...response.data]});
        })

        if(this.props.location.state  !== undefined) { //nickname from coverpage
            this.setState({nickname : this.props.location.state.nickname});
            console.log("componentDidMount : ",this.props.location.state.nickname);
        }
    }

    soundPlay = (src)=> {
        const sound = new Howl({
            src
        })
        sound.play();
    }

    toGame1 = ()=> {
        this.soundPlay("/sound/Coin.wav");
        this.props.history.push({
            pathname: '/game1',
            state: { nickname : this.state.nickname}
        });
    }
    toGame2 = ()=> {
        this.soundPlay("/sound/Coin.wav");
        this.props.history.push({
            pathname: '/game2',
            state: { nickname : this.state.nickname}
        });
    }
    toGame3 = ()=> {
        this.soundPlay("/sound/Coin.wav");
        this.props.history.push({
            pathname: '/game3',
            state: { nickname : this.state.nickname}
        });
    }



    render() {
        Howler.volume(0.5)
        let gameCard = 
        <div>
            <div className="carousel-item" onClick = {this.toGame1}>
            <div className = "carousel_thumbnail_wraper">
                    <img className = "carousel_thumbnail" src = {"/img/thumbnail1.png"}></img>
                </div>
            </div>
            <div className="carousel-item" onClick = {this.toGame2}>
            <div className = "carousel_thumbnail_wraper">
                    <img className = "carousel_thumbnail" src = {"/img/thumbnail3.png"}></img>
                </div>
            </div>
            <div className="carousel-item" onClick = {this.toGame3}>
            <div className = "carousel_thumbnail_wraper">
                    <img className = "carousel_thumbnail" src = {"/img/thumbnail2.png"}></img>
                </div>
            </div>
        </div>

        return(
            <div className = "Home" style ={{backgroundImage : "url(/img/madDance_background1.jpg)", backgroundSize : "100% 100%"}}>
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
                                    
                                </div>
                                {this.state.board1.map((row,index) => (<ScoreItem key = {index} row = {row}/>))}
                            </div>
                            <div className="board-item">
                                <div className="ScoreBoard">
                                    GAME 2 Score Board <br/>
                                    
                                </div>
                                {this.state.board2.map((row,index) => (<ScoreItem key = {index} row = {row}/>))}
                            </div>
                            <div className="board-item">
                                <div className="ScoreBoard">
                                    GAME 3 Score Board <br/>
                                    
                                </div>
                                {this.state.board3.map((row,index) => (<ScoreItem key = {index} row = {row}/>))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
        
    }
}

export default withRouter(Home);