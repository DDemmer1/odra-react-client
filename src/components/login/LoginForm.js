import React, {Component} from 'react';
import * as axios from "axios";
import LoginError from "./LoginError";
import * as con from "../../OdraLighthouseConstants";
import logo from '../../resources/lighthouse.svg';




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
                    <div style={logoDiv} className="rounded">
                        <h3 style={headlineStyle}><img style={logoStyle} src={logo} alt="odra-logo"/> ODRA<i
                            style={lighthouse}>lighthouse</i>
                        </h3>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

const logoStyle = {
    height: "2rem"
};

const lighthouse = {
    fontSize: "1.2rem"
};

const logoDiv = {
    backgroundColor: "#123b53",
    color: "white",
    width: "200px",
    margin: "auto",
    padding: "0.01rem 0.01rem 0.2rem 0.01rem",
    textAlign: "center"

};

const headlineStyle = {
    marginTop: "1rem",
    marginLeft: "0.2rem",
    fontSize: "1.5rem",
};

const loginDiv = {
    marginTop: "10rem"
};


export default LoginForm;