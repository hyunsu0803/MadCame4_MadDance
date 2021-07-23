import React, {Component} from 'react';
import './App.css';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './components/Home';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';


class App extends Component {
  render(){
    return (
      <div className="App">

        <Router>

          <header>
          <Link to="/">
            
          </Link>
            <Link to="/game1">
              <button>Game1</button>
            </Link>
            <Link to="/game2">
              <button>Game2</button>
            </Link>
            <Link to="/game3">
              <button>Game3</button>
            </Link>
          </header>

          <main>
            <Route exact path="/" component={Home}>
              
            </Route>
            <Route path="/game1" component={Game1} />
            <Route path="/game2" component={Game2}/>
            <Route path="/game3" component={Game3}/>
          </main>

        </Router>
        
      </div>
    );
  }
}

export default App;
