import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js'
import Video from './video.js'
import Modal from 'react-modal';
import './Game2.css'
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';
import answerPoseData from './answer.json'
import axios from "axios";

class Game2 extends Component {

    constructor(props){
        super(props, Game2.defaultProps);
        this.state = {
            isModalOpen : false,
            currentImgNum : 0,
            isTimerActive : true,
            answerPose : {}, 
            scoreMent : "",
            animationClass : "",
            pictogramAnimation : "",
            showCamera : true,
            showVideo : true,
            nickname :""
        }
    }
    
    similarityPerImg = [];
    score = []; //하나의 기준당 측정된 similarity 점수를 array로 저장함.
    answerPoseList = [];
    answerTimeList = [];
    answerLength = 0;
    answerPose = {};
    answerTiming = 0.0;
    currentImgNum = 0;
    pictogramList = [];
    leftMargin = [];
    totalScore = 0;
    criteria_excellent = [0.02,0.035,0.04,0.03,0.045,0.045,0.05,0.04,0.03,0.07,0.03,0.009,0.03,0.05,0.04,0.027,0.025,0.03,0.06,0.06,0.07,0.035,0.05,0.04,0.03,0.07]
    criteria_good = [0.025,0.045,0.05,0.045,0.05,0.05,0.055,0.05,0.035,0.08,0.035,0.01,0.033,0.05,0.05,0.03,0.027,0.033,0.08,0.07,0.1,0.04,0.085,0.05,0.035,0.085]
    

    componentDidMount() {
        //pictogram image import
        var i;
        for (i=1; i<=27 ;i++){
            this.pictogramList.push("/img/dundundance/"+i+".png");
        }
        this.setState({nickname : this.props.location.state.nickname});
        //answerdata import
        this.answerPoseList = answerPoseData
        this.answerLength = answerPoseData.length;
        this.answerTimeList = this.answerPoseList.map(element => {
            return element.time
        }) //시간만 따로 빼서 list 만들기
        console.log(this.answerTimeList);
        this.leftMargin = this.answerTimeList.map(element => {
            return (element*400).toString()+"px"
        })
        //initial answerPose and checkTiming
        this.checkTiming = this.answerTimeList[0]
        this.answerPose = {
            score : this.answerPoseList[0].score,
            keypoints : this.answerPoseList[0].keypoints
        }
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

    openModal = () => {
        this.setState({isModalOpen : true});
      }

    cameraStart = () => {
        alert("camera Start");
    }

    gameStart = () => {
        this.changeAnimation(); //camera start
        this.setState({
            pictogramAnimation : "pictogramAnimation"
        }, () => {
            this.video.play(); 
        });
    }
    
    changePictogramAnimation = () => {
        
    }

    getCameraPose = (camerapose) => {
        console.log("camerapose : ", camerapose);
    }

    getSimilarity = (detectedpose) => {
        if(document.getElementById("video")!=null && 
        document.getElementById("video").currentTime > this.checkTiming )
        {
            if(this.currentImgNum<this.answerLength-1){
                this.getScore();
                this.changeAnimation();
                //chage criteria
                this.currentImgNum = this.currentImgNum+1;
                this.checkTiming = this.answerTimeList[this.currentImgNum]
                this.answerPose = {
                    score : this.answerPoseList[this.currentImgNum].score,
                    keypoints : this.answerPoseList[this.currentImgNum].keypoints
                }
            }
            //initialize similarity score array
            this.similarityPerImg = [];

        }
        let poses = [detectedpose, this.answerPose]

        const weightedDistance = poseSimilarity(poses[0], poses[1]);
        // console.log(weightedDistance);
        this.similarityPerImg.push(weightedDistance);
    }

    getScore = () => {
        console.log(this.currentImgNum);
        console.log(this.similarityPerImg.toString());
        var currentScore = Math.min(...this.similarityPerImg)
        this.score.push(currentScore);
        if(currentScore<this.criteria_excellent[this.currentImgNum]){
            this.setState({scoreMent : "excellent"});
            this.totalScore+=10;
          }else if(currentScore<this.criteria_good[this.currentImgNum]){
            this.setState({scoreMent : "good"});
            this.totalScore+=5;
          }else{
            this.setState({scoreMent : "bad"});
            this.totalScore+=0;
          }
    }

    videoEnd = () => {
        console.log("score is" + this.score.toString());
        console.log("score length is" + this.score.length);
        console.log("nickname is" + this.state.nickname);
        console.log("total score is" + this.totalScore);

        axios.post(`/api/board2/add`, {
            name : this.state.nickname,
            score : this.totalScore
        }).then(response=> console.log(response.status))
        
        setTimeout(this.removeElements(), 2000);
        this.openModal();
    }

    removeElements = ()=> {
        this.setState({
          showCamera : false,
          showVideo : false
        })
      }

    render() {
        console.log("game2 render");
        return (
            <div className = "Game2" style ={{
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
                {this.state.showCamera ? 
                <Camera getSimilarity = {this.getSimilarity} cameraStart = {this.cameraStart}/> : null}
                {this.state.showVideo ? 
                <div className = "camera_box">
                    <video id="video" width="700" height="700"
                    playsInline ref={(ref) => {this.video=ref}} style={{transform:"scaleX(-1)"}} onEnded = {this.videoEnd}> 
                        <source src="/video/dun_dun_dance.mp4" type="video/mp4"></source>
                    </video>
                </div> : null}
                
                <div className =  {["dance_info_bar", this.state.pictogramAnimation].join(" ")}>
                    {this.pictogramList.map((element, index) => {
                        var style = {
                            left : this.leftMargin[index]//배열로 미리 계산해주기
                        }
                        return (
                            <div className = "pictogram_wraper" style={style}>
                                <img className = "pictogram" src = {element} ></img>
                            </div>
                        )
                    })}
                </div>
                <div className ="timing_box"></div>
                <div className = "modal_wraper">
                  <Modal className = "score_modal" isOpen={this.state.isModalOpen} close={this.closeModal} >
                    <div className = "score_info">Your Total Score is</div>
                    <div className = "score_total">{this.totalScore}</div>
                    <Link to={{pathname : "/home", state:{nickname : this.props.location.state.nickname}}}>
                      <div class="button_base b05_3d_roll">
                        <div>HOME</div>
                        <div>HOME</div>
                      </div>
                    </Link>
                  </Modal>
                </div>
            </div>
            
            // <Video></Video>
        )
    }
}

export default Game2;