import React, {Component} from 'react';

import logo from '../../resources/lighthouse.svg';
import Radium from "radium";

class Sidebar extends Component {
    render() {


        return (
            <div style={navBarWrapper}>
                <nav style={sidebar}>
                    <h6 style={{paddingTop: "1rem"}}>Columns:</h6>
                    {/*Logo*/}
                    <div className="sidebar-header" >
                        <h3 style={headlineStyle}><img style={logoStyle} src={logo}/> ODRA<i style={lighthouse}>lighthouse</i>
                        </h3>
                    </div>

                    {/*Top Navbar*/}
                    <ul className="list-unstyled">

                        <div>
                            {this.props.newsColumns.map((column) => (
                                <div style={[{paddingTop: "1rem",cursor: "pointer"},hoverStyle]} key={column.id}>
                                    <i style={{color: "#c6c6c6",
                                        paddingRight: "0.8rem",
                                        fontSize: "1.2rem"}}class="far fa-newspaper"></i>
                                    <span style={{fontSize: "0.8rem"}}>{column.source}</span>
                                </div>
                            ))}
                        </div>


                        <hr style={{borderColor: "lightsteelblue"}}/>
                        <div style={[hoverStyle, navbarItemTop]} key="add">
                            <div style={icon}><i class="fas fa-plus"></i></div>
                            <div style={iconText}>Add column</div>
                        </div>
                    </ul>


                    {/*Bottom Navbar*/}

                    <ul style={{bottom: "4rem", position: "absolute"}} className="list-unstyled">
                        <div style={[hoverStyle,navbarItemBot]} key="collapse">
                            <div style={iconBot}><i class="fas fa-angle-double-left"></i></div>
                            <div style={iconTextBot}> Collapse</div>
                        </div>
                        <div style={[hoverStyle,navbarItemBot]} key="notification">
                            <div style={iconBot}><i class="far fa-bell"></i></div>
                            <div style={iconTextBot}> Notifications</div>
                        </div>
                        <div style={[hoverStyle,navbarItemBot]} key="messages">
                            <div style={iconBot}><i class="far fa-envelope"></i></div>
                            <div style={iconTextBot}> Messages</div>
                        </div>
                        <div style={[hoverStyle,navbarItemBot]} key="settings">
                            <div style={iconBot}><i class="fas fa-cog"></i></div>
                            <div style={iconTextBot}> Settings</div>
                        </div>
                        <div style={[hoverStyle,navbarItemBot]} key="profile">
                            <div style={iconBot}><i class="far fa-user"></i></div>
                            <div style={iconTextBot}> Profile</div>
                        </div>

                    </ul>

                </nav>
            </div>
        );
    }
}

Sidebar = Radium(Sidebar);


const hoverStyle = {
    ':hover':{
        filter: "brightness(3)"
    }
}

const navbarItemBot = {
    paddingTop:"0.2rem",
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
    fontWeight:"700",
    display: "inline-block"
}

//************************************

const navbarItemTop = {
    cursor: "pointer"
}

const icon = {
    verticalAlign: "middle",
    fontSize: "1.2rem",
    color: "#1da1f2",
    display: "inline-block",
    paddingRight: "0.7rem"
}

const iconText = {
    verticalAlign: "middle",
    fontSize: "0.9rem",
    display: "inline-block"
}


const navBarWrapper = {
    display: "flex",
    width: "100%",
}

const logoStyle = {
    height: "1.5rem"
}

const lighthouse = {
    fontSize: "1rem"
}

const headlineStyle = {
    marginTop: "1rem",
    marginLeft: "0.2rem",
    fontSize: "1.2rem",
    position: "absolute",
    bottom: "1rem",

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