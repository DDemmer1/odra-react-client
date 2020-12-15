import React, {Component} from 'react';
import Radium from "radium";
import * as con from "../../../../OdraLighthouseConstants.js";
import axios from "axios/index";
import OptionsButton from "./buttons/OptionsButton";


class Answer extends Component {

    state = {
        user:{
            name: "",
            username:""
        }
    };

    componentDidUpdate(){
        console.log("new answer");
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }

    timestampToDate(timestamp) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        let date = Date.parse(timestamp);
        return new Date(date).toLocaleTimeString('de-DE', options);
    }

    getUserByID(){
        axios.get(con.API_BASE_URL + "/user/" + this.props.answer.userId).then((result) =>{
            console.log(result.data);
            this.setState({user: result.data})
        });
    }

    delete(){
        console.log(this.props.answer.id);
        axios.get(con.API_BASE_URL + "/meta/answer/delete?id=" + this.props.answer.id + "&metaId=" + this.props.metadata.id)
            .then((result) => {
                console.log(result.data);
                this.props.getMetadata();
            });

    }


    componentDidMount(){
        this.getUserByID();
    }

    render() {
        return (
            <div>
                {/*User*/}
                <span style={user}>
                        <i class="fas fa-user"></i> {this.state.user.name}
                        <span style={{color: "grey"}}>@{this.state.user.username}</span>
                </span>
                {/*Options*/}
                <OptionsButton delete={this.delete.bind(this)}/>

                {/*Time*/}
                <div style={time}>{this.timestampToDate(this.props.answer.timestamp)}</div>

                {/*Text*/}
                <div style={text}>{this.props.answer.text == "This message was deleted" ? <i>This message was deleted</i> : this.props.answer.text}</div>
            </div>
        )
    }
}



const user = {
    fontWeight: 600, display:"inline-block"
};

const time = {
    paddingLeft: "1.35rem",
    fontSize: "10pt",
    marginBottom: "1rem"
};

const text = {

};

Answer = Radium(Answer);


export default Answer;
