import React, {Component} from 'react';
import { Link, BrowserRouter} from "react-router-dom";
import Login from './Login'
import "./coverpage.css"

class CoverPage extends Component {

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
            </div>
        );
        
    }
}

export default CoverPage;