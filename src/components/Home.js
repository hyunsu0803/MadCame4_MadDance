import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
class Home extends Component {
    render() {
        return(
            <div>
                <h1 style={{color:'white'}}>HOME PAGE</h1> 

                <body>
                    <div className="carousel">
                        <div className="carousel-content">
                        <Link to="/game1" className="carousel-item">GAME1</Link>
                        <Link to="/game2" className="carousel-item">GAME2</Link>
                        <Link to="/game3" className="carousel-item">GAME3</Link>
                        </div>
                    </div>
                </body>
            </div>
        );
    }
}

export default Home;