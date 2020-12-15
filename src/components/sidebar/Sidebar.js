import React, {Component} from 'react';

import Radium from "radium";
import SidebarTop from "./top/SidebarTop";
import SidebarBottom from "./bottom/SidebarBottom";

class Sidebar extends Component {

    state = {
        navCollapsed: false
    };


    collapseSecondaryNavbar(){
        this.setState({navCollapsed:!this.state.navCollapsed});
    }

    render() {

        return (
            <div style={navBarWrapper}>
                <nav style={[sidebar,{ width: this.state.navCollapsed == true ? "3rem" :"12.5rem"}]}>
                    <SidebarTop key="sidebarTop" newsColumns={this.props.newsColumns} toggle={this.props.toggle}/>
                    <SidebarBottom collapseSecondaryNavbar={this.collapseSecondaryNavbar.bind(this)} collapseSidebar={this.props.collapseSidebar} key="sidebarBottom" onLogout={this.props.onLogout} toggle={this.props.toggle} user={this.props.user}/>
                </nav>
            </div>
        );
    }
}

Sidebar = Radium(Sidebar);


const navBarWrapper = {
    display: "flex",
    textOverflow: "hidden",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden"
};

const sidebar = {
    paddingLeft: "1rem",
    paddingRight: "1rem",

    position: "fixed",
    top: "0",
    left: "0",
    height: "100vh",
    zIndex: "999",
    background: "#123b53",
    color: "#fff",
};
export default Sidebar;