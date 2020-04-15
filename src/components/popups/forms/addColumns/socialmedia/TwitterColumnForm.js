import React, {Component} from 'react';
import Radium from "radium";
import axios from "axios/index";
import * as con from "../../../../../OdraLighthouseConstants";


class TwitterColumnForm extends Component {


    state = {
        source: "twitter",
        type: "socialmedia",
        query:""
    };

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.query);
        this.props.addColumn(this.state.source, this.state.type, this.state.query);


        let that = this;
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
        axios.get(con.API_SCRAPER_CONTROLLER_URL + "/twitter/track/add/" + that.state.query.replace("#","").replace(" ","").replace("?","").replace("=","").replace(".","").replace(":","").replace("/",""))
            .then((result) => {
                console.log(result);
            });
    }


    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Choose a Twitter Hashtag</h5>
                <hr/>
                <div className="text-center mt-2"><i style={iconStyle} className="fab fa-twitter"></i></div>

                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }}>
                    <div className="form-group" style={form}>

                        <label className="mt-3" htmlFor="query">Hashtags: </label><input className="form-control" required name="query"
                                                                                      onChange={(event) => {
                                                                                          this.setState({query: event.target.value})
                                                                                      }}/>
                        <button className="btn odra-bg-color btn-primary mt-3" type="submit">Submit</button>
                    </div>
                </form>
                <button className="btn btn-primary btn-sm odra-color" style={backButton} onClick={() => {
                    this.props.onBack();
                }}><i className="fas fa-long-arrow-alt-left"></i> Back
                </button>
            </div>
        );
    }
}

const form = {
    padding: "0.5rem 3.5rem "
};

const iconStyle = {
    color: "rgb(29, 161, 242)",
    fontSize: "2.5rem",

};


const backButton = {
    position: "absolute",
    bottom: "2rem",
    left: "2rem",
    marginBottom: 0,
    border: "light rgb(29, 161, 242)",
    backgroundColor: "white",
    ':hover': {
        color: "rgb(29, 161, 242)",
        backgroundColor: "rgba(29, 161, 242, 0.1)"
    }
};


TwitterColumnForm = Radium(TwitterColumnForm);


export default TwitterColumnForm;