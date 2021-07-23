import React, {Component} from 'react';

class ScoreItem extends Component{
    render(){
        return(
            <div className="scoreitem">
                <span className="ranking">{this.props.ranking}</span>
                <span className="playerName">{this.props.name}</span>
                <span className="score">{this.props.score}</span>
            </div>
        );
    }

}

export default ScoreItem;