import React, {Component} from 'react';
import Radium from "radium";
import SliderButton from "../buttons/SliderButton";


class ColumnHeader extends Component {
    render() {
        return (
            <div style={headLineWrapper} >
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}} className="far fa-newspaper"></i> Source <span style={{color: "gray", fontSize: "0.78rem"}}>@{firstToUpperCase(this.props.source)}</span>
                </h2>
                <SliderButton source={this.props.source} column={this.props.column} refreshColumns={this.props.refreshColumns}/>
            </div>
        );
    }
}

ColumnHeader = Radium(ColumnHeader)

let firstToUpperCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
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