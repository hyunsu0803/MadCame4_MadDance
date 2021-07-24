import React, {Component} from 'react';

class Login extends Component {
    
    render(){
        if (this.props.getNickname() === 'login_please') {
            return(
                <form action="/nickname_login" method="post"
                    onSubmit={function(e){
                    e.preventDefault();
                    alert('Login succeed');

                    this.props.setNickname(this.Nickname.value);

                    }.bind(this)}>

                    <p><input type="text" name="Nickname" placeholder="Nickname" ref={node => this.Nickname = node}></input></p>
                    <p><input type="submit" value="Log in"></input></p>
                </form>
            );
        }
        else {
            return(
                <div>
                    <div>
                        <h2 style={{color: 'white'}}>Welcome {this.props.getNickname()} !!</h2>
                    </div>

                    <input type="button" value="Log out"
                        onClick = {function(e){
                            e.preventDefault();
                            alert('Logout succeed');

                            this.props.setNickname('login_please');
                        }.bind(this)}
                    ></input>
                </div>
            );
        }
    }
}

export default Login;