import React, {Component} from 'react';
import LogoBottom from "./LogoBottom";
import Radium from "radium";
import CollapseButton from "./buttons/CollapseButton";
import NotificationButton from "./buttons/NotificationButton";
import MessageButton from "./buttons/MessageButton";
import SettingsButton from "./buttons/SettingsButton";
import ProfileButton from "./buttons/ProfileButton";
import AdminButton from "./buttons/AdminButton";

class SidebarBottom extends Component {
    render() {
        return (
            <React.Fragment>
                <ul style={{bottom: "4rem", position: "absolute"}} className="list-unstyled">
                    <CollapseButton/>
                    <NotificationButton/>
                    <MessageButton/>
                    <SettingsButton onLogout={this.props.onLogout}/>
                    {localStorage.getItem("isAdmin","true") ? <AdminButton toggle={this.props.toggle} /> : null}
                    <ProfileButton/>
                </ul>
                <LogoBottom/>
            </React.Fragment>
        );
    }
}

SidebarBottom = Radium(SidebarBottom);


export default SidebarBottom;