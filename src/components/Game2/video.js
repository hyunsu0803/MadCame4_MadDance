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
        super(props, PoseNet.defaultProps)
    }

    videoActive = true;

    getCanvas = elem => {
        this.canvas = elem
    }

    getVideo = elem => {
        this.video = elem
    }

    async componentDidMount() {

        try {
            await this.setupVideo()
            } catch (error) {
            throw new Error(
              'This browser does not support video capture, or this device does not have a camera'
            )
        }
        // this.detectPose();
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
            
            this.props.videoStart();
            this.detectPose();
            
        }
    }

    componentWillUnmount() {
        this.videoActive = false
    }

    async setupVideo() {
        const {videoWidth, videoHeight} = this.props
        const video = this.video
        video.width = videoWidth
        video.height = videoHeight

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                console.log("metadata loaded");
                video.play()
                resolve(video)
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

        switch (algorithm) {
            case 'multi-pose': {
                poses = await posenetModel.estimateMultiplePoses(
                    video, 
                    imageScaleFactor, 
                    flipHorizontal, 
                    outputStride, 
                    maxPoseDetections, 
                    minPartConfidence, 
                    nmsRadius
                )
                break
            }
            case 'single-pose': {
                const pose = await posenetModel.estimateSinglePose(
                    video, 
                    {imageScaleFactor:0.5, 
                    flipHorizontal:true, 
                    outputStride:16}
                );
                poses.push(pose);
                // this.props.getSimilarity(pose);
                this.props.getVideoPose(pose);
                break
            }
        }

        canvasContext.clearRect(0, 0, videoWidth, videoHeight)

        if (showVideo) {
            canvasContext.save()
            canvasContext.scale(-1, 1)
            canvasContext.translate(-videoWidth, 0)
            //canvasContext.drawImage(video, 0, 0, videoWidth, videoHeight, 0, 0,700,700)
            canvasContext.drawImage(video, 0, 0, 1050, 1050, 0, 0, 700, 700)
            canvasContext.restore()
        }

        poses.forEach(({score, keypoints}) => {
            if (score >= minPoseConfidence) {
                if (showPoints) {
                    drawKeyPoints(
                    keypoints,
                    minPartConfidence,
                    skeletonColor,
                    canvasContext
                    )
                }
                if (showSkeleton) {
                    drawSkeleton(
                    keypoints,
                    minPartConfidence,
                    skeletonColor,
                    skeletonLineWidth,
                    canvasContext
                    )
                }
            }
        })
            if(this.videoActive){
                requestAnimationFrame(findPoseDetectionFrame)
            }
        }
        findPoseDetectionFrame()
    }

    render() {
        return (
        <div className = "camera_box">
            <div>
                <video id="video" autoPlay="autoplay" width="700" height="700"
                 playsInline ref={this.getVideo} style={{display: "none"}}>
                    <source src="/video/poop_2.mp4" type="video/mp4"></source>
                </video>
                <canvas className="webcam" ref={this.getCanvas} />
            </div>
        </div>
        )
    }
}

export default PoseNet;