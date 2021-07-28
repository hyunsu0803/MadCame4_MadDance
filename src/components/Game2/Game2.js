import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js'
import Video from './video.js'
import './Game2.css'
import Timer from './timer.js'
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';
import answerPoseData from './answer.json'


class Game2 extends Component {

    constructor(props){
        super(props, Game2.defaultProps);
        this.state = {
            currentImgNum : 0,
            isTimerActive : true,
            answerPose : {}, 
            scoreMent : "",
            animationClass : "",
            pictogramAnimation : "",
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

    componentDidMount() {
        //pictogram image import
        var i;
        for (i=1; i<=27 ;i++){
            this.pictogramList.push("/img/dundundance/"+i+".png");
        }
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
        if(document.getElementById("video").currentTime > this.checkTiming ){
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
        if(currentScore<0.05){
            this.setState({scoreMent : "excellent"});
            this.totalScore+=10;
          }else if(currentScore<0.01){
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
    }

    // pictogramAnimation : "pictogramAnimation
    // if(this.state.)
    render() {
        console.log("game2 render");
        return (
            <div className = "Game2" style ={{
                backgroundImage : "url(/img/madDance_background2.jpg)", 
                backgroundSize : "100% 100%"
                }}>
                <button onClick = {this.gameStart}>GAMESTART</button>
                <Link to={{pathname : "/home", state:{nickname : this.props.location.state.nickname}}}>
                    <div class="button_base b05_3d_roll home_button">
                            <div>HOME</div>
                            <div>HOME</div>
                    </div>
                </Link>
                <div className = {["neonText", "score", this.state.animationClass].join(' ')}  onAnimationEnd = {this.animationEnd}>{this.state.scoreMent}</div>
                <Camera getCameraPose = {this.getCameraPose} cameraStart = {this.cameraStart} getSimilarity = {this.getSimilarity}/>
                <div className = "camera_box">
                    <video id="video" width="700" height="700"
                    playsInline ref={(ref) => {this.video=ref}} style={{scaleX : -1}} onEnded = {this.videoEnd}> 
                        <source src="/video/dundun_dance.mp4" type="video/mp4"></source>
                    </video>
                </div>
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
            </div>
            
            // <Video></Video>
        )
    }
}

export default Game2;