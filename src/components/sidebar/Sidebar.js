import React, {Component} from 'react';

import Radium from "radium";
import SidebarTop from "./top/SidebarTop";
import SidebarBottom from "./bottom/SidebarBottom";

class Sidebar extends Component {
    render() {

        return (
            <div style={navBarWrapper}>
                <nav style={sidebar}>
                    <SidebarTop key="sidebarTop" newsColumns={this.props.newsColumns} toggle={this.props.toggle}/>
                    <SidebarBottom key="sidebarBottom" onLogout={this.props.onLogout} toggle={this.props.toggle} user={this.props.user}/>
                </nav>
            </div>
        );
    }
}

Sidebar = Radium(Sidebar);


const navBarWrapper = {
    display: "flex",
    width: "100%",
}

const sidebar = {
    paddingLeft: "1rem",
    paddingRight: "1rem",
    width: "12.5rem",
    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    zIndex: "999",
    background: "#1c2938",
    color: "#fff",
}
export default Sidebar;