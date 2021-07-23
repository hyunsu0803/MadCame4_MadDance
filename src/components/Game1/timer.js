import React, {Component} from 'react'

class Timer extends Component {
    constructor(props){
        super(props);
        this.state ={ 
          timer : this.props.time ,
          active : this.props.isTimerActive
        };
    }

    componentDidMount(){
      this.clockCall = setInterval(() => {
        this.decrementClock();
    } ,1000); //setInterval로 1초마다 실행됨
    }

    componentDidUpdate(){
      
    }

    componentWillUnmount(){
        clearInterval(this.clockCall);
    }

    decrementClock = () => {
        this.setState((prevstate)=> ({timer : prevstate.timer-1}));
        if(this.props.isTimerActive){
          if( this.state.timer<1){
            clearInterval(this.clockCall);    //stop timer
            this.props.timeOut(); 
            this.setState({timer : 3}); 
              this.clockCall = setInterval(() => {
                this.decrementClock();
            } ,1000); //setInterval로 1초마다 실행됨   
          } 
        }else{
          clearInterval(this.clockCall)
        }
    }

  render() {
    return (
      <div className = "Timer">
        {this.state.timer}
      </div>
    )
  }
}

export default Timer