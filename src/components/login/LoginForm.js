import React, {Component} from 'react';
import * as axios from "axios";
import LoginError from "./LoginError";
import * as con from "../../OdraLighthouseConstants";



class LoginForm extends Component {

    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            error: false,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var that = this;

        axios.post(con.API_BASE_URL+ "/api/auth/signin", {
            usernameOrEmail: this.state.username,
            password: this.state.password
        })
            .then(function (response) {
                that.props.onLogin(response.data.accessToken);
            })
            .catch(function (error) {
                that.setState({error: true});
            });
    };


    render() {
        return (
            <React.Fragment>
                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }} >
                    <div className="container col-2 shadow p-3 mb-5 bg-white rounded" style={loginDiv}>
                        <div className="form-group">
                            <label htmlFor="user">Username</label>
                            <input type="text" className="form-control" id="user" value={this.state.username}
                                   placeholder="User"
                                   onChange={(event) => this.setState({username: event.target.value})} required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" value={this.state.password}
                                   placeholder="Password"
                                   onChange={(event) => this.setState({password: event.target.value})} required/>
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in
                        </button>
                        {this.state.error ? <LoginError/> : null}
                    </div>
                </form>
            </React.Fragment>
        );
    }
}


const loginDiv = {
    marginTop: "10rem"

};


export default LoginForm;