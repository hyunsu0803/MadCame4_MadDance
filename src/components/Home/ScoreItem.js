import React, {Component} from 'react';

class ScoreItem extends Component{
    render(){
        return(
            <div className="scoreitem">
                <span className="brd_ranking">{this.props.row.rank}</span>
                <span className="brd_playerName">{this.props.row.name}</span>
                <span className="brd_score">{this.props.row.score}</span>
            </div>
        );
    }

}

export default ScoreItem;