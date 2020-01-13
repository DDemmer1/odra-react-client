import React, {Component} from 'react';
import SliderButton from "../../buttons/SliderButton";

class QueryHeader extends Component {
    render() {
        return (
            <div style={headLineWrapper}>
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}} className="fas fa-search"></i>
                    Query <span style={{color: "gray", fontSize: "0.75rem", fontFamily: "Helvetica"}}></span>
                    <span style={{
                        color: "gray",
                        fontSize: "0.75rem",
                        fontFamily: "Helvetica"
                    }}> @{firstToUpperCase(this.props.column.source)}</span>
                </h2>
                <SliderButton refreshColumns={this.props.refreshColumns} column={this.props.column}/>
                <p style={{
                    paddingLeft: "1.4rem",
                    color: "gray", fontSize: "0.75rem", fontFamily: "Helvetica"
                }}>#{this.props.column.query}</p>
            </div>
        );
    }
}

let firstToUpperCase = (string) => {
    string = string[0].toUpperCase() + string.slice(1);
    if (string.length > 7) {
        string = string.substring(0, 20) + "...";
    }
    return string;

};

const headLineWrapper = {
    borderBottom: "solid lightgray thin",
    borderRight: "solid lightgray thin",
    padding: " 1rem 0rem 0.3rem 1.5rem",
    background: "white",
    height: "5rem"
}


const headlineStyle = {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#3a3f51",
    display: "inline-block",
    cursor: "pointer"

}

export default QueryHeader;