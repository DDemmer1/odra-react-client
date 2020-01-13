import React, {Component} from 'react';
import Radium from "radium";
import SliderButton from "../../buttons/SliderButton";


class TwitterHeader extends Component {

    getHashTagListFromString(querys) {
        let out = "";
        querys.split(",").forEach((hashtag) => {
            out = out + " #" + hashtag;
        });
        out = out + " ";
        return out;
    }

    render() {
        return (
            <div style={headLineWrapper}>
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}} className="fab fa-twitter"></i> Twitter
                </h2>
                <SliderButton source={this.props.source} column={this.props.column}
                              refreshColumns={this.props.refreshColumns}/>
                <p
                    style={{
                        paddingLeft: "1.4rem",
                        color: "gray",
                        fontSize: "0.75rem",
                        fontFamily: "Helvetica"
                    }}>{this.getHashTagListFromString(this.props.column.query)}</p>
            </div>
        );
    }
}

TwitterHeader = Radium(TwitterHeader);

let firstToUpperCase = (string) => {
    return string[0].toUpperCase() + string.slice(1);
};

const headLineWrapper = {
    borderBottom: "solid lightgray thin",
    borderRight: "solid lightgray thin",
    padding: " 1rem 0rem 0.3rem 1.5rem",
    background: "white",
    height: "5rem"

};


const headlineStyle = {
    fontSize: "1rem",
    fontWeight: "700",
    color: "#3a3f51",
    display: "inline-block",
    cursor: "pointer"

};

export default TwitterHeader;