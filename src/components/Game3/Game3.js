import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js';
import Video from './video.js';
import './Game3.css';
import Modal from 'react-modal';
import DynamicTimeWarping from 'dynamic-time-warping';
import poop1_poses from './answerJson/poop_1.json';
import poop2_poses from './answerJson/poop_2.json';
import poop3_poses from './answerJson/poop_3.json';
import poop4_poses from './answerJson/poop_4.json';
import poop5_poses from './answerJson/poop_5.json';
import axios from 'axios';


class Game3 extends Component {

    constructor(props){
        super(props, Game3.defaultProps);
        this.state = {
            currentInterval : undefined,
            isModalOpen : false,
            showCamera : true,
            showVideo : true,
            scoreMent : " ",
            animationLCass : "",
            nickname : ""
        }
    }

    clockCall = undefined;
    cameraPoses = [];
    total_score = 0;
    is_grading = false;
    answerPosesList = [undefined, undefined, poop1_poses, poop2_poses, undefined, poop3_poses, undefined, poop4_poses, poop5_poses];

    componentDidMount() {
        console.log("componentDidMount");
        this.setState({nickname : this.props.location.state.nickname});
    }

    gameStart = () => {
        this.is_grading = true;
        this.setState({currentInterval : 1});
        this.video.play();

        this.clockCall = setInterval(() => {
            console.log("#### setInterval, currentInterval : ", this.state.currentInterval);
            if (this.is_grading){
                this.timeOut();
            }
        } ,5000);
    }

    getCameraPose = (camerapose) => {
        this.cameraPoses.push(camerapose);
    }

    timeOut = () => {

        var answerPoses = undefined;
        var ci = this.state.currentInterval;

        if (ci === 2 || ci === 3 || ci === 5 || ci === 7 || ci === 8) 
        {
            this.changeAnimation();

            answerPoses = this.answerPosesList[ci];
            var cameraKeyPoints = []; // 0 ~ 16
            var answerKeyPoints = []; // 0 ~ 16

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
        
        } else {
            this.setState({currentInterval : ci + 1});
            this.cameraPoses = [];
            return;
        }
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
            }
            
        }

        var interval_score = sum_of_distance / 34;
        this.total_score += this.getGrade(interval_score);

        if (this.getGrade(interval_score) === 20) {
            this.setState({scoreMent : "excellent"});
        } else if (this.getGrade(interval_score) === 10) {
            this.setState({scoreMent : "good"});
        } else {
            this.setState({scoreMent : "bad"});
        }
    }

    getGrade = (interval_score) => {
        if (interval_score > 2000) {
            return 0;
        }else if (interval_score > 1500) {
            return 10;
        }else {
            return 20;
        }
    } 

    video_ended = () => {

        axios.post(`/api/board3/add`, {
            name : this.state.nickname,
            score : this.total_score
        }).then(response => console.log(response.status));

        clearInterval(this.clockCall);
        this.is_grading = false;
        setTimeout(this.removeElements(), 2000);
        this.openModal();
    }

    openModal = () => {
        this.setState({isModalOpen : true});
    }

    removeElements = () => {
        this.setState({
            showCamera : false,
            showVideo : false
        })
    }

    changeAnimation = () => {
        if(this.state.animationClass ===""){
          this.setState({animationClass: "popAnimation"})
        }else{
          this.setState({animationClass : ""})
        }
    }

    animationEnd = () => {
        this.changeAnimation();
    }

    render() {
        console.log("game3 render");
        return (
            <div className = "Game3" style ={{
                backgroundImage : "url(/img/madDance_background2.jpg)", 
                backgroundSize : "100% 100%"
                }}>

                <header className="header_buttons">
                    <div className = "start_button_position">
                        <div className = "game_start" onClick = {this.gameStart}>
                            
                            <div className = "button_base b05_3d_roll">
                                <div>GAME START</div>
                                <div>GAME START</div>
                            </div>
                        </div>
                    </div>
                   
                    <Link to={{pathname : "/home", state:{nickname : this.state.nickname}}}>
                        <div class = "home_button_position">
                        <div class="button_base b05_3d_roll">
                                <div>HOME</div>
                                <div>HOME</div>
                        </div>
                        </div>
                        
                    </Link>
                </header>
                
                <div className = {["neonText", "score", this.state.animationClass].join(' ')}  onAnimationEnd = {this.animationEnd}>{this.state.scoreMent}</div>
                {this.state.showCamera ? <Camera getCameraPose = {this.getCameraPose}/> : null}
                {this.state.showVideo ? 
                <div className = "camera_box">
                    <video id="video" width="700" height="700"
                    playsInline ref={(ref) => {this.video=ref}} style={{transform:"scaleX(-1)"}} onEnded = {this.video_ended}> 
                        <source src="/video/poop.mp4" type="video/mp4"></source>
                    </video>
                </div> : null}
                <div className = "modal_wraper">
                  <Modal className = "score_modal" isOpen={this.state.isModalOpen} close={this.closeModal} >
                    <div className = "score_info">Your Total Score is</div>
                    <div className = "score_total">{this.total_score}</div>
                    <Link to={{pathname : "/home", state:{nickname : this.props.location.state.nickname}}}>
                      <div class="button_base b05_3d_roll">
                        <div>HOME</div>
                        <div>HOME</div>
                      </div>
                    </Link>
                  </Modal>
                </div>
            </div>
        )
    }
}

export default Game3;