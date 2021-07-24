import React, {Component} from 'react';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";

class Game3 extends Component {
    render() {
        return(
            <div>
                <header>
                    <Link to="/">
                    <div class="button_base b05_3d_roll">
                        <div>HOME</div>
                        <div>HOME</div>
                    </div>
                    </Link>
                </header>

                <h1 style={{color:'white'}}>GAME3 PAGE</h1> 
            </div>
        );
    }
}

export default Game3;