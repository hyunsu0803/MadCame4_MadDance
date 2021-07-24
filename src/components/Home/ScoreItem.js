import React, {Component} from 'react';

class ScoreItem extends Component{
    render(){
        return(
            <div className="scoreitem">
                <span className="ranking">{this.props.row.rnk}</span>
                <span className="playerName">{this.props.row.name}</span>
                <span className="score">{this.props.row.score}</span>
            </div>
        );
    }

}

export default ScoreItem;