import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

class Game3 extends Component {
    render() {
        return(
            <div>
                <header>
                    <Link to="/">
                        <button>Home</button>
                    </Link>
                </header>

                <h1 style={{color:'white'}}>GAME3 PAGE</h1> 
            </div>
        );
    }
}

export default Game3;