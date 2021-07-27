import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js'
import Video from './video.js'
import './Game2.css'
import Timer from './timer.js'
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import fs from 'fs';

// async function estimatePoseOnImage(imageElement) {
//   const net = await posenet.load({
//     architecture: 'MobileNetV1',
//     outputStride: 16,
//     inputResolution: { width: 640, height: 480 },
//     multiplier: 0.75
//   });
//   // Estimate the pose on the imageElement
//   const pose = await net.estimateSinglePose(imageElement);
//   return pose;
// }

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
        //import image
        // var i;
        // var tempList = []
        // for (i=0; i<10 ;i++){
        //     tempList.push("/img/posenet_img"+i+".png");
        // } 
        // this.setState({imgList : tempList});
        // this.changeAnswerPose();
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



    // gameStart = () => {
    //     console.log("gameStart");

    //     alert("gameStart");

    //     // this.clockCall = setInterval(() => {
    //     //     // this.timeOut();
    //     //     // this.changeAnimation();
    //     //     // console.log("clock time out");
    //     // } ,3000);
    // }

    getVideoPose = (videopose) => {
        console.log("videopose : ", videopose);
    }

    getCameraPose = (camerapose) => {
        console.log("camerapose : ", camerapose);
    }

    // getSimilarity = (detectedpose) => {
    //   let poses = [detectedpose, this.state.answerPose]
    //   // Calculate the weighted distance between the two poses
    //   // console.log(poses[0]);
    //   // console.log(poses[1]);
    //   const weightedDistance = poseSimilarity(poses[0], poses[1]);
    //   console.log("similarity value is : " + weightedDistance);
    //   this.similarityPerImg.push(weightedDistance);
    // }

    // getScore = () => {
    //   return Math.min(...this.similarityPerImg);
    // }

    // timeOut = () => {  
    //   var currentScore = this.getScore(); //점수
    //   this.score.push(currentScore);
    //   if(currentScore<0.1){
    //     console.log("excellent");
    //     this.setState({scoreMent : "excellent"})
    //   }else if(currentScore<0.2){
    //     console.log("good");
    //     this.setState({scoreMent : "good"})
    //   }else{
    //     console.log("bad");
    //     this.setState({scoreMent : "bad"})
    //   }
    //   this.similarityPerImg = []; //초기화

    //   if(this.state.currentImgNum<8){
    //     setTimeout(()=> {
    //       this.changeAnswerPose(); //answer pose 구하고 사진바꾸기
    //       this.setState({currentImgNum : this.state.currentImgNum+1})
    //       // this.activeTimer(); //타이머 시작
    //     }, 300);
    //   }else{
    //     clearInterval(this.clockCall);
    //     console.log(this.score);
    //   }
    // }

    // changeAnswerPose = () => {
    //   console.log("current num "+this.state.currentImgNum);
    //   const answerImg = this.answerImg;
    //   estimatePoseOnImage(answerImg).then((answerPose) => {
    //     this.setState({answerPose :answerPose});
    //     console.log(answerPose);
    //   })
    // }

    // changeAnimation = () => {
    //   if(this.state.animationClass ===""){
    //     this.setState({animationClass: "popAnimation"})
    //   }else{
    //     this.setState({animationClass : ""})
    //   }
    // }

    // animationEnd = () => {
    //   this.changeAnimation();
    // }

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

                {/* <div className = {["neonText", "score", this.state.animationClass].join(' ')} 
                onAnimationEnd = {this.animationEnd}>{this.state.scoreMent}</div> */}

                {/* <Timer time = {3} timeOut = {this.timeOut} isTimerActive = {this.state.isTimerActive}/> */}
                <Camera getCameraPose = {this.getCameraPose} cameraStart = {this.cameraStart}/>
                {/* <video id="video" poster="/img/vs_img.png" width="700" height="700" controls="controls" autoPlay="autoplay" loop="loop" muted="muted">
                    <source src="/video/poop.mp4" type="video/mp4"></source>
                </video> */}
                <Video getVideoPose = {this.getVideoPose} videoStart = {this.videoStart} />
                {/* <img src = {this.state.imgList[this.state.currentImgNum]} ref={(ref) => {this.answerImg=ref}}></img> */}
            </div>
        )
    }
}

export default Game2;