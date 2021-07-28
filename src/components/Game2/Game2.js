import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js';
import Video from './video.js';
import './Game2.css';
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import DynamicTimeWarping from 'dynamic-time-warping';
import poop1_poses from './answerJson/poop_1.json';
import poop2_poses from './answerJson/poop_2.json';
import poop3_poses from './answerJson/poop_3.json';
import poop4_poses from './answerJson/poop_4.json';
import poop5_poses from './answerJson/poop_5.json';


class Game2 extends Component {

    constructor(props){
        super(props, Game2.defaultProps);
        this.state = {
            currentInterval : 1
        }
    }

    clockCall = undefined;
    cameraPoses = [];
    total_score = 0;

    componentDidMount() {
        console.log("componentDidMount");
    }

    video_ended = () => {
        clearInterval(this.clockCall);
        console.log("@@@@ show score : ", this.total_score);
    }

    run_dtw = (answerKeyPoints, cameraKeyPoints) => {

        var sum_of_distance = 0;
        var i, j;
        for (i = 0; i < 17; i++) {
            for (j = 0; j < 2; j++) {
                var dtw = new DynamicTimeWarping(answerKeyPoints[i][j], cameraKeyPoints[i][j], (a, b) => {
                    return Math.abs(a - b);
                });
                sum_of_distance += dtw.getDistance();
                console.log("@@@@ dtw.getDistance nose_x ", dtw.getDistance());
            }
            
        }

        var interval_score = sum_of_distance / 34;
        console.log("@@@@ interval score ", interval_score);  
        this.total_score += interval_score;
        console.log("@@@@ total score ", this.total_score);
    }

    gameStart = () => {
        console.log("cameraStart");
        alert("cameraStart");

        this.clockCall = setInterval(() => {
            this.timeOut();
        } ,5000);
    }

    timeOut = () => {
        // 모여있던 camera pose를 다 갖고와서 answer pose랑 같이 dtw에 넘김.
        // answer pose 바꿈.
        // 몇 번째 interval인지 체크하고 증가시켜주자
        // 모여있던 camera pose 초기화 해주기 
        
        var answerPoses = undefined;
        var ci = this.state.currentInterval;

        if (ci === 2) answerPoses = poop1_poses;
        else if (ci === 3) answerPoses = poop2_poses;
        else if (ci === 5) answerPoses = poop3_poses;
        else if (ci === 7) answerPoses = poop4_poses;
        else if (ci === 8) answerPoses = poop5_poses;
        else if (ci > 8) {
            this.setState({currentInterval : ci + 1});
            this.cameraPoses = [];
            clearInterval(this.clockCall);
        } else {
            this.setState({currentInterval : ci + 1});
            this.cameraPoses = [];
        }

        var cameraKeyPoints = []; // 0 ~ 16
        var answerKeyPoints = []; // 0 ~ 16

        console.log("@@@@ this.cameraPoses : ", this.cameraPoses)
        console.log("@@@@ currentInterval : ", ci);

        let f = 0, b = 0;
        for (b = 0; b < 17; b++) {

            // answerPoses parsing
            let tempList_per_body_x = []; // 각 부위의 x좌표 모으기
            let tempList_per_body_y = []; // 각 부위의 y좌표 모으기 
            for (f = 0; f < answerPoses.length; f++) {
                let tempframe = answerPoses[f];
                tempList_per_body_x.push(tempframe.keypoints[b].position.x);
                tempList_per_body_y.push(tempframe.keypoints[b].position.y);
            }
            answerKeyPoints.push([tempList_per_body_x, tempList_per_body_y]);
        
            // cameraPoses parsing
            tempList_per_body_x = []; // 각 부위의 x좌표 모으기
            tempList_per_body_y = []; // 각 부위의 y좌표 모으기 
            for (f = 0; f < this.cameraPoses.length; f++) {
                let tempframe = this.cameraPoses[f];
                tempList_per_body_x.push(tempframe.keypoints[b].position.x);
                tempList_per_body_y.push(tempframe.keypoints[b].position.y);
            }
            cameraKeyPoints.push([tempList_per_body_x, tempList_per_body_y]);            
        }

        this.cameraPoses = [];
        this.setState({currentInterval : ci + 1});
        this.run_dtw(answerKeyPoints, cameraKeyPoints);
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

    //     // this.frameNum += 1;
    // }

    getCameraPose = (camerapose) => {
        // console.log("camerapose : ", camerapose);
        this.cameraPoses.push(camerapose);
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
                <Camera getCameraPose = {this.getCameraPose} gameStart = {this.gameStart}/>
                {/* <Video getVideoPose = {this.getVideoPose} videoStart = {this.videoStart} poses_to_jsonfile = {this.poses_to_jsonfile} /> */}
                <Video videoStart = {this.videoStart} video_ended = {this.video_ended} />
            </div>
        )
    }
}

export default Game2;