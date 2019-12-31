import React, {Component} from 'react';
import Radium from "radium";

class AdminButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={navbarItemBot} key="admin" onClick={() => {this.props.toggle("admin")}}>
                    <div style={iconBot}><i className="fas fa-user-shield"></i></div>
                    <div style={iconTextBot}> Admin</div>
                </div>
            </React.Fragment>
        );
    }
}

AdminButton = Radium(AdminButton);

const navbarItemBot = {
    ':hover': {
        filter: "brightness(3)"
    },
    paddingTop: "0.2rem",
    cursor: "pointer",
}

const iconBot = {
    verticalAlign: "middle",
    fontSize: "1.4rem",
    color: "#1da1f2",
    display: "inline-block",
    paddingRight: "0.7rem",
}

const iconTextBot = {
    verticalAlign: "middle",
    fontSize: "0.9rem",
    fontWeight: "700",
    display: "inline-block"
}

export default AdminButton;