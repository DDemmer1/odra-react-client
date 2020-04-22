import React, {Component} from 'react';
import Radium from "radium";

class SettingsButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="btn-group dropright">
                    <div style={navbarItemBot} key="settings" className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <div style={iconBot}><i className="fas fa-cog"></i></div>
                        <div style={iconTextBot}> Settings</div>
                    </div>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" type="button" onClick={() => {this.props.onLogout()}}><i className="fas fa-sign-out-alt"></i>Logout</button>
                        {/*<button className="dropdown-item" type="button">Another action</button>*/}
                        {/*<button className="dropdown-item" type="button">Something else here</button>*/}
                    </div>
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
};

const iconBot = {
    verticalAlign: "middle",
    fontSize: "1.4rem",
    color: "#1da1f2",
    display: "inline-block",
    paddingRight: "0.7rem",
};

const iconTextBot = {
    verticalAlign: "middle",
    fontSize: "0.9rem",
    fontWeight: "700",
    display: "inline-block"
};

export default SettingsButton;