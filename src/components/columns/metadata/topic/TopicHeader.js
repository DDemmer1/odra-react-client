import React, {Component} from 'react';
import Radium from "radium";
import SliderButton from "../../buttons/SliderButton";
import axios from "axios/index";
import * as con from "../../../../OdraLighthouseConstants";


class TopicHeader extends Component {



    render() {
        return (
            <div style={headLineWrapper} id={"header"+this.props.column.id}>
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}} className="fas fa-thumbtack"></i> Topic
                </h2>
                <SliderButton clearColumn={this.props.clearColumn} source={this.props.source} column={this.props.column}
                              refreshColumns={this.props.refreshColumns}/>
                <p style={{
                    paddingLeft: "1.4rem",
                    color: "gray", fontSize: "0.75rem", fontFamily: "Helvetica"
                }}>{this.props.column.query}</p>
            </div>
        );
    }
}

TopicHeader = Radium(TopicHeader);

let firstToUpperCase = (string) => {
    string = string[0].toUpperCase() + string.slice(1);
    if(string.length > 7 ){
        string = string.substring(0,20) + "...";
    }
    return string;

};

const headLineWrapper = {
    borderBottom: "solid lightgray thin",
    borderRight: "solid lightgray thin",
    padding: " 1rem 0rem 0.3rem 1.5rem",
    background: "white",
    height: "5rem"

};

const sourceStyle = {
    color: "gray",
    fontSize: "0.78rem",
};

const headlineStyle = {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#3a3f51",
    display: "inline-block",
    cursor: "pointer",
    width: "20px"


};

export default TopicHeader;