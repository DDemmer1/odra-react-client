import React, {Component} from 'react';
import Radium from "radium";

class CollapseButton extends Component {
    render() {
        return (
            <React.Fragment>
                <div onClick={() => {this.props.collapseSidebar(); this.props.collapseSecondaryNavbar()}} style={navbarItemBot} key="collapse">
                    <div  style={iconBot}><i className="fas fa-angle-double-left"></i></div>
                    <div style={iconTextBot}> Collapse</div>
                </div>
            </React.Fragment>
        );
    }
}

CollapseButton = Radium(CollapseButton);

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
}

export default CollapseButton;