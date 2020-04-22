import React, {Component} from 'react';
import Radium from "radium";
import SliderButton from "../../buttons/SliderButton";
import axios from "axios/index";
import * as con from "../../../../OdraLighthouseConstants";




class FlagHeader extends Component {

    state = {
        name:""
    };

    getUser(){
        axios.get(con.API_BASE_URL + "/user/" + this.props.column.query )
            .then((result) => {
                this.setState({name: result.data.name})
            });
    }

    componentDidMount(){
        this.getUser();
    }

    render() {
        return (
            <div style={headLineWrapper} id={"header"+this.props.column.id}>
                <h2 style={headlineStyle}>
                    <i style={{color: "gray", paddingRight: "0.3rem"}} className="far fa-flag"></i> Flag
                    {/*<span style={sourceStyle}>{this.props.column.source == "all" ? <span> @All sources</span> : <span> @{this.props.column.source}</span>}</span>*/}
                </h2>
                <SliderButton source={this.props.source} column={this.props.column}
                              refreshColumns={this.props.refreshColumns}/>
                <p style={{
                    paddingLeft: "1.4rem",
                    color: "gray", fontSize: "0.75rem", fontFamily: "Helvetica"
                }}><i className="far fa-user"></i> {this.props.column.query == "all" ? <span>*</span> : <span>{this.state.name}</span>}</p>
            </div>
        );
    }
}

FlagHeader = Radium(FlagHeader);

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

export default FlagHeader;