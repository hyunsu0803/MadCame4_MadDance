import React, {Component} from 'react'
import { Link } from "react-router-dom";
import { poseSimilarity } from 'posenet-similarity';
import * as posenet from '@tensorflow-models/posenet';
import Modal from 'react-modal';
import axios from "axios";

import Camera from './camera.js'
import './Game1.css'

class Game1 extends Component {

    constructor(props){
        super(props, Game1.defaultProps);
        this.state = {
            isModalOpen : false,
            currentImgNum : 0,
            isTimerActive : true,
            answerPose : {},
            imgList : [],
            scoreMent : " ",
            animationClass : "",
            showCamera : true,
            showImg : true,
            nickname : ""
        }
    }
    
    totalScore = 0;
    similarityPerImg = [];
    score = [];
    clockCall = undefined

    async componentDidMount() {
        //import image

        var j;
        var tempList = []
        for (j=0; j<=12 ;j++){
            tempList.push("/img/pose"+j+".png");
        } 
        this.setState({imgList : tempList});
        this.changeAnswerPose();
        this.setState({nickname : this.props.location.state.nickname});
    }

 

    async estimatePoseOnImage(imageElement){
      this.net = await posenet.load({
        architecture: 'MobileNetV1',
        outputStride: 16,
        inputResolution: { width: 640, height: 480 },
        multiplier: 0.75
      });
      // Estimate the pose on the imageElement
      const pose = await this.net.estimateSinglePose(imageElement);
      console.log(pose);
      return pose;
    }
    gameStart = () => {
      alert("gameStart");
      this.clockCall = setInterval(() => {
        this.timeOut();
        this.changeAnimation();
      } ,3000);
    }
    cameraStart = () => {
      alert("camera Start");
    }
    gameEnd = () => {
      clearInterval(this.clockCall);
      setTimeout(this.removeElements(), 2000);

      axios.post(`/api/board1/add`, {
        name : this.state.nickname,
        score : this.totalScore
      }).then(response=> console.log(response.status))

      this.openModal();
    }

    componentWillUnmount(){
      clearInterval(this.clockCall);
    }

    removeElements = ()=> {
      this.setState({
        showCamera : false,
        showImg : false
      })
    }

    getSimilarity = (detectedpose) => {
      let poses = [detectedpose, this.state.answerPose]
      // Calculate the weighted distance between the two poses
      // console.log(poses[0]);
      // console.log(poses[1]);
      const weightedDistance = poseSimilarity(poses[0], poses[1]);
      this.similarityPerImg.push(weightedDistance);
    }

    getScore = () => {
      console.log(this.state.currentImgNum);
      console.log(this.similarityPerImg.toString());
      return Math.min(...this.similarityPerImg);
    }

    timeOut = () => {  
      if(this.state.currentImgNum>0){
        var currentScore = this.getScore(); //점수
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

      console.log(this.score.toString());

      if(this.state.currentImgNum<10){
        this.changeImage();
        this.changeAnswerPose(); //answer pose 구하고 사진바꾸기
      }else{
        clearInterval(this.clockCall);
        this.gameEnd();
      }
    }

    changeImage = () => {
      this.setState({currentImgNum : this.state.currentImgNum+1})
      console.log("img changed");
    }

    changeAnswerPose = () => {
      console.log("current num "+this.state.currentImgNum);
      const answerImg = this.answerImg;
      this.estimatePoseOnImage(answerImg).then((answerPose) => {
        this.similarityPerImg = []; //초기화
        this.setState({answerPose :answerPose});
        console.log(answerPose);
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

    openModal = () => {
      this.setState({isModalOpen : true});
    }

    render() {
      return (
        <div className = "SpeedGame"style ={{
          backgroundImage : "url(/img/madDance_background2.jpg)", 
          backgroundSize : "100% 100%"
          }} >
            
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
            {this.state.showCamera ? <Camera getSimilarity = {this.getSimilarity} cameraStart = {this.cameraStart}/> : null}
            {this.state.showImg ? <img  className = "game1_img"src = {this.state.imgList[this.state.currentImgNum]} ref={(ref) => {this.answerImg=ref}}></img> : null}
            <div className = "modal_wraper">
              <Modal className = "score_modal" isOpen={this.state.isModalOpen} close={this.closeModal} >
                <div className = "score_info">Your Total Score is</div>
                <div className = "score_total">{this.totalScore}</div>
                <Link to={{pathname : "/home", state:{nickname : this.state.nickname}}}>
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

export default Game1