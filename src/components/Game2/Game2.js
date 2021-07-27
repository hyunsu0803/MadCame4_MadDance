import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js'
import Video from './video.js'
import './Game2.css'
import Timer from './timer.js'
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';


class Game2 extends Component {

    constructor(props){
        super(props, Game2.defaultProps);
        this.state = {
            currentImgNum : 0,
            isTimerActive : true,
            answerPose : {},
            imgList : [],
            scoreMent : "",
            animationClass : ""
        }
    }
    
    similarityPerImg = [];
    score = [];

    async componentDidMount() {
        console.log("componentDidMount");
    }

    cameraStart = () => {
        console.log("cameraStart");
        alert("cameraStart");

        setTimeout(()=>{
            console.log("camera start after 4000ms...");
        }, 4000);
    }

    videoStart = () => {
        console.log("videoStart");
        alert("videoStart");
    }

    getVideoPose = (videopose) => {
        console.log("videopose : ", videopose);
    }

    getCameraPose = (camerapose) => {
        console.log("camerapose : ", camerapose);
    }

    render() {
        console.log("game2 render");
        return (
            <div className = "SpeedGame">
                <Link to={{pathname : "/home", state:{nickname : this.props.location.state.nickname}}}>
                    <div class="button_base b05_3d_roll">
                            <div>HOME</div>
                            <div>HOME</div>
                    </div>
                </Link>
                <Camera getCameraPose = {this.getCameraPose} cameraStart = {this.cameraStart}/>
                <Video getVideoPose = {this.getVideoPose} videoStart = {this.videoStart} />
            </div>
        )
    }
}

export default Game2;