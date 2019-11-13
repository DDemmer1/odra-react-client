import React, {Component} from 'react';
import Radium from "radium";
import SliderButton from "../buttons/SliderButton";


class ColumnHeader extends Component {
    render() {
        return (
            <div style={headLineWrapper} >
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}}class="far fa-newspaper"></i>
                    {this.props.source[0].toUpperCase() + this.props.source.slice(1)}
                </h2>
                <SliderButton source={this.props.source}/>
            </div>
        );
    }
}

ColumnHeader = Radium(ColumnHeader)



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