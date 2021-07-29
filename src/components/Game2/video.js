import {drawKeyPoints, drawSkeleton} from './utils'
import React, {Component} from 'react'
import * as posenet from '@tensorflow-models/posenet'
import * as tf from '@tensorflow/tfjs'

class PoseNet extends Component {
    static defaultProps = {
        videoWidth: 700,
        videoHeight: 700,
        flipHorizontal: true,
        algorithm: 'single-pose',
        showVideo: true,
        showSkeleton: true,
        showPoints: true,
        minPoseConfidence: 0.1,
        minPartConfidence: 0.5,
        maxPoseDetections: 2,
        nmsRadius: 20,
        outputStride: 16,
        imageScaleFactor: 0.5,
        skeletonColor: '#ffadea',
        skeletonLineWidth: 6,
        loadingText: 'Loading...please be patient...'
    }

    constructor(props) {
        super(props, PoseNet.defaultProps);
        this.state = {
            currentTime : 0
        }
    }
    videoPoses = [];
    videoClock = [];

    videoActive = true;
    async componentDidMount() {
        try {
            await this.setupVideo()
            } catch (error) {
            throw new Error(
              'This browser does not support video capture, or this device does not have a camera'
            )
        }finally{
            try {
                this.posenet = await posenet.load({
                    architecture: 'MobileNetV1',
                    outputStride: 16,
                    inputResolution: { width: 640, height: 480 },
                    multiplier: 0.75
                })
            } catch (error) {
            throw new Error('PoseNet failed to load')
            } finally {
                setTimeout(() => {
                    this.setState({loading: false})
                }, 200)
                
                // this.props.videoStart();
                this.detectPose();
            }
        }
    }

    videoEnded = ()=> {
        this.videoActive = false
        console.log(this.videoPoses);
        console.log(this.videoClock);
    }

    videoPause = () => {
        console.log(document.getElementById("video").currentTime);

        const  calculatePose = async () => {
            const pose = await this.posenet.estimateSinglePose(
                this.video, 
                {imageScaleFactor:0.5, 
                flipHorizontal:true, 
                outputStride:16}
                );
            console.log(JSON.stringify(pose));
        }
        calculatePose();
    }

    async setupVideo() {
        const {videoWidth, videoHeight} = this.props
        const video = this.video
        video.width = videoWidth
        video.height = videoHeight

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                console.log("metadata loaded");
                    video.play();
                    resolve(video);
            }
        })
    }

    detectPose() {
        console.log("detectPose");
        const {videoWidth, videoHeight} = this.props
        const canvas = this.canvas
        const canvasContext = canvas.getContext('2d')

        canvas.width = videoWidth
        canvas.height = videoHeight

        this.poseDetectionFrame(canvasContext)
    }

    poseDetectionFrame(canvasContext) {
        const {
        algorithm,
        imageScaleFactor, 
        flipHorizontal, 
        outputStride, 
        minPoseConfidence, 
        minPartConfidence, 
        maxPoseDetections, 
        nmsRadius, 
        videoWidth, 
        videoHeight, 
        showVideo, 
        showPoints, 
        showSkeleton,  
        skeletonColor, 
        skeletonLineWidth 
        } = this.props

        const posenetModel = this.posenet
        const video = this.video

        const findPoseDetectionFrame = async () => {
            let poses = []
            this.videoClock.push(document.getElementById("video").currentTime);                
            const pose = await posenetModel.estimateSinglePose(
                video, 
                {imageScaleFactor:0.5, 
                flipHorizontal:true, 
                outputStride:16}
                );
                poses.push(pose);
                this.videoPoses.push(pose);
                // this.props.getSimilarity(pose); 
                // this.props.getCameraPose(pose);
      
      
            canvasContext.clearRect(0, 0, videoWidth, videoHeight)
      
            // if (showVideo) {
            //   canvasContext.save()
            //   canvasContext.scale(-1, 1)
            //   canvasContext.translate(-videoWidth, 0)
            //   canvasContext.drawImage(video, 0, 0, 700,700, 0, 0,700,700)
            //   canvasContext.restore()
            // }
      
            poses.forEach(({score, keypoints}) => {
              if (score >= minPoseConfidence) {
                  drawKeyPoints(
                    keypoints,
                    minPartConfidence,
                    skeletonColor,
                    canvasContext
                  )
                  drawSkeleton(
                    keypoints,
                    minPartConfidence,
                    skeletonColor,
                    skeletonLineWidth,
                    canvasContext
                  )
              }
            })
            if(true){
              requestAnimationFrame(findPoseDetectionFrame)
            }
          }
            findPoseDetectionFrame();
    }

    



    render() {
        return (
        <div className = "camera_box">
            <div>
<<<<<<< HEAD
                <video id="video" autoPlay="autoplay" width="700" height="700"
                 playsInline ref={(ref) => {this.video=ref}} style={{display: "none"}}>
                    <source src="/video/poop_1.mp4" type="video/mp4"></source>
=======
                <video id="video" width="700" height="700" controls="controls" currentTime={this.state.currentTime} onEnded = {this.videoEnd} onPause = {this.videoPause}
                 playsInline ref={(ref) => {this.video=ref}}>
                    <source src="/video/dundun_dance.mp4" type="video/mp4"></source>
>>>>>>> 45254fc32b6f1d4c539f41e71b22ebdf44109d7a
                </video>
                <canvas className="webcam" ref={(ref) => {this.canvas=ref}} />
            </div>
        </div>
        )
    }
}

export default PoseNet;