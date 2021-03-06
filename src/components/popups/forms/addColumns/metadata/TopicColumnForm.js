import React, {Component} from 'react';
import Radium from "radium";
import * as con from "../../../../../OdraLighthouseConstants";
import axios from "axios/index";


class TopicColumnForm extends Component {


    state = {
        query: "", //topic
        source: "all", //news
        type: "topic",
        topics: [],
    };

    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let that = this;
        axios.get(con.API_BASE_URL + "/meta/topic/all")
            .then((result) => {
                that.setState({topics: result.data});
            });

    }


    handleSubmit = (event) => {
        event.preventDefault();
        let topic = this.state.query;
        if(topic== "" || topic == undefined || topic == "-" || topic == " " || topic == ""){
            alert("Please choose a topic!");
            return;
        }
        this.props.addColumn(this.state.source, this.state.type, this.state.query)

    };

    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Add a Topic column</h5>
                <hr/>
                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }}>
                    <div className="form-group" style={form}>
                        <label className="col-form-label" htmlFor="source">Topic: </label>
                        <select style={{textTransform: "capitalize"}} className="custom-select" name="source" onChange={(event) => {
                            this.setState({query: event.target.value})
                        }}>
                            <option style={{textTransform: "capitalize"}}>-</option>
                            {
                                this.state.topics.map((topic) => (
                                    <option key={topic.id} >{topic.topicName}</option>
                                ))
                            }
                        </select>
                        <button className="btn odra-bg-color btn-primary mt-3" type="submit">Submit</button>
                    </div>
                </form>
                <button className="btn btn-primary btn-sm odra-color" style={backButton} onClick={() => {
                    this.props.onBack()
                }}><i className="fas fa-long-arrow-alt-left"></i> Back
                </button>
            </div>
        );
    }
}

const backButton = {
    position: "absolute",
    bottom: "2rem",
    left: "2rem",
    marginBottom:0,
    border: "light rgb(29, 161, 242)",
    backgroundColor:"white",
    ':hover': {
        color:"rgb(29, 161, 242)",
        backgroundColor:"rgba(29, 161, 242, 0.1)"
    }
};

const form = {
    padding: "0.5rem 3.5rem "
}

TopicColumnForm = Radium(TopicColumnForm);

export default TopicColumnForm;