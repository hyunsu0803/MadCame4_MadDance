import React, {Component} from 'react';
import './App.css';
import { Route, BrowserRouter as Router } from "react-router-dom";

import CoverPage from './components/CoverPage/coverpage.js'
import Home from './components/Home/Home.js';
import Game1 from './components/Game1/Game1.js';
import Game2 from './components/Game2/Game2.js';
import Game3 from './components/Game3/Game3.js';


class App extends Component {
  render(){
    return (
      <div className="App">

        <Router>

          <main>
            <Route exact path = "/" component = {CoverPage}/>
            <Route path="/home" component={Home}/>
            <Route path="/game1" component={Game1}/>
            <Route path="/game2" component={Game2}/>
            <Route path="/game3" component={Game3}/>
          </main>

        </Router>

  
        
      </div>
    );
  }
}

export default App;
