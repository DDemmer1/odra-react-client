import React, {Component} from 'react';
import Radium from "radium";


class ProfileInfoForm extends Component {


componentDidMount(){
    console.log(this.props.user);
}


    render() {
        const {id,name,username,authorities,accountNonLocked} = this.props.user;
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>User Profile: {this.props.user.name}</h5>
                <hr/>
                <div style={profileInfo}>
                    <table className="table table-striped">
                        <tr>
                            <th>Username</th>
                            <th>{username}</th>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <th>{name}</th>
                        </tr>
                        <tr>
                            <th>Role</th>
                            <th>{authorities[0].authority === "ROLE_USER" ? <>User</> : <>Admin</>}</th>
                        </tr>
                        <tr>
                            <th>Account Status</th>
                            <th>{accountNonLocked ? <i style={{color: "green"}} className="fas fa-user-check"></i> : <i style={{color: "red"}} className="fas fa-user-times"></i>}</th>
                        </tr>
                    </table>
                    <button className="btn btn-primary btn-sm odra-color" style={changePasswordButton}>Change password</button>
                </div>
            </div>
        );
    }

}

const profileInfo = {
    padding: "0.5rem 3.5rem "
};

const changePasswordButton = {
    border: "light rgb(29, 161, 242)",
    backgroundColor:"white",
    ':hover': {
        color:"rgb(29, 161, 242)",
        backgroundColor:"rgba(29, 161, 242, 0.1)"
    }
};


ProfileInfoForm = Radium(ProfileInfoForm);


export default ProfileInfoForm;