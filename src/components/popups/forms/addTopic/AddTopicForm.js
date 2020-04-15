import React, {Component} from 'react';
import Radium from "radium";
import axios from "axios/index";
import * as con from "../../../../OdraLighthouseConstants";


class AddTopicForm extends Component {

    state = {
        topic:"",
        dropdownTopic:"",
        headline:"Empty",
        topics:["Undefined","None","Empty"]
    };

    componentDidMount() {
        let that = this;
        axios.get(con.API_SCRAPER_CONTROLLER_URL+ "/articles/" + this.props.mediaid)
            .then((result) => {
                that.setState({headline: result.data.headline});
            });

        axios.get(con.API_BASE_URL+ "/meta/topic/all")
            .then((result) => {
                that.setState({topics: result.data});
            });

    }

    handleSubmit(event) {
        event.preventDefault();
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");

        let topicToSend ="";
        if(this.state.dropdownTopic != "" && this.state.dropdownTopic != "-" ){
            topicToSend = this.state.dropdownTopic;
        } else if(this.state.topic != null && this.state.topic != ""){
            topicToSend = this.state.topic;
        } else {
            alert("Choose a Topic");
            return;
        }

        if(!window.confirm("Add topic " + topicToSend + " to media?")){
            return;
        }

        let that = this;
        axios.post(con.API_BASE_URL + "/meta/topic",
            {
                "topic" : topicToSend,
                "mediaId": this.props.mediaid
            }
        ).then((result) => {
            if(result.data.success == true){
                this.props.toggle();
                this.props.callback();
            } else {
                window.alert("Something went wrong. Topic not added");
            }
        });
    };


    render() {
        return (
            <div>
                <h5 className="text-center mt-3" style={{fontSize: "1rem"}}>Add topic to media '{this.props.mediaid}'</h5>
                <hr/>
                <p className="pl-4 pr-4 pb-2">Create a new topic for this media or choose an existing one</p>
                <form onSubmit={(event) => {
                    this.handleSubmit(event)
                }}>
                    <div className="form-group" style={form}>
                        <label htmlFor="name">Add to new topic: </label>
                        <input className="mb-3 form-control form-control-sm" name="topic"
                               onChange={(event) => {
                                   this.setState({topic: event.target.value})
                               }}/>

                        <label htmlFor="topics">Choose existing topic:</label>
                        <select key="select" className="form-control" id="topics" onChange={(event)=>{this.setState({dropdownTopic:event.target.value})}}>
                            <option key="-">-</option>
                            {this.state.topics ?
                                this.state.topics.map((topic,index) => (<option key={index}>{topic.topicName}</option>))
                            : null}
                        </select>
                        <div>
                            <button className="btn odra-bg-color btn-primary btn-sm mt-3" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}


const form = {
    padding: "0.5rem 3.5rem "
};


AddTopicForm = Radium(AddTopicForm);


export default AddTopicForm;