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
            imgList : [],
            isTimerActive : true,
            answerPose : {},
            
        }
    }
    
    similarityPerImg = [];

    async componentDidMount() {
        console.log("componentDidMout 호출");
        //이미지 리스트
        var i;
        var tempList = [];
        for (i=1; i<=1 ;i++){
            tempList.push("/img/posenet_img"+i+".png");
        } //ex)posenet_img1.png ~ posenet_img16.png로 list 만들어짐
        this.setState({imgList : tempList});
        this.changePhoto();
      }


    timeOut = () => {  //타이머에서 timeOut 될 때마다 이미지 바꿔주기
      this.setState({currentImgNum : this.state.currentImgNum+1});
      if(this.state.currentImgNum===3){
          this.setState({isTimerActive : false})
      }
      console.log("timeout");
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
      return Math.max(...this.similarityPerImg);
    }

    changePhoto = () => {
      const answerImg = this.answerImg
      estimatePoseOnImage(answerImg).then((answerPose)=> {
        this.setState({answerPose :answerPose});
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
                <Camera getSimilarity = {this.getSimilarity}/>
                <img src = {this.state.imgList[this.state.currentImgNum]} ref={(ref) => {this.answerImg=ref}}></img>
            </div>
        )
    }
}

export default Game1