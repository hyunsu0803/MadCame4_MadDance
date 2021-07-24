import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Camera from './camera.js'
import Timer from './timer.js'
import './Game1.css'
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';


async function estimatePoseOnImage(imageElement) {
  const net = await posenet.load({
    architecture: 'MobileNetV1',
    outputStride: 16,
    inputResolution: { width: 640, height: 480 },
    multiplier: 0.75
  });
  // Estimate the pose on the imageElement
  const pose = await net.estimateSinglePose(imageElement);
  return pose;
}

class Game1 extends Component {

    constructor(props){
        super(props, Game1.defaultProps);
        this.state = {
            currentImgNum : 0,
            isTimerActive : true,
            answerPose : {},
            imgList : []
        }
    }
    
    similarityPerImg = [];
    score = [];

    async componentDidMount() {
        console.log("componentDidMount");
        //import image
        var i;
        var tempList = []
        for (i=1; i<=6 ;i++){
            tempList.push("/img/posenet_img"+i+".png");
        } 
        this.setState({imgList : tempList});
        this.changePhoto();
        estimatePoseOnImage(this.answerImg).then((answerPose)=> this.setState({anwerPose : answerPose}));
    }

    gameStart = () => {
      console.log("gameStart");
      this.clockCall = setInterval(() => {
        this.timeOut();
    } ,3000);
    }

    getSimilarity = (detectedpose) => {
      let poses = [detectedpose, this.state.answerPose]
      // Calculate the weighted distance between the two poses
      // console.log(poses[0]);
      // console.log(poses[1]);
      const weightedDistance = poseSimilarity(poses[0], poses[1]);
      // console.log("similarity value is : " + weightedDistance);
      this.similarityPerImg.push(weightedDistance);
    }

    getScore = () => {
      return Math.min(...this.similarityPerImg);
    }

    timeOut = () => {  
      var currentScore = this.getScore(); //점수 계산
      this.score.push(currentScore);
      if(currentScore<0.3){
        console.log("excellent");
      }else if(currentScore<0.6){
        console.log("good");
      }else{
        console.log("bad");
      }
      this.similarityPerImg = []; //초기화

      console.log(this.state.currentImgNum);
      console.log(this.state.imgList.length);
      if(this.state.currentImgNum<this.state.imgList.length){
        this.changePhoto(); //answer pose 구하고 사진바꾸기
        // this.activeTimer(); //타이머 시작
      }else{
        clearInterval(this.clockCall);
        console.log(this.score);
      }

    }

    changePhoto = () => {
      console.log("current num + "+this.state.currentImgNum);
      const answerImg = this.answerImg;
      estimatePoseOnImage(answerImg).then((answerPose) => {
        this.setState({answerPose :answerPose, currentImgNum : this.state.currentImgNum+1});
        console.log(answerPose);
      })
    }

    render() {
        return (
            <div className = "SpeedGame">
                <div class="button_base b05_3d_roll">
                        <div>HOME</div>
                        <div>HOME</div>
                    </div>
                {/* <Timer time = {3} timeOut = {this.timeOut} isTimerActive = {this.state.isTimerActive}/> */}
                <Camera getSimilarity = {this.getSimilarity} gameStart = {this.gameStart}/>
                <img src = {this.state.imgList[this.state.currentImgNum]} ref={(ref) => {this.answerImg=ref}}></img>
            </div>
        )
    }
}

export default Game1