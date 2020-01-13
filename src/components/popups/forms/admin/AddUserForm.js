import React, {Component} from 'react';
import Radium from "radium";
import axios from "axios/index";
import * as con from "../../../../OdraLighthouseConstants";


class AddUserForm extends Component {


    state = {
        name: "",
        email: "",
        password: "",
        username: ""
    };

    handleSubmit(event) {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let that = this;
        axios.post(con.API_BASE_URL + "/api/auth/signup",
            {
                "name" : this.state.name,
                "username" : this.state.username,
                "email" : this.state.email,
                "password" : this.state.password
            }
            ).then((result) => {
                if(result.data.success == true){
                    this.props.onBack();
                } else {
                    window.alert("Something went wrong. User not added");
                }
            });
    };


    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Add a new User</h5>
                <hr/>

                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }}>
                    <div className="form-group" style={form}>
                        <label className="" htmlFor="name">Name: </label>
                        <input className="form-control form-control-sm" required name="name"
                               onChange={(event) => {
                                   this.setState({name: event.target.value})
                               }}/>

                        <label className="mt-3" htmlFor="username">Username: </label>
                        <input className="form-control  form-control-sm" required name="username"
                               onChange={(event) => {
                                   this.setState({username: event.target.value})
                               }}/>

                        <label className="mt-3" htmlFor="email">E-Mail: </label>
                        <input className="form-control  form-control-sm" type="email" required name="email"
                               onChange={(event) => {
                                   this.setState({email: event.target.value})
                               }}/>

                        <label className="mt-3" htmlFor="password">Password: </label>
                        <input className="form-control  form-control-sm" required type="password" name="password"
                               onChange={(event) => {
                                   this.setState({password: event.target.value})
                               }}/>
                        <div className="text-center">
                            <button className="btn odra-bg-color btn-primary btn-sm mt-3" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                <button className="btn btn-primary btn-sm odra-color" style={backButton} onClick={() => {
                    this.props.onBack();
                }}><i className="fas fa-long-arrow-alt-left"></i> Back
                </button>
            </div>
        );
    }
}

const form = {
    padding: "0.5rem 3.5rem "
};

const iconStyle = {
    color: "rgb(29, 161, 242)",
    fontSize: "2.5rem",

};


const backButton = {
    position: "absolute",
    bottom: "2rem",
    left: "2rem",
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    backgroundColor: "white",
    ':hover': {
        color: "rgb(29, 161, 242)",
        backgroundColor: "rgba(29, 161, 242, 0.1)"
    }
};


AddUserForm = Radium(AddUserForm);


export default AddUserForm;