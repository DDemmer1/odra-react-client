import React, {Component} from 'react';
import axios from "axios/index";
import Radium from "radium";
import * as con from "../../../../OdraLighthouseConstants.js";
import AddUserForm from "./AddUserForm";


class UserForm extends Component {


    state = {
        users: [],
        addUser: false
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let that = this;
        axios.get(con.API_BASE_URL + "/user/all")
            .then((result) => that.setState({users: result.data}));
    };


    handleDelete = (id) => {

        if (window.confirm('Are you sure you want to delete this User?')) {
            let that = this;
            axios.get(con.API_BASE_URL + "/user/delete/" + id)
                .then((result) => {
                    axios.get(con.API_BASE_URL + "/user/all")
                        .then((result) => that.setState({users: result.data}))
                });
        }
    };


    reset() {
        this.setState(initialState);
        let that = this;
        axios.get(con.API_BASE_URL + "/user/all")
            .then((result) => that.setState({users: result.data}));
    };

    render() {
        return (
            <div>

                {(function (that) {
                    if (that.state.addUser) {
                        return <AddUserForm onBack={that.reset.bind(that)}/>
                    } else {
                        return <React.Fragment>

                            <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Delete or add a User</h5>
                            <div style={form}>
                                <table className="table table-hover text-center">

                                    <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        that.state.users.map((user) => (
                                            <tr key={user.id}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>
                                                    <button className="btn mr-2" onClick={() => {
                                                        that.handleDelete(user.id)
                                                    }}><i style={{color: "red", fontSize: "1.2rem"}}
                                                          className="fas fa-times"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>

                            <button className="btn btn-primary btn-sm odra-color" style={addUserButton} onClick={() => {
                                that.setState({addUser: true})
                            }}><i className="fas fa-user-plus"></i> Add User
                            </button>

                            <button key="addUserBtn" className="btn btn-primary btn-sm odra-color" style={backButton}
                                    onClick={() => {
                                        that.props.onBack()
                                    }}><i className="fas fa-long-arrow-alt-left"></i> Back
                            </button>
                        </React.Fragment>
                    }
                })(this)}


            </div>
        );
    }


}


const initialState = {
    addUser: false
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


const addUserButton = {
    position: "absolute",
    bottom: "2rem",
    left: "7.3rem",
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    backgroundColor: "white",
    ':hover': {
        color: "rgb(29, 161, 242)",
        backgroundColor: "rgba(29, 161, 242, 0.1)"
    }
};


const form = {
    marginTop: "2rem",
    marginLeft: "2rem",
    marginRight: "1rem",
    marginBottom: "0rem",
    height: "22rem",
    overflowY: "scroll",
    overflowX: "hidden"
};

UserForm = Radium(UserForm);

export default UserForm;