import React, {Component} from 'react';
import { Link, BrowserRouter} from "react-router-dom";
import Login from './Login'
import "./coverpage.css"

class CoverPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            audioFlag : "/img/volume.png"
        }
    }
    
    componentDidMount(){
        const audio = this.audio;
        audio.play();
        audio.volume = 0.5;
      }

    changeAudioFlag = () => {
        if(this.state.audioFlag==="/img/mute.png"){
            this.setState({audioFlag : "/img/volume.png"});
            this.audio.play();
        }else{
            this.setState({audioFlag : "/img/mute.png"});
            this.audio.pause();
        }
        
    }

    render() {
        return(
            <div className = "CoverPage" style ={{
                    backgroundImage : "url(/img/madDance_background1.jpg)", 
                    backgroundSize : "100% 100%"
                    }}>
                <div className = "coverpage_content">
                    <div className = "coverpage_textwraper">
                        <div className = "coverpage_maintitle">
                            <div className = "text_mad">MAD</div>
                            <div className = "text_dance">DANCE</div>
                        </div>
                        <div className = "coverpage_subtitle">HYUNSOO-KIM<br/>HYEMIN-LEE</div>
                        <Login></Login>
                    </div>
                    <div className = "coverpage_logowraper">
                        <img className = "maddance_logo" src = "/img/maddance_logo.png"/>    
                    </div> 
                </div>
                <audio src="/sound/8_Bit_Adventure.mp3" ref={(ref) => {this.audio=ref}}/>
                <div className = "sound_icon_wraper" onClick = {this.changeAudioFlag}><img  className = "sound_icon" src = {this.state.audioFlag}></img></div>
            </div>
        );
        
    }
}

export default CoverPage;