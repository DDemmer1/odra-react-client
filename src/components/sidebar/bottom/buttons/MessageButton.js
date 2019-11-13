import React, {Component} from 'react';
import Radium from "radium";

class MessageButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={navbarItemBot} key="messages">
                    <div style={iconBot}><i class="far fa-envelope"></i></div>
                    <div style={iconTextBot}> Messages</div>
                </div>
            </React.Fragment>
        );
    }
}

MessageButton = Radium(MessageButton);


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

export default MessageButton;