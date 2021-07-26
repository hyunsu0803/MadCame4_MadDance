import React, {Component} from 'react';
import { Link, BrowserRouter} from "react-router-dom";

class Login extends Component {
    state = {
        nickname : ""
    }

    onClickListener = (e) => {
        e.preventDefault();
        alert('Login succeed');
        this.setState({nickname : this.nickname.value});
    }

    render(){
        return(
            <div className = "login_form">
                <input className= "nickname_box" type="text" placeholder="Nickname" ref={node => this.nickname = node}></input>
                <div className = "submit_button" onClick = {this.onClickListener}><Link to={{pathname : "/home", state:{nickname : this.state.nickname}}}>Log in</Link></div>
            </div>
        );
    }
}

export default Login;