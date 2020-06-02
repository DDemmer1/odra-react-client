import React, {Component} from 'react';
import Radium from "radium";


class Answer extends Component {

    toDateWithoutSeconds(date) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    }

    render() {
        return (
            <div>
                {/*User*/}
                <span style={user}>
                        <i class="fas fa-user"></i> {this.props.answer.user.name}
                        <span style={{color: "grey"}}>@{this.props.answer.user.username}</span>
                </span>
                {/*Time*/}
                <div style={time}>{this.props.answer.time.toLocaleDateString() + " " + this.toDateWithoutSeconds(this.props.answer.time)}</div>
                {/*Text*/}
                <div style={text}>{this.props.answer.text}</div>
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
