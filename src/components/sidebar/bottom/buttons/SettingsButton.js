import React, {Component} from 'react';
import Radium from "radium";

class SettingsButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div style={navbarItemBot} key="settings">
                    <div style={iconBot}><i class="fas fa-cog"></i></div>
                    <div style={iconTextBot}> Settings</div>
                </div>
            </React.Fragment>
        );
    }
}

SettingsButton = Radium(SettingsButton);

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

export default SettingsButton;