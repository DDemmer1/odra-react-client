import React, {Component} from 'react';
import Radium from "radium";


class ColumnHeader extends Component {
    render() {
        return (
            <div style={headLineWrapper} >
                <h2 style={headlineStyle}><i style={{color: "gray", paddingRight: "0.2rem"}}class="far fa-newspaper"></i> {this.props.source}</h2>
                <i key={this.props.source+"filter"} style={[{color:"#1da1f2",float: "right", paddingRight:"1rem", cursor:"pointer"},hoverStyle]} class="fas fa-sliders-h"></i>
            </div>
        );
    }
}

ColumnHeader = Radium(ColumnHeader)

const hoverStyle = {
    ':hover':{
        filter: "brightness(80%)"
    }
}

const headLineWrapper = {
    borderBottom: "solid lightgray thin",
    borderRight: "solid lightgray thin",
    padding: " 1rem 0rem 0.3rem 1.5rem",
    background: "white"
}


const headlineStyle = {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#3a3f51",
    display: "inline-block",
    cursor:"pointer"

}

export default ColumnHeader;