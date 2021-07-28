import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js';
import Video from './video.js';
import './Game2.css';
import Timer from './timer.js';
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import DynamicTimeWarping from 'dynamic-time-warping';
import poop1_poses from './answerJson/poop_1.json';
import poop2_poses from './answerJson/poop_2.json';
import poop3_poses from './answerJson/poop_3.json';
import poop4_poses from './answerJson/poop_4.json';
import poop5_poses from './answerJson/poop_5.json';
import poop6_poses from './answerJson/poop_6.json';
import poop7_poses from './answerJson/poop_7.json';

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

    sampleVideoPoses = [];
    frameNum = 0;
    keypoints = []; // 0~16
    keypoints2 = undefined;

    componentDidMount() {
        console.log("componentDidMount");
    }

    
    poses_to_jsonfile = () => {

        console.log("video ended");

        // console.log("$$$$ poop1_poses.length : ", poop1_poses.length);
        // console.log("$$$$ poo1_poses ", poop1_poses);

        // console.log("@@@@ this.sampleVideoPoses.length : ", this.sampleVideoPoses.length);
        // console.log("@@@@ this.sampleVideoPoses", this.sampleVideoPoses);
        
        // let f = 0, b = 0;
        // for (b = 0; b < 17; b++) {
        //     let tempList_per_body_x = [];
        //     let tempList_per_body_y = [];

        //     for (f = 0; f < this.sampleVideoPoses.length; f++) {
        //         let tempframe = this.sampleVideoPoses[f];
        //         tempList_per_body_x.push(tempframe.frame.keypoints[b].position.x);
        //         tempList_per_body_y.push(tempframe.frame.keypoints[b].position.y);
        //     }
             
        //     this.keypoints.push([tempList_per_body_x, tempList_per_body_y]);
        //     console.log("@@@@ tempLists_per_body_x, y ", [tempList_per_body_x, tempList_per_body_y]);            
        // }

        // console.log("@@@@ ", this.keypoints);
        // this.keypoints2 = this.keypoints;

        // this.run_dtw();
    }

    run_dtw = () => {
        if (this.keypoints[0][0].length === 0)
        return;

        var sum_of_distance = 0;
        var i, j;
        for (i = 0; i < 17; i++) {
            for (j = 0; j < 2; j++) {
                var dtw = new DynamicTimeWarping(this.keypoints[i][j], this.keypoints2[i][j], (a, b) => {
                    return Math.abs(a - b);
                });
                sum_of_distance += dtw.getDistance();
                console.log("@@@@ dtw.getDistance nose_x ", dtw.getDistance());
            }
            
        }

        var final_score = sum_of_distance / 34;
        console.log("@@@@ final score ", final_score);  
    }

    cameraStart = () => {
        console.log("cameraStart");
        alert("cameraStart");

    }

    videoStart = () => {
        console.log("videoStart");
        alert("videoStart");
    }

    // getVideoPose = (videopose) => {
    //     console.log("videopose : ", videopose);
    //     let framenum = this.frameNum;
    //     // this.sampleVideoPoses.push({"number" : framenum, "frame" : videopose});
    //     this.sampleVideoPoses.push(JSON.stringify(videopose));

    //     this.frameNum += 1;
    // }

    getCameraPose = (camerapose) => {
        // console.log("camerapose : ", camerapose);
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
                {/* <Video getVideoPose = {this.getVideoPose} videoStart = {this.videoStart} poses_to_jsonfile = {this.poses_to_jsonfile} /> */}
                <Video videoStart = {this.videoStart} poses_to_jsonfile = {this.poses_to_jsonfile} />
            </div>
        )
    }
}

export default Game2;