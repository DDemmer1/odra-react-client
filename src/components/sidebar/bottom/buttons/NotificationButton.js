import React, {Component} from 'react';
import Radium from "radium";

class NotificationButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={navbarItemBot} key="notification">
                    <div style={iconBot}><i className="far fa-bell"></i></div>
                    <div style={iconTextBot}> Notifications</div>
                </div>
            </React.Fragment>
        );
    }
}

NotificationButton = Radium(NotificationButton);

const navbarItemBot = {
    // ':hover': {
    //     filter: "brightness(3)"
    // },
    paddingTop: "0.2rem",
    // cursor: "pointer",
};

const iconBot = {
    verticalAlign: "middle",
    fontSize: "1.4rem",
    color: "#8f8e90",
    // color: "#1da1f2",
    display: "inline-block",
    paddingRight: "0.7rem",
};

const iconTextBot = {
    verticalAlign: "middle",
    fontSize: "0.9rem",
    fontWeight: "700",
    display: "inline-block"
}

export default NotificationButton;