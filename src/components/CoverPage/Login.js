import React, {Component} from 'react';
import { createHashHistory } from 'history'

import { withRouter } from 'react-router-dom';
const history = createHashHistory()

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {nickname : ""}
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(){
        // e.preventDefault();
        // this.setnickname(this.nickname.value)
        this.props.history.push({
            pathname: '/home',
            state: { nickname : this.nickname.value}
        })
    }

    setnickname(n){
        this.setState({nickname : n});
    }

    render(){
        return(
            <div className = "login_form">
                <input className= "nickname_box" type="text" placeholder="Nickname" ref={node => this.nickname = node}></input>
                <div className = "submit_button" onClick = {this.handleLogin}>
                    Login
                    <link rel="prefetch" href="/images/madDance_background1.png"></link>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);